/// name: Master Ranger
/// classes: Master Ranger, Ranger
/// role: Dodge Melee
/// slots: 1 Mark for Death, 2 Explosive Bolt, 3 Vampiric Shot, 4 Scorching Arrow
/// desc: Two-target farm rotation built on the Death Mark ramp.

// Farming leaning. Every skill on the bar hits two targets and the balance notes
// place the class as a mid-game farmer, so nothing waits for a boss-length
// window; the ramp is the only setup and it lasts ten seconds.

// Free, a second and a half apart, and worth thirty percent more damage taken
// on the pack by the cap. It also feeds the stacks the arrows read, so it stays
// pegged rather than casting once.
if (s.target.aura("Death Mark") < 6) return "Mark for Death";

// The payoff for the ramp: damage per stack, so it is held until the cap is
// close and the nine second cooldown matches the time it takes to rebuild.
if (s.self.mpPct > 25 && s.target.aura("Death Mark") >= 5 && s.ready("Explosive Bolt")) {
    return "Explosive Bolt";
}

// Ten mana, the cheapest paid cast, and the heal over time scales with the same
// stacks. The class lives by dodging, so a run of missed dodges needs this.
if (s.ready("Vampiric Shot")) return "Vampiric Shot";

// Three seconds against a ten second burn, so it runs on every pack and pays
// back its mana across both targets.
if (s.ready("Scorching Arrow")) return "Scorching Arrow";

return -1;
