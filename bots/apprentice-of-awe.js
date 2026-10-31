/// name: Apprentice of Awe
/// desc: The Dawn of Lore in the Museum, then Trissa's armor.
/// once: true
/// timeout: 60

var QUEST = 8035;      // The Dawn of Lore
var SHOP = 1994;       // Trissa's Shop, Museum
var ARMOR = 58177;     // Apprentice of Awe
var NPC = ["Crossroad", "Left"];

// The Boss room of lycanwar sends the avatar back to Quest while slot 26 is
// short, so the Dracowerepyre chain (567) is marked before Edvard is fought.
var DRACO_SLOT = 26;
var DRACO_VALUE = 22;

// Where each turn-in item comes from. The client sends the destination cell
// and pad in one move, so a step names the fight cell itself and not the
// exits on the way to it.
var SOURCES = {
    60665: { map: "uppercity", monster: "Chaos Egg",
             cell: "r3", pad: "Left" },
    60666: { map: "lycanwar", monster: "Edvard", draco: true,
             cell: "Boss", pad: "Left" },
    60667: { map: "odokuro", monster: "O-dokuro",
             cell: "Boss", pad: "Right" },
    1121:  { map: "cornelis", monster: "Stone Golem", drop: "Block Head",
             cell: "Side5", pad: "Left" }
};

function gather(want) {
    var from = SOURCES[want.id];
    if (from == null) {
        bot.fail("item " + want.id + " has no source");
        return;
    }
    if (from.draco) {
        var story = bot.quest.value(DRACO_SLOT);
        if (story == null) return;
        if (story < DRACO_VALUE) {
            bot.quest.set(DRACO_SLOT, DRACO_VALUE);
            return;
        }
    }
    if (!bot.travel(from.map)) return;
    if (!bot.moveToCell(from.cell, from.pad)) return;
    if (from.drop != null && !bot.pickDrop(from.drop)) return;
    bot.kill(from.monster, want.need - want.have);
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
    // A hand-in this run sent leaves the tracker before the slot catches up.
    if (bot.memory.handedIn) return;
    if (!bot.travel("museum")) return;
    if (!bot.moveToCell(NPC[0], NPC[1])) return;
    if (!bot.quest.accept(QUEST)) return;
    bot.log("apprentice-of-awe: accepted The Dawn of Lore");
    return;
}

if (bot.quest.ready(QUEST)) {
    if (!bot.travel("museum")) return;
    if (!bot.moveToCell(NPC[0], NPC[1])) return;
    bot.memory.handedIn = true;
    if (!bot.quest.turnIn(QUEST)) return;
    bot.log("apprentice-of-awe: handed in The Dawn of Lore");
    return;
}

var wants = bot.quest.wants(QUEST);
if (wants == null) return;
for (var i = 0; i < wants.length; i++) {
    if (wants[i].have < wants[i].need) {
        gather(wants[i]);
        return;
    }
}
