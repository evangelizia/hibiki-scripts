/// name: 13 Lords of Chaos: Prologue
/// desc: The 13 Lords of Chaos prologue, up to the Forest of Chaos.
/// once: true
/// timeout: 45

// The alignment the Shadowfall cutscene offers: 1 Good, 2 Evil, 3 Chaos.
var ALIGNMENT = 2;

var CHAIN = 20;
var UNLOCK = 43;
var CRYPT = 42;

function farm(quest, item, need, map, cell, pad, monster) {
    if (!bot.travel(map)) return false;
    if (!bot.quest.active(quest)) {
        bot.quest.accept(quest);
        return false;
    }
    var have = bot.item(item);
    if (have == null) return false;
    if (have >= need) {
        bot.quest.turnIn(quest);
        return false;
    }
    if (!bot.moveToCell(cell, pad)) return false;
    bot.kill(monster, need - have);
    return false;
}

function mapQuest(quest, item, need, mapItem, map) {
    if (!bot.travel(map)) return false;
    if (!bot.quest.active(quest)) {
        bot.quest.accept(quest);
        return false;
    }
    if (!bot.mapItem(mapItem, need, item)) return false;
    bot.quest.turnIn(quest);
    return false;
}

function insurance() {
    if (!bot.travel("prison")) return false;
    if (!bot.quest.active(6216)) {
        bot.quest.accept(6216);
        return false;
    }
    if (!bot.mapItem(39, 5, 928)) return false;
    if (!bot.buy(1559, 42993)) return false;
    bot.quest.turnIn(6216);
    return false;
}

function forest() {
    if (!bot.travel("forestchaos")) return false;
    if (!bot.quest.active(6219)) {
        bot.quest.accept(6219);
        return false;
    }

    var wolves = bot.item(42995);
    if (wolves == null) return false;
    if (wolves < 7) {
        if (!bot.moveToCell("Straight1", "Left")) return false;
        bot.kill("Chaorrupted Wolf", 7 - wolves);
        return false;
    }

    var bear = bot.item(42996);
    if (bear == null) return false;
    if (bear < 1) {
        if (!bot.moveToCell("Boss", "Left")) return false;
        bot.kill("Chaorrupted Bear", 1 - bear);
        return false;
    }

    bot.quest.turnIn(6219);
    return false;
}

// Three slots carry the whole prologue. A quest's value is the number its
// slot reads once that quest is done, so a step is finished when the slot has
// reached it and a reload picks up where the character left off.
var chain = bot.quest.value(CHAIN);
var unlock = bot.quest.value(UNLOCK);
var crypt = bot.quest.value(CRYPT);
if (chain == null || unlock == null || crypt == null) return;

if (chain < 1) return farm(183, 869, 4, "battleundera", "r2", "Right", "Skeletal Fire Mage");
if (chain < 2) return farm(176, 828, 5, "swordhavenundead", "Enter", "Spawn", "Skeletal Soldier");
if (chain < 3) return farm(177, 829, 4, "swordhavenundead", "Extra1", "Center", "Skeletal Ice Mage");
if (chain < 4) return farm(178, 830, 1, "swordhavenundead", "Gates", "Center", "Undead Giant");
if (chain < 5) return mapQuest(179, 831, 5, 38, "castleundead");
if (chain < 6) return farm(180, 832, 6, "castleundead", "Enter", "Spawn", "Skeletal Viking");

// Drakath's arrival at the throne opens Shadowfall. Watching it is the story
// beat; the two writes are the progression, the way the client makes them.
if (unlock < 1) {
    if (!bot.memory.watched) {
        if (!bot.travel("castleundead")) return;
        if (!bot.moveToCell("King2", "Right")) return;
        if (!bot.travel("shadowfall")) return;
        bot.memory.watched = true;
        return;
    }
    if (bot.memory.writes == null) bot.memory.writes = 0;
    if (bot.memory.writes >= 8) {
        bot.fail("quest slot 43 did not take the unlock write");
        return;
    }
    bot.memory.writes++;
    if (!bot.quest.set(UNLOCK, 1)) return;
    if (!bot.quest.set(41, ALIGNMENT)) return;
    return;
}

if (unlock < 2) return farm(196, 900, 1, "chaoscrypt", "Boss2", "Right", "Chaorrupted Armor");
if (unlock < 3) return insurance();

if (crypt < 1) return mapQuest(6217, 42994, 1, 5662, "chaoscrypt");
if (crypt < 2) return farm(6218, 901, 5, "chaoscrypt", "Basement", "Top", "Chaorrupted Knight");
if (crypt < 3) return forest();

bot.log("chaos-prologue: done");
return true;
