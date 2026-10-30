/// name: Imperial Chunin
/// classes: Imperial Chunin, Chunin
/// role: Tank Melee
/// slots: 1 Chi Blast, 2 Paralyzing Wind, 3 Tsunami Strike, 4 Spinning Dragon
/// desc: Two-target farm rotation built on short cooldowns.

// Farming leaning. Every skill hits two targets and the longest cooldown on the
// bar is twelve seconds, so the bar gets spent rather than sequenced, and the
// debuffs are what keeps a pack from out-damaging the character.

// 380 percent, cannot miss, and the stun lands on both targets. It is the only
// long cooldown here, so it never waits behind a filler.
if (s.ready("Chi Blast")) return "Chi Blast";

// Half the pack's hit chance for six seconds on a six second cooldown. Two
// monsters swinging at once is the part of a farm that kills.
if (s.ready("Paralyzing Wind")) return "Paralyzing Wind";

// 150 percent for ten mana every four seconds; the cheapest damage the class
// has per point of mana.
if (s.ready("Tsunami Strike")) return "Tsunami Strike";

// 100 percent for the full thirty, so it is the leftover and pays only from a
// pool the next Chi Blast does not need.
if (s.self.mpPct > 30 && s.ready("Spinning Dragon")) return "Spinning Dragon";

return -1;
