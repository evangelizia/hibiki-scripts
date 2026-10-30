/// name: ArchPaladin
/// class: ArchPaladin
/// role: Full Hybrid
/// slots: 1 Commandment, 2 Hymn of Light, 3 Righteous Seal, 4 Sacred Magic: Eden
/// desc: Support rotation built on Commandment upkeep and the seal combo.

// Support leaning. The preset cannot see the party, so the heal is cast for the
// buff it carries, the enemy debuffs run on cooldown, and Eden is the damage.

// Hymn is the party heal and the END and Defense buff. Fifteen seconds on ten,
// so the buff is the trigger and the heal arrives with it.
if (!s.self.aura("Hymn of Light") && s.ready("Hymn of Light")) return "Hymn of Light";

// Six stacks of defense shred, dodge loss and enemy damage cut, ten seconds on
// a five second cooldown. On cooldown it stays at the cap; a count would let
// the stacks lapse and rebuild from zero.
if (s.ready("Commandment")) return "Commandment";

// The seal is a seven second window, and Eden doubles inside it and spends it
// for Broken Seal. Both sit on twenty five seconds, so the pair stays aligned.
if (s.target.aura("Righteous Seal") && s.self.mpPct > 25 && s.ready("Sacred Magic: Eden")) {
    return "Sacred Magic: Eden";
}

// The setup half of the pair: ninety percent off the target's damage while it
// waits. Eden above spends it on the next tick.
if (s.ready("Righteous Seal")) return "Righteous Seal";

return -1;
