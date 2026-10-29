/**
 * Hibiki script API - reference, not a build input.
 *
 * The app runs these files in Rhino 1.7.15, not TypeScript. Nothing here is
 * imported by a script; it exists so an editor can complete the names and so
 * the contract has one written home. `docs/BOTS.md` and `docs/COMBAT.md` in the
 * shell repository are the prose version of the same thing.
 *
 * A script that disagrees with this file is a bug in one of them.
 */

/** One avatar, as the snapshot copies it out of the client. */
export interface Actor {
  /** Display name, exactly as the client spells it. */
  readonly name: string;
  /** Class name, e.g. `LightCaster`. Empty for monsters. */
  readonly class: string;
  readonly hp: number;
  readonly maxHp: number;
  readonly mp: number;
  readonly maxMp: number;
  readonly hpPct: number;
  readonly mpPct: number;
  readonly alive: boolean;
  /**
   * Aura stacks, 0 when absent. The name is compared lower case with
   * punctuation and spacing dropped, because the client's spelling is not
   * stable; `"Burned by Light"` and `"burned_by_light"` are the same aura.
   */
  aura(name: string): number;
}

/** One slot on the action bar. */
export interface Skill {
  /** Bar position, 0-based. Slot 1 on screen is `slot: 0` when it is the basic attack. */
  readonly slot: number;
  readonly name: string;
  /**
   * The client's own readiness: cooldown, actID and usability, already scaled
   * by haste. It does **not** include mana - see `cost`.
   */
  readonly ready: boolean;
  /**
   * Mana the client would charge right now, after the class's own cost
   * modifier. The engine skips a skill whose cost is above `s.self.mp`, so a
   * preset never sees `ready` on something it cannot pay for.
   */
  readonly cost: number;
  /** False for the basic attack and for friendly skills. */
  readonly hostile: boolean;
}

/**
 * What a bot gets. The same object every tick, and a pass is re-entered from
 * the top each time, so a step function that has not finished must `return`
 * and let the next tick call it again.
 */
export interface Bot {
  /**
   * Walks to a map and waits for it to load. Paced: a call inside the pace
   * waits it out, with a 3.5 s floor for the load itself.
   */
  travel(map: string): boolean;

  /**
   * Fights until `count` of `target` are dead.
   *
   * - `kill("*", n)` - anything in the map
   * - `kill("Doomed Troll", n)` - that name only
   * - `kill(n)` - anything, `n` times
   *
   * Returns `false` while the fight is still running, `true` once the count is
   * met or no such monster is left. **Never paced**: a kill phase runs at full
   * speed, which is also why it must be the last thing a pass does before
   * returning.
   */
  kill(target: string, count?: number): boolean;
  kill(count: number): boolean;

  /**
   * Picks up drops, so quest items land in the bag. `"*"` takes the first one
   * the lite drops UI lists, or a name to be picky. 800 ms floor.
   */
  pickDrop(name?: string): boolean;

  /**
   * Asks the server to aggro every monster in the current frame. One call, one
   * request: there is no flag and nothing repeats on its own. Paced.
   */
  aggroRoom(): boolean;

  readonly quest: {
    /** In progress or ready to hand in. */
    active(id: number): boolean;
    /** Objectives met, waiting for the NPC. */
    ready(id: number): boolean;
    /** 1.5 s floor. */
    accept(id: number): boolean;
    /** 3 s floor. */
    turnIn(id: number): boolean;
  };

  /** One line to the LOG pane, level `script`. */
  log(message: string): void;

  /** Stops the run and reports the reason. Fatal: the pass does not continue. */
  fail(reason?: string): void;
}

/**
 * What a preset gets, called on every combat tick while there is a live
 * target. Read only: everything is copied out of the snapshot first.
 *
 * Return a slot, a skill name, or `-1` to decline. A name is resolved against
 * the live bar, so a preset does not have to know the player's slot order.
 */
export interface Fight {
  readonly self: Actor;
  readonly target: Actor;
  readonly skills: readonly Skill[];
  /** A plain object, yours, cleared when combat starts. */
  readonly memory: Record<string, unknown>;
  /** The client's readiness answer for a slot or a name. */
  ready(slot: number | string): boolean;
  log(message: string): void;
}

export type Preset = (s: Fight) => number | string;

/** `///` lines at the top of a file. Unknown keys are ignored by the client. */
export interface Header {
  /** Shown on the LIBRARY card. Falls back to the file name. */
  name: string;
  desc: string;
  /** Presets only: which classes this bar belongs to, comma separated. */
  class?: string;
  /** Presets only: free text on the card. */
  role?: string;
  /** Presets only: the bar order as a note, not enforced. */
  slots?: string;
  /** Bots only: `true` stops after one finished pass. Default `false`. */
  once?: boolean;
  /** Bots only: per pass budget in minutes. Default 10, `0` for none. */
  timeout?: number;
  /** Registry only: shown on the card, not read by the client. */
  author?: string;
  /** Registry only: comma separated, searchable. */
  tags?: string;
  /** Registry only: human-facing version, not an identity. */
  version?: string;
}

declare global {
  /** Present in bots only. */
  const bot: Bot;
}

/** Shape of one record in `index.json`. */
export interface CatalogueEntry {
  id: string;
  name: string;
  desc: string;
  author: string;
  tags: string[];
  version: string;
  /** Bytes on disk. */
  size: number;
  /** Content identity. Two files with the same hash are the same script. */
  sha256: string;
  /** Path inside this repository, for building a raw URL. */
  path: string;
  /** Bots. */
  mode?: "once" | "loop";
  timeout?: number;
  /** Presets. */
  class?: string;
  role?: string;
  slots?: string;
}
