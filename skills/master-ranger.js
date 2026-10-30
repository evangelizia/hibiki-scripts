/// name: Master Ranger
/// classes: Master Ranger, Ranger
/// role: Dodge Melee
/// slots: 1 Mark For Death, 2 Explosive Bolt, 3 Vampiric Shot, 4 Scorching Arrow
/// desc: Two-target farm order that cycles every arrow and fills with the free one.

// Farming. Every skill hits two targets and a pack dies in a few seconds, so
// there is no window to build the six-stack cap: Death Mark sits on the corpse
// being replaced and Mark on the character, and both start over on the next
// one. A gate on their stacks answered Mark For Death on nearly every tick, and
// the lane only holds one skill, so nothing below it ever came up.

// Three seconds against a ten second burn, and the cheapest paid hit: up on
// every pack, and the damage over time is what a farm leans on.
if (s.ready("Scorching Arrow")) return "Scorching Arrow";

// Ten mana for damage and a heal over time. The class lives by dodging, so the
// sustain earns the slot even while farming.
if (s.ready("Vampiric Shot")) return "Vampiric Shot";

// The heaviest hit on the bar, held off a dry pool; the stacks it spends are
// rebuilt by the free cast at the bottom.
if (s.self.mpPct > 25 && s.ready("Explosive Bolt")) return "Explosive Bolt";

// Free, and the last thing checked, so it takes the idle cooldowns and keeps
// both auras alive without ever standing in front of a paid skill.
if (s.ready("Mark For Death")) return "Mark For Death";

return -1;
