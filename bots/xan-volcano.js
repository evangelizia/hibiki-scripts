/// name: Xan's Lair: Volcano
/// desc: The Volcano half of Xan's story, twenty levels from the Lava Golem to Magman.
/// once: true
/// timeout: 120

// Every quest in the story counts on one slot, 53, from 1 to 20 here, so the
// order below is the story's and a finished quest is skipped by its own value.
var STORY = [1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251,
             1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261];

// Which monster pays each item, and where that fight belongs. The imp cells
// are r10 and r12; r10 is the one the other Volcano farmers use.
var FIGHT = {
    8970: ["Lava Golem", "volcano", "r5", "Left"],
    8972: ["Fire Imp", "volcano", "r10", "Left"],
    8973: ["Fire Imp", "volcano", "r10", "Left"],
    8975: ["Lava Golem", "volcano", "r5", "Left"],
    8976: ["Fire Imp", "volcano", "r10", "Left"],
    8977: ["Fire Imp", "volcano", "r10", "Left"],
    8979: ["Flamethrower Dwakel", "volcano", "r9", "Left"],
    8981: ["Fire Imp", "volcano", "r10", "Left"],
    8982: ["Flamethrower Dwakel", "volcano", "r9", "Left"],
    8984: ["Fire Imp", "volcano", "r10", "Left"],
    8985: ["Flame Elemental", "volcano", "r13", "Left"],
    8987: ["Fire Imp", "volcano", "r10", "Left"],
    8988: ["Fire Imp", "volcano", "r10", "Left"],
    8990: ["Flamethrower Dwakel", "volcano", "r9", "Left"],
    8991: ["Fire Imp", "volcano", "r10", "Left"],
    8993: ["Fire Imp", "volcano", "r10", "Left"],
    8994: ["Magman", "volcano", "r21", "Left"]
};

// The map items: the spot the server names, the item it puts in the bag, how
// many the quest wants, and the map.
var GROUND = {
    1243: [526, 8971, 3, "volcano"],
    1245: [527, 8974, 8, "volcano"],
    1248: [528, 8978, 12, "volcano"],
    1250: [529, 8980, 8, "volcano"],
    1252: [530, 8983, 10, "volcano"],
    1254: [531, 8986, 12, "volcano"],
    1257: [532, 8989, 10, "volcano"],
    1260: [533, 8992, 6, "volcano"]
};

function work(id) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return;
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return;
    }

    var wants = bot.quest.wants(id);
    if (wants == null) return;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;
        var spot = FIGHT[want.id];
        if (spot == null) continue;
        if (!bot.travel(spot[1])) return;
        if (!bot.moveToCell(spot[2], spot[3])) return;
        // A kill step counts down from what is missing; a map item is the
        // other way round, so the bag id goes with it below.
        bot.kill(spot[0], want.need - want.have);
        return;
    }

    var ground = GROUND[id];
    if (ground == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return;
    }
    if (!bot.travel(ground[3])) return;
    bot.mapItem(ground[0], ground[2], ground[1]);
}

// The client describes one quest at a time, so a quest is not acted on before
// its own answer is in: on a resume that is what keeps the story from starting
// over at the first level.
var step = null;
for (var i = 0; i < STORY.length; i++) {
    var done = bot.quest.done(STORY[i]);
    if (done == null) return;
    if (!done) {
        step = STORY[i];
        break;
    }
}
if (step == null) {
    bot.log("xan-volcano: done");
    return true;
}
work(step);
