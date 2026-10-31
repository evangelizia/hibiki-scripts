/// name: Apprentice of Awe
/// desc: The Dawn of Lore in the Museum, then Trissa's armor.
/// once: true
/// timeout: 60

var QUEST = 8035;   // The Dawn of Lore, from the Quest Data dump
var SHOP = 1994;    // Trissa's Shop, Museum
var ARMOR = 58177;  // Apprentice of Awe
var NPC = ["Crossroad", "Left"];

// lycanwar's Boss room bounces the avatar to Quest while the Darkovia chain
// (slot 26) reads short of 17. Its own guard clip asks for that value, and
// the Wolfwing run fights Edvard at exactly it, so the run reads the chain
// instead of writing it: the server decides whether a write was allowed, and
// a refused one stalls the pass with nothing in LOG.
var DARKOVIA = 26;
var EDVARD_OPEN = 17;

// Which monster pays each turn-in item. Each pair is the (cell, pad) the
// map's own exits give for that leg, not a pad that merely exists.
var SOURCES = {
    60665: { monster: "Chaos Egg", map: "uppercity", cell: "r3", pad: "Right" },
    60666: { monster: "Edvard", map: "lycanwar", cell: "Boss", pad: "Right",
              chain: true },
    60667: { monster: "O-dokuro", map: "odokuro", cell: "Boss", pad: "Right" },
    // Block Head is a helm the golem drops to the floor, not a quest item
    // the server adds, so its step picks the drop up after the kill.
    1121: { monster: "Stone Golem", map: "cornelis", cell: "Side5",
             pad: "Left", drop: "Block Head" }
};

function collect(id) {
    var wants = bot.quest.wants(id);
    if (wants == null) return;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;

        var spot = SOURCES[want.id];
        if (spot == null) {
            bot.fail("quest " + id + " wants item " + want.id + ", which no step gives");
            return;
        }
        if (spot.chain) {
            var story = bot.quest.value(DARKOVIA);
            if (story == null) return;
            if (story < EDVARD_OPEN) {
                bot.fail("lycanwar Boss wants the Darkovia chain at 17; this hero reads " + story);
                return;
            }
        }
        if (!bot.travel(spot.map)) return;
        if (!bot.moveToCell(spot.cell, spot.pad)) return;
        if (spot.drop != null) {
            if (!bot.kill(spot.monster, 1)) return;
            if (!bot.pickDrop(spot.drop)) return;
            return;
        }
        bot.kill(spot.monster, want.need - want.have);
        return;
    }
}

var done = bot.quest.done(QUEST);
if (done == null) return;

if (done) {
    if (!bot.travel("museum")) return;
    if (!bot.buy(SHOP, ARMOR)) return;
    bot.log("apprentice-of-awe: bought Apprentice of Awe");
    return true;
}

if (!bot.quest.active(QUEST)) {
    if (!bot.travel("museum")) return;
    if (!bot.moveToCell(NPC[0], NPC[1])) return;
    if (!bot.quest.accept(QUEST)) return;
    bot.log("apprentice-of-awe: accepted The Dawn of Lore");
    return;
}

if (bot.quest.ready(QUEST)) {
    if (!bot.travel("museum")) return;
    if (!bot.moveToCell(NPC[0], NPC[1])) return;
    if (!bot.quest.turnIn(QUEST)) return;
    bot.log("apprentice-of-awe: handed in The Dawn of Lore");
    return;
}

collect(QUEST);
