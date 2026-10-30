/// name: Oracle
/// class: Oracle
/// role: Power Caster
/// slots: 1 Foresight, 2 Group Divination, 3 Foretell, 4 Edited Timeline
/// desc: Support rotation: heal and buffs first, damage cut behind them.

// Support leaning. The preset sees its own health and one target, so the ally
// skills are cast on cooldown rather than reactively, and damage is whatever
// the last step leaves.

// Setup that pays for the rest: five mana, critical auto attacks, and a chance
// at thirty percent intellect and critical damage. The buff outlasts its own
// cooldown, and critical hits are where this class gets mana back, so it fires
// whenever it is ready.
if (s.ready("Foresight")) return "Foresight";

// The heal is the class's job and doubles when an enemy is selected, but it is
// the most expensive skill here; the pool floor leaves the damage cut paid for.
if (s.ready("Group Divination") && s.self.mpPct > 25) return "Group Divination";

// Ten seconds of fifty percent dodge and thirty percent crit on a fourteen
// second cooldown is a window, so it sits below the heal on eight.
if (!s.self.aura("Shared Link") && s.ready("Foretell")) return "Foretell";

// Small damage, but eighty percent off one damage type for eight seconds. The
// cut is either physical or magical, so either aura means it is already up.
if (s.ready("Edited Timeline") && !s.target.aura("Blocked") && !s.target.aura("Ignored")) {
    return "Edited Timeline";
}

return -1;
