/// name: LightCaster
/// class: LightCaster
/// role: Offensive Caster
/// slots: 1 Lingering Light, 2 Light Blast, 3 Illuminate, 4 Burned by Light
/// desc: Illuminate on cooldown, Burned by Light when mana allows, then Lingering Light for the In The Spotlight ramp, Light Blast to fill.

// Illuminate is 15% to damage, crit chance, crit damage, hit chance, dodge,
// haste and resistance for 12 seconds, on a 12 second cooldown, plus a heal.
// Nothing else on this bar is worth delaying it.
if (!s.self.aura("Illuminated")) return "Illuminate";

// Burned by Light is 500% up front and 350% over ten seconds on a 15 second
// cooldown. It costs 35 mana, so it waits when the pool is low; Illuminate has
// already taken its share by the time this runs.
if (!s.target.aura("Burned by Light") && s.self.mpPct > 30) return "Burned by Light";

// In The Spotlight is 3% more damage taken per stack, to fifty, for ten
// seconds: this is the class's ramp and it must never fall off. Lingering
// Light is cheap and shares the 4 second cooldown with Light Blast, so the two
// alternate on their own.
if (s.ready("Lingering Light")) return "Lingering Light";

// 350% that always lands and never crits, and each hit cuts their hit chance.
if (s.ready("Light Blast")) return "Light Blast";

return -1;
