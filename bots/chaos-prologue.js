/// name: 13 Lords of Chaos: Prologue
/// desc: The 13 Lords of Chaos prologue, up to the Forest of Chaos.
/// once: true
/// timeout: 45

// The alignment the Shadowfall cutscene offers: 1 Good, 2 Evil, 3 Chaos.
var ALIGNMENT = 2;

var CHAIN = 20;
var UNLOCK = 43;
var CRYPT = 42;

// Unlife Insurance wants a map item and then a shop purchase, so it is not a
// gather. The engine still paces the map item and the buy.
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

// The forest asks two monsters for different items, which is one monster more
// than farm takes.
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

if (chain < 1) return bot.quest.farm(183, "Skeletal Fire Mage", "battleundera", "r2", "Right");
if (chain < 2) return bot.quest.farm(176, "Skeletal Soldier", "swordhavenundead", "Enter", "Spawn");
if (chain < 3) return bot.quest.farm(177, "Skeletal Ice Mage", "swordhavenundead", "Extra1", "Center");
if (chain < 4) return bot.quest.farm(178, "Undead Giant", "swordhavenundead", "Gates", "Center");
if (chain < 5) return bot.quest.gather(179, 38, "castleundead");
if (chain < 6) return bot.quest.farm(180, "Skeletal Viking", "castleundead", "Enter", "Spawn");

// The throne room's cutscene ends in Shadowfall, and the choice it offers is
// two quest writes: the unlock, and the alignment. Those are the progression,
// and Shadowfall is the only map this step walks to, so a step that is asked
// again cannot bounce between two maps.
if (unlock < 1) {
    if (!bot.travel("shadowfall")) return;
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

if (unlock < 2) return bot.quest.farm(196, "Chaorrupted Armor", "chaoscrypt", "Boss2", "Right");
if (unlock < 3) return insurance();

if (crypt < 1) return bot.quest.gather(6217, 5662, "chaoscrypt");
if (crypt < 2) return bot.quest.farm(6218, "Chaorrupted Knight", "chaoscrypt", "Basement", "Top");
if (crypt < 3) return forest();

bot.log("chaos-prologue: done");
return true;
