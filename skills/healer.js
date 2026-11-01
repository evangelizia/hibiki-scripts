/// name: Healer
/// class: Healer
/// role: Defensive Caster
/// slots: 1 Heartbeat, 2 Healing Word, 3 Energy Flow, 4 Holy
/// desc: Support order built on Inhibition and Radiance upkeep.

// Support leaning. The preset never sees an ally, so the party heal is cast for
// its own HoT and the buffs run on cooldown; the debuff and the damage follow.
// Mana returns on hits given and taken, so there is one light floor on the
// burst and nothing else.

// Thirty percent off the target's outgoing damage for eight seconds on twelve,
// with mana back on every hit they take for twelve. The damage cut lapses
// first, so it is the trigger and the mana comes along with it.
if (!s.target.aura("Inhibition") && s.ready("Energy Flow")) return "Energy Flow";

// Radiance heals over sixteen seconds on an eight second cooldown: permanent
// once applied, so the heal is cast for the HoT. Cast reactively too, since the
// self pool is the one condition the preset can read.
if ((!s.self.aura("Radiance") || s.self.hpPct < 70) && s.ready("Healing Word")) return "Healing Word";

// 350% single hit, more against undead. Eight seconds on eight, gated lightly
// so the upkeep above never waits on an empty pool.
if (s.self.mpPct > 25 && s.ready("Holy")) return "Holy";

// Damage scales with current health on a two second cooldown: the filler that
// also pays the mana-back rule every time it lands.
if (s.ready("Heartbeat")) return "Heartbeat";

if (s.ready("Holy")) return "Holy";

return -1;
