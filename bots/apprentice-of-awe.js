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

// Where each turn-in item comes from, and the exits to walk. A pair is the
// destination cell and the pad the map itself lands on for that leg.
var SOURCES = {
    60665: { map: "uppercity", monster: "Chaos Egg",
             route: [["r1", "Right"], ["r2", "Right"], ["r3", "Right"]] },
    60666: { map: "lycanwar", monster: "Edvard", draco: true,
             route: [["War", "Left"], ["War2", "Right"], ["Boss", "Right"]] },
    60667: { map: "odokuro", monster: "O-dokuro",
             route: [["Boss", "Right"]] },
    1121:  { map: "cornelis", monster: "Stone Golem", drop: "Block Head",
             route: [["Side1", "Left"], ["Side3", "Right"],
                     ["Side4", "Right"], ["Side5", "Left"]] }
};

// One exit per pass: moveToCell answers only after the snapshot shows the pad.
function walk(route) {
    for (var i = 0; i < route.length; i++) {
        if (!bot.moveToCell(route[i][0], route[i][1])) return false;
    }
    return true;
}

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
    if (!walk(from.route)) return;
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
