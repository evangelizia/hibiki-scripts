/**
 * Builds index.json from the scripts themselves.
 *
 * The files are the source of truth: bots/ and skills/ hold exactly what the
 * app downloads, and index.json is derived from their `///` headers. Nothing
 * here invents metadata the phone cannot read, because the phone parses the
 * same header with the same rules.
 *
 *   bun run index           write index.json
 *   bun run index --check   fail when it is out of date
 */

const ROOT = import.meta.dir.replace(/\/tools$/, "");
const INDEX = `${ROOT}/index.json`;
const REPO = "evangelizia/hibiki-scripts";
const SPEC = 1;

type Kind = "bots" | "skills";
const KINDS: Kind[] = ["bots", "skills"];

interface Entry {
  id: string;
  name: string;
  desc: string;
  class?: string;
  role?: string;
  slots?: string;
  mode?: string;
  timeout?: number;
  author: string;
  tags: string[];
  version: string;
  size: number;
  sha256: string;
  path: string;
}

const errors: string[] = [];
const warnings: string[] = [];

function fail(where: string, message: string) {
  errors.push(`${where}: ${message}`);
}

function warn(where: string, message: string) {
  warnings.push(`${where}: ${message}`);
}

/**
 * The client's own header parser, mirrored: leading `///` lines, first colon
 * splits key from value, keys are lower case. Anything else is body.
 */
function header(text: string) {
  const fields = new Map<string, string>();
  let offset = 0;
  while (offset < text.length) {
    const end = text.indexOf("\n", offset);
    const stop = end < 0 ? text.length : end;
    const line = text.slice(offset, stop).trim();
    if (!line.startsWith("///")) break;
    const pair = line.slice(3).trim();
    const colon = pair.indexOf(":");
    if (colon > 0) {
      fields.set(pair.slice(0, colon).trim().toLowerCase(), pair.slice(colon + 1).trim());
    }
    offset = Math.min(stop + 1, text.length);
  }
  return { fields, body: text.slice(offset) };
}

/**
 * Code with comments and string contents blanked, so the checks below cannot
 * trip on prose. Regex literals are treated as division, which only matters
 * for a script that puts a quote inside one.
 */
function code(text: string): string {
  let out = "";
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "/" && next === "/") {
      while (i < text.length && text[i] !== "\n") i++;
    } else if (char === "/" && next === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++;
      i += 2;
    } else if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      i++;
      while (i < text.length && text[i] !== quote) {
        if (text[i] === "\\") i++;
        i++;
      }
      i++;
      out += '""';
    } else {
      out += char;
      i++;
    }
  }
  return out;
}

