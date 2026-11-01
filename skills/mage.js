/// name: Mage
/// class: Mage
/// role: Offensive Caster
/// slots: 1 Fireball, 2 Ice Shard, 3 Explosion, 4 Arcane Shield
/// desc: Solo boss rotation built on Frozen into Scorched detonation.

// Offensive caster with a two-step setup: Frozen Blood carries the debuff and
// doubles the Fireball that consumes it, and Scorched carries the DoT that
// Explosion detonates. Mana returns on every landed hit, so there is no floor.

// Zero mana, ten seconds of damage shifted to mana on twenty. The shield is
// the only survival on the bar, so it goes first and only when hurt.
if (s.self.hpPct < 50 && s.ready("Arcane Shield")) return "Arcane Shield";

// Frozen Blood cuts haste and outgoing damage for ten seconds, and the next
// Fireball consumes it for double damage. Ice Shard refuses to apply it under
// Scorched, so this step waits while Scorched is live.
if (!s.target.aura("Frozen Blood") && !s.target.aura("Scorched") && s.ready("Ice Shard")) return "Ice Shard";

// Scorched is the DoT and the detonator's fuel. Cast into Frozen Blood when it
// is there for the double, otherwise cast to start the back half of the cycle.
if (!s.target.aura("Scorched") && s.ready("Fireball")) return "Fireball";

// Detonate consumes Scorched a second after the hit, which clears the way for
// the next Ice Shard. Presence-gated so the cycle restarts instead of stalling.
if (s.target.aura("Scorched") && s.ready("Explosion")) return "Explosion";

// Cheap wide hit on three seconds: the filler that also finishes the pack in
// farm content without disturbing the boss cycle above it.
if (s.ready("Explosion")) return "Explosion";

if (s.ready("Ice Shard")) return "Ice Shard";
if (s.ready("Fireball")) return "Fireball";

return -1;
