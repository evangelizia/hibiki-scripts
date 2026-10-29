/// name: Legion Revenant
/// class: Legion Revenant
/// role: Offensive Caster
/// slots: 1 Atramentous Shade, 2 Wicked Purgatory, 3 Depraved Empowerment, 4 Anathema
/// desc: Upkeep the buff, then both debuffs, then Anathema. The bar is addressed by name, so the slot order above is only a note.

// Depraved Empowerment carries the haste, the crit and the shield. Without it
// this class is a slow caster with no mitigation.
if (!s.self.aura("Immorality")) return "Depraved Empowerment";

// Seared cuts their crit chance, Enveloped cuts the damage we take. Same cast.
if (!s.target.aura("Seared")) return "Wicked Purgatory";

// Always-crit damage over time, and the dodge cut that keeps the rest of the
// bar landing.
if (!s.target.aura("Decay")) return "Atramentous Shade";

// Anathema is the burst. Hold it while mana is still recovering.
if (s.ready("Anathema") && s.self.mpPct > 25) return "Anathema";

return -1;
