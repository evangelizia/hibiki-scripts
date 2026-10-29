/// name: Dragonslayer
/// class: Dragonslayer
/// role: Tank Melee
/// slots: 1 Scorched Steel, 2 Impale, 3 Incapacitate, 4 Dragon's Bane
/// desc: Spend Dragonbane on Impale, then Incapacitate; Scorched Steel otherwise.

// Impale carries the class's only heal, from its own Impaled, on a ten second
// cooldown. Under 45 percent that is worth more than anything the key buys.
if (s.self.hpPct < 45 && s.ready("Impale")) return "Impale";

// Dragonbane lasts ten seconds and the next skill consumes it, so which skill
// fires while it is up is the whole decision. The bar's own order would spend
// it on Scorched Steel every time.
if (s.target.aura("Dragonbane")) {
    // Infected Wound is the strongest of the three spends and the effect the
    // haste and crit surge is read from, so Impale gets the first key.
    if (!s.target.aura("Infected Wound") && s.ready("Impale")) return "Impale";
    // Incapacitate adds the stun and the second damage cut to the same key.
    if (s.ready("Incapacitate")) return "Incapacitate";
    // With Infected Wound up, every Impale after it feeds the surge.
    if (s.ready("Impale")) return "Impale";
    // Scorched Steel takes whatever key is left and returns its own five mana.
    if (s.ready("Scorched Steel")) return "Scorched Steel";
}

// Dragon's Bane is the only skill on the bar that spends mana, and nothing
// else competes for the pool, so it is worth casting whenever it covers the
// cost - but never while its own key is still up.
var bane = s.cost("Dragon's Bane");
if (bane > 0 && !s.target.aura("Dragonbane") && s.self.mp >= bane && s.ready("Dragon's Bane")) {
    return "Dragon's Bane";
}

return -1;
