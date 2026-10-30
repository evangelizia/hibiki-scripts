/// name: StoneCrusher
/// class: StoneCrusher
/// role: Defensive Caster
/// slots: 1 Stalagmite, 2 Echoing Earth, 3 Land's Embrace, 4 Endless Fissure
/// desc: Support rotation built on party buffs and the Bruised ramp.

// Support leaning. Two of the four skills buff the party and the preset cannot
// see an ally, so they are cast on cooldown; Bruised and Fissure carry the rest.

// Magnitude is 275% outgoing magic damage for two seconds, and every skill on
// the bar can roll it. The nuke goes first inside that window, ahead of buffs.
if (s.self.aura("Magnitude") && s.self.mpPct > 30 && s.ready("Endless Fissure")) {
    return "Endless Fissure";
}

// Haste and crit for the party, and Dissonance returns mana. Ten seconds on
// eighteen, so this is the first recast once it lapses.
if (!s.self.aura("Resonance") && s.ready("Echoing Earth")) return "Echoing Earth";

// Fifty percent off incoming damage for eight seconds on twelve, with the heal
// attached. Cast for the buff, not for the health.
if (!s.self.aura("Shielded") && s.ready("Land's Embrace")) return "Land's Embrace";

// Bruised is eight percent more damage taken per stack, five at the cap. A six
// second cooldown under an eight second duration keeps it at the cap and
// refreshed; counting against the cap would let it fall off and restart.
if (s.ready("Stalagmite")) return "Stalagmite";

// The nuke and the Aftershock DoT, which grows every tick for thirty seconds.
// The floor stops it draining the pool the buffs are paid from.
if (s.self.mpPct > 30 && s.ready("Endless Fissure")) return "Endless Fissure";

return -1;
