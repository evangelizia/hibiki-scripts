/// name: 13 Lords of Chaos: Escherion
/// desc: The first Lord of Chaos, Chiral Valley up to Escherion.
/// once: true
/// timeout: 60

// Chiral Valley runs one slot from the spies in Mobius to the tower.
var CHAIN = 21;

// The lake wants a shard from each runestone, so the three map items are
// taken in order instead of through gather, which knows one spot per quest.
function hydra() {
    if (!bot.travel("hydra")) return false;
    if (!bot.quest.active(271)) {
        if (bot.quest.done(271)) return true;
        bot.quest.accept(271);
        return false;
    }
    if (!bot.mapItem(50, 1, 1147)) return false;
    if (!bot.mapItem(51, 1, 1158)) return false;
    if (!bot.mapItem(52, 1, 1159)) return false;
    bot.quest.turnIn(271);
    return false;
}

// Escherion only takes damage while his staff is down, and the staff is back
// every twelve seconds, so the fight names the thing that is up instead of
// standing on an invulnerable boss.
function escherion() {
    if (!bot.travel("escherion")) return false;
    if (!bot.quest.active(272)) {
        if (bot.quest.done(272)) return true;
        bot.quest.accept(272);
        return false;
    }
    if (!bot.moveToCell("Boss", "Left")) return false;

    var staff = bot.monster("Staff of Inversion");
    if (staff != null && staff.alive) {
        bot.kill("Staff of Inversion", 1);
        return false;
    }
    if (!bot.kill("Escherion", 1)) return false;

    bot.quest.turnIn(272);
    return false;
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

if (chain < 1) return bot.quest.farm(245, "Chaos Sp-Eye", "mobius", "Side1", "Bottom");
if (chain < 2) return bot.quest.gather(246, 42, "mobius");
if (chain < 3) return bot.quest.farm(247, "Fire Imp", "mobius", "Side1", "Bottom");
if (chain < 4) return bot.quest.gather(260, 44, "mobius");
if (chain < 5) return bot.quest.farm(248, "Cyclops Raider", "mobius", "Side1", "Bottom");
if (chain < 6) return bot.quest.farm(249, "Slugfit", "mobius", "Slugfit", "Bottom");

if (chain < 7) return bot.quest.farm(250, "Chainsaw Sneevil", "faerie", "Enter", "Spawn");
if (chain < 8) return bot.quest.gather(251, 43, "faerie");
if (chain < 9) return bot.quest.farm(252, "Chainsaw Sneevil", "faerie", "Enter", "Spawn");
if (chain < 10) return bot.quest.farm(255, "Cyclops Warlord", "faerie", "End", "Center");
if (chain < 11) return bot.quest.farm(256, "Aracara", "faerie", "TopRock", "Center");

if (chain < 12) return bot.quest.farm(257, "Gargoyle", "cornelis", "Side1", "Left");
if (chain < 13) return bot.quest.gather(261, 45, "cornelis");
if (chain < 14) return bot.quest.farm(258, "Gargoyle", "cornelis", "Side1", "Left");
if (chain < 15) return bot.quest.gather(262, 46, "cornelis");
if (chain < 16) return bot.quest.farm(259, "Stone Golem", "cornelis", "Side5", "Left");
if (chain < 17) return bot.quest.gather(263, 47, "cornelis");

if (chain < 18) return bot.quest.gather(266, 48, "mobius");
if (chain < 19) return bot.quest.gather(267, 49, "mobius");
if (chain < 20) return bot.quest.farm(264, "Cyclops Raider", "mobius", "Side1", "Bottom");
if (chain < 21) return bot.quest.farm(265, "Chainsaw Sneevil", "faerie", "Enter", "Spawn");

if (chain < 22) return bot.quest.farm(268, "Cyclops Raider", "relativity", "Side1", "Left");
if (chain < 23) return bot.quest.farm(269, "Fire Imp", "relativity", "Side3", "Left");
if (chain < 24) return bot.quest.farm(270, "Head Gargoyle", "relativity", "Side5", "Left");

if (chain < 25) return hydra();
if (chain < 26) return escherion();

bot.log("chaos-1-escherion: done");
return true;