/** Names the sandbox will refuse, or that simply do not exist in it. */
const BANNED: Array<[RegExp, string]> = [
  [/(?<![\w$.])(?:java|javax)\s*[.[]/, "java.* is blocked by the sandbox"],
  [/(?<![\w$.])Packages\b/, "Packages is blocked by the sandbox"],
  [/(?<![\w$])importClass\s*\(/, "importClass is blocked by the sandbox"],
  [/(?<![\w$])importPackage\s*\(/, "importPackage is blocked by the sandbox"],
  [/(?<![\w$.])getClass\s*\(/, "getClass is blocked by the sandbox"],
  [/(?<![\w$])require\s*\(/, "require does not exist in the sandbox"],
  [/(?<![\w$])setTimeout\s*\(/, "setTimeout does not exist in the sandbox"],
  [/(?<![\w$])setInterval\s*\(/, "setInterval does not exist in the sandbox"],
  [/(?<![\w$.])fetch\s*\(/, "fetch does not exist in the sandbox"],
  [/(?<![\w$])XMLHttpRequest\b/, "XMLHttpRequest does not exist in the sandbox"],
];

/**
 * The documented footgun: `this.x` survives a pass, a bare `x = ...` does not
 * reliably. Flagged, not fatal - the author may know something we do not.
 */
function undeclared(source: string): string[] {
  const declared = new Set<string>();
  for (const match of source.matchAll(/\b(?:var|let|const|function|class)\s+([A-Za-z_$][\w$]*)/g)) {
    declared.add(match[1]);
  }
  const found = new Set<string>();
  for (const match of source.matchAll(/(?:^|[;{}\n])\s*([A-Za-z_$][\w$]*)\s*=(?![=>])/g)) {
    if (!declared.has(match[1])) found.add(match[1]);
  }
  return [...found];
}

function check(kind: Kind, id: string, source: string, headerFields: Map<string, string>, body: string) {
  const where = `${kind}/${id}.js`;
  const stripped = code(body);

  for (const [pattern, message] of BANNED) {
    if (pattern.test(stripped)) fail(where, message);
  }

  // A bot has no `s`, a preset has no `bot`. Either way it is a runtime error
  // on the first pass, so it never reaches a device.
  if (kind === "skills" && /(?<![\w$.])bot\s*\./.test(stripped)) {
    fail(where, "a preset cannot call bot.*; that API only exists in bots");
  }
  if (kind === "bots" && /(?<![\w$.])s\s*\./.test(stripped)) {
    fail(where, "a bot cannot call s.*; that argument only exists in presets");
  }

  // The same wrapping the client compiles, so a syntax error is caught here
  // rather than on a phone mid-run.
  try {
    new Function(...(kind === "skills" ? ["s", body] : [body]));
  } catch (bad) {
    fail(where, `does not compile: ${(bad as Error).message}`);
  }

  for (const name of undeclared(stripped)) {
    warn(where, `assigns undeclared \`${name}\`; use \`this.${name}\` so it survives the pass`);
  }

  if (!headerFields.get("name")) fail(where, "header has no `/// name:` line");
  if (body.trim().length === 0) fail(where, "body is empty");

  const desc = headerFields.get("desc");
  if (!desc) warn(where, "header has no `/// desc:` line");
  if (kind === "skills" && headerFields.has("once")) warn(where, "`once` only means something in a bot");
}

function minutes(raw: string | undefined): number {
  if (!raw) return 10;
  const value = Number.parseInt(raw.trim(), 10);
  return Number.isNaN(value) || value <= 0 ? 0 : value;
}

async function build(): Promise<string> {
  const catalogue: Record<string, Entry[]> = { bots: [], skills: [] };

  for (const kind of KINDS) {
    const names = Array.from(new Bun.Glob(`${kind}/*.js`).scanSync({ cwd: ROOT, onlyFiles: true }))
      .map((path) => path.slice(kind.length + 1))
      .sort();

    for (const name of names) {
      const id = name.slice(0, -3);
      const path = `${kind}/${name}`;
      const bytes = await Bun.file(`${ROOT}/${path}`).bytes();
      const source = new TextDecoder().decode(bytes);
      const { fields, body } = header(source);

      check(kind, id, source, fields, body);

      const entry: Entry = {
        id,
        name: fields.get("name") ?? id,
        desc: fields.get("desc") ?? "",
        author: fields.get("author") ?? "",
        tags: (fields.get("tags") ?? "")
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        version: fields.get("version") ?? "1",
        size: bytes.length,
        sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex"),
        path,
      };

      if (kind === "bots") {
        entry.mode = (fields.get("once") ?? "false").trim().toLowerCase() === "true" ? "once" : "loop";
        entry.timeout = minutes(fields.get("timeout"));
      } else {
        entry.class = (fields.get("class") ?? fields.get("classes") ?? "")
          .split(",")
          .map((part) => part.trim())
          .filter((part) => part.length > 0)
          .join(", ");
        entry.role = fields.get("role") ?? "";
        entry.slots = fields.get("slots") ?? "";
      }

      catalogue[kind].push(entry);
    }
  }

  return `${JSON.stringify({ spec: SPEC, repo: REPO, ...catalogue }, null, 2)}\n`;
}

const generated = await build();

for (const warning of warnings) {
  console.warn(`warn ${warning}`);
}
if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error ${error}`);
  }
  console.error(`\n${errors.length} error(s); index.json not written`);
  process.exit(1);
}

const current = await Bun.file(INDEX)
  .text()
  .catch(() => "");

const counts = (text: string) => {
  try {
    const parsed = JSON.parse(text);
    return `${parsed.bots?.length ?? 0} bots, ${parsed.skills?.length ?? 0} skills`;
  } catch {
    return "unreadable";
  }
};

if (process.argv.includes("--check")) {
  const same = current.trim() !== "" && JSON.stringify(JSON.parse(current)) === JSON.stringify(JSON.parse(generated));
  if (!same) {
    console.error(`index.json is out of date (${counts(current)} -> ${counts(generated)})`);
    console.error("run: bun run index");
    process.exit(1);
  }
  console.log(`index.json is current: ${counts(generated)}`);
} else {
  await Bun.write(INDEX, generated);
  console.log(`wrote index.json: ${counts(generated)}`);
}
