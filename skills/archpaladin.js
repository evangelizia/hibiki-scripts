/// name: ArchPaladin
/// class: ArchPaladin
/// role: Full Hybrid
/// slots: 1 Commandment, 2 Hymn of Light, 3 Righteous Seal, 4 Sacred Magic: Eden
/// desc: Party support built on Hymn upkeep and the sealed Eden window.

// Support leaning for ultras. The preset sees no party and no ally health, so
// Hymn is kept up on its own clock, the seal is spent on mitigation and Eden,
// and Commandment carries the damage and the mana back.

// The heal always crits and restores 380%, and it is the only sustain on the
// bar. Below half health it is worth the 40 mana before the buff lapses.
if (s.self.hpPct < 50 && s.self.mpPct > 25 && s.ready("Hymn of Light")) {
    return "Hymn of Light";
}

// Twenty percent END and Defense to the whole party, fifteen seconds on ten:
// permanent uptime, so it is recast the tick it drops, not saved.
if (!s.self.aura("Hymn of Light") && s.self.mpPct > 25 && s.ready("Hymn of Light")) {
    return "Hymn of Light";
}

// Ninety percent off the target's outgoing damage for seven seconds, and the
// only thing that turns Eden into 1100%. Nothing on the bar outranks it.
if (!s.target.aura("Righteous Seal") && s.ready("Righteous Seal")) {
    return "Righteous Seal";
}

// Sealed Eden doubles and spends the seal for Broken Seal, 15% damage cut for
// 25 seconds. Unsealed it desyncs the pair, so it waits for the seal.
if (s.target.aura("Righteous Seal") && s.self.mpPct > 25 && s.ready("Sacred Magic: Eden")) {
    return "Sacred Magic: Eden";
}

// Ten mana, five seconds, three targets, and a stack of Divine, Commandent and
// Eminent each. On cooldown it holds the ramp as high as the bar allows, and
// the hits are what refills the pool.
if (s.ready("Commandment")) return "Commandment";

return -1;
