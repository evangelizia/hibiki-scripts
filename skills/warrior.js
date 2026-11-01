/// name: Warrior
/// class: Warrior
/// role: Tank Melee
/// slots: 1 Decisive Strike, 2 Imbalancing Strike, 3 Prepared Strike, 4 On Guard
/// desc: Tank order built on Armor Shred and guard windows.

// Tank leaning: the debuff and the mitigation carry the fight, the stun and
// the empowered autos sit behind them. Mana returns on hits given and taken,
// so the burst keeps a light floor and nothing else gates on the pool.

// Fifty percent resistance for five seconds. Cast reactively when hurt; the
// upkeep copy below cycles it the rest of the time.
if (s.self.hpPct < 50 && s.ready("On Guard")) return "On Guard";

// Ten percent resistance shred for five seconds on a two second cooldown.
// Permanent once applied, and everything after it hits harder for it.
if (!s.target.aura("Armor Shred")) return "Decisive Strike";

// The next two autos crit, doubled when On Guard is live. Taken only inside
// the guard window so the double is never left on the table.
if (s.self.aura("On Guard") && s.ready("Prepared Strike")) return "Prepared Strike";

// Three second stun carrying 240% weapon damage. Ten second cooldown, so it is
// a window rather than upkeep; the floor keeps the pool the guard cycle needs.
if (s.self.mpPct > 20 && s.ready("Imbalancing Strike")) return "Imbalancing Strike";

// Five seconds of guard on ten seconds of cooldown. Cycled on cooldown it feeds
// the next Prepared double and keeps the resistance rolling between reactions.
if (s.ready("On Guard")) return "On Guard";

if (s.ready("Prepared Strike")) return "Prepared Strike";
if (s.ready("Decisive Strike")) return "Decisive Strike";

return -1;
