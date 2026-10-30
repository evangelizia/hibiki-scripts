/// name: Shaman
/// class: Shaman
/// role: Power Caster
/// slots: 1 Ancestor's Flame, 2 Hydrophobia, 3 Dry Lightning, 4 Elemental Embrace
/// desc: Solo boss rotation built on the Elemental Embrace ramp.

// Solo boss leaning. Elemental Embrace lasts a minute and grows with every spell
// cast at the target, so the order starts it first and never lets it lapse.

// The debuff clears the target's evasion and crit chance as well as amplifying
// every spell. Sixty seconds on a sixteen second cooldown is a refresh, not a
// window.
if (!s.target.aura("Elemental Embrace")) return "Elemental Embrace";

// Scorched Spirit is what doubles Hydrophobia, and it grows with every
// Ancestor's Flame or Dry Lightning cast under Elemental Embrace. Four seconds
// under a five second debuff keeps it up without a presence check.
if (s.ready("Ancestor's Flame")) return "Ancestor's Flame";

// The three hundred percent hit, above the filler but under the ramp. The floor
// stops it taking the pool the ramping skills are paid from.
if (s.self.mpPct > 30 && s.ready("Dry Lightning")) return "Dry Lightning";

// Doubled by Scorched Spirit and carrying the class's only heal, so the filler
// pays for itself.
if (s.ready("Hydrophobia")) return "Hydrophobia";

return -1;
