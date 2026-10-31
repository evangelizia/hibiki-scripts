/// name: Xan's Lair: Andesi and Warlic
/// desc: The rest of Xan's story, from Andesi's burning town to Warlic's sealed library.
/// once: true
/// timeout: 90

// The same slot as the Volcano half, 53, continuing at 21; a finished quest is
// skipped by its own value, so this bot picks up wherever the story stands.
var STORY = [1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740,
             2151, 2152, 2153, 2154, 2155, 2156, 2157];

// Which monster pays each item, and where that fight belongs. Xan is in r7 and
// r8; r8 is the cell the other Xan Town farmers use.
var FIGHT = {
    11322: ["Fire Imp", "xantown", "Enter", "Spawn"],
    11323: ["Fire Imp", "xantown", "Enter", "Spawn"],
    11324: ["Fire Imp", "xantown", "Enter", "Spawn"],
    11328: ["Xan", "xantown", "r8", "Left"],
    12569: ["Lava Goblin", "xancave", "r5", "Left"],
    12571: ["Lava Goblin", "xancave", "r5", "Left"],
    12572: ["Lava Goblin", "xancave", "r5", "Left"],
    12573: ["Lava Goblin", "xancave", "r5", "Left"],
    12575: ["Shurpu Ring Guardian", "xancave", "r11", "Left"]
};

// The map items: the spot the server names, the item it puts in the bag, how
// many, and the map. xantown is force-aggroed, so its requests are asked from
// wherever the last step left the character rather than standing in a fight.
var GROUND = {
    1733: [922, 11321, 1, "xantown"],
    1737: [923, 11325, 4, "xantown"],
    1738: [924, 11326, 1, "xantown"],
    1739: [925, 11327, 1, "xantown"],
    2151: [1220, 12568, 1, "xancave"],
    2153: [1221, 12570, 1, "xancave"],
    2155: [1223, 12574, 8, "xancave"],
    2157: [1222, 12576, 1, "xancave"]
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

// As in the Volcano half, nothing is accepted before the client has described
// the quest: a resume must not start the story over at level one.
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
    bot.log("xan-lair: done");
    return true;
}
work(step);
