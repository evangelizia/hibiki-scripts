# hibiki-scripts

Scripts for the [Hibiki](https://github.com/evangelizia/hibiki) shell: bots that
drive an account, and class presets that drive a combat rotation.

There is no server. Every script is a plain file with a `///` header, and
`index.json` is the catalogue, generated from those headers. The app downloads
one file and writes it next to the others; the shell parses the header itself,
so the registry cannot disagree with the phone about what a script is.

```text
bots/     statement bodies, re-entered every tick
skills/   presets: function (s) { ... }, returns a slot or a skill name
refs.ts   the API, written out. Reference only, nothing imports it.
index.json
```

## Installing

The app reads `bots/<slug>.js` and `presets/<slug>.js` from its own files
directory. A script is installed when the file is there - there is no manifest
step, no unzip, no database.

| source | URL |
| --- | --- |
| catalogue | `https://raw.githubusercontent.com/evangelizia/hibiki-scripts/main/index.json` |
| one script | `https://cdn.jsdelivr.net/gh/evangelizia/hibiki-scripts@<commit>/bots/<slug>.js` |

The index comes from `raw` because it changes and is small. A versioned script
comes from jsDelivr, pinned to a commit, because that URL can never change its
answer. Pinning to `main` in the second row would make an install depend on when
it happened.

## Writing a script

Take a file from `bots/` or `skills/` and edit it. The header is the only
metadata:

```js
/// name: Shadow Battleon EXP
/// desc: Doomed Trolls at Enter, handing in both Shadow Hunt quests.
/// once: false
/// timeout: 10
```

| key | where | meaning |
| --- | --- | --- |
| `name` | both | card title, falls back to the file name |
| `desc` | both | one line under the title |
| `once` | bot | `true` stops after one finished pass. Default `false`, loops |
| `timeout` | bot | minutes per pass. Default 10, `0` for none |
| `class` | preset | which classes the bar belongs to, comma separated |
| `role` | preset | free text on the card |
| `slots` | preset | the bar order as a note. Not enforced: return names |
| `author` | both | registry only, not read by the client |
| `tags` | both | registry only, comma separated |
| `version` | both | registry only, for the card. The hash is the identity |

The file name is the id. Two scripts in different folders of the app with the
same name are the same script as far as the shell is concerned, so keep it
unique.

`refs.ts` has every call, its arguments, and what it returns.

Before writing a step that takes a map item or reads an item count, read
`docs/ISSUES.md` in the shell repository: it lists the engine behaviours that
answer differently than they read, the evidence, and the workaround to copy.

## Adding one

```sh
# write bots/your-bot.js or skills/your-class.js
bun run index        # regenerate index.json
git add . && git commit -m "..." && git push
```

`index.json` is generated, never hand-edited. On a pull request CI runs
`--check` and fails when the index does not match the files; on `main` CI
regenerates it and commits the result.

## What the index checks

`bun run index` refuses to write on:

- a body that does not compile under the client's wrapping
- `java.`, `Packages`, `importClass`, `getClass`, `require`, `setTimeout`,
  `fetch` - the sandbox denies all of them, so such a script can never run
- a preset calling `bot.*`, or a bot calling `s.*`
- a missing `/// name:`

It warns, without failing, about an assignment to an undeclared name. State
between ticks goes in `bot.memory`; a bare `x = ...` writes a global shared
with every other script, which is the most common way a bot dies halfway
through. See *State between ticks* in the shell's `docs/BOTS.md`.

Syntax checking runs on the CI's JavaScript engine, which accepts a few things
Rhino 1.7.15 does not. It catches mistakes, it does not promise a compile.

## Licence

MIT, same as the shell.
