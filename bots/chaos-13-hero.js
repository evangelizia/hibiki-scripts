/// name: 13 Lords of Chaos: Hero
/// desc: The thirteenth Lord of Chaos, from the mountain top to the final showdown.
/// once: true
/// timeout: 120

// The end of the story runs across four slots: the recap, the war, the beasts
// and the finale. The quest ids say which slot each one belongs to, so the
// order below is the story's, not a counter's.
var RECAP = [3578, 3579, 3580, 3581, 3582, 3583, 3584, 3585, 3586, 3587,
             3588, 3589, 3590, 3591];
var WAR = [3764, 3765, 3766, 3779, 3781, 3788, 3783, 3789, 3785, 3790, 3787];
var BEASTS = [3608, 3618, 3609, 3610, 3611, 3612, 3613, 3614, 3615, 3616,
              3617, 3619];
var REST = [3791, 3792, 3794, 3795, 3620, 3796, 3797, 3798, 3799];
var FINALE = [3875, 3876, 3877, 3878, 3879, 3880, 3881];

// Which monster pays each item a quest asks for.
function spots(table) {
    var out = {};
    for (var id in table) {
        var row = table[id];
        out[id] = { monster: row[0], map: row[1], cell: row[2], pad: row[3] };
    }
    return out;
}

var FIGHT = spots({
    // The war for New Finale
    25796: ["Alliance Virago", "newfinale", "r12", "Left"],
    25782: ["Chaos Challenger", "newfinale", "r3", "Left"],
    25798: ["Alliance Virago", "newfinale", "r12", "Left"],
    25803: ["Chaorrupted Lycan Hunter", "newfinale", "r6", "Right"],
    25800: ["Alliance Virago", "newfinale", "r12", "Left"],
    25804: ["Memory of Vampires", "newfinale", "r9", "Right"],
    25802: ["Alliance Virago", "newfinale", "r12", "Left"],
    25813: ["Alliance Soldier", "newfinale", "r14", "Top"],
    // Into the underworld
    26272: ["Darkness Elemental", "shadowrise", "r2", "Left"],
    26000: ["Death", "shadowattack", "Boss", "Left"],
    // The last three fights
    26875: ["Drakath", "finalbattle", "r1", "Left"],
    26876: ["Drakath", "finalbattle", "r4", "Left"],
    26877: ["Drakath", "finalbattle", "r9", "Left"],
    26879: ["Alteon", "chaosrealm", "r24", "Left"],
    26880: ["Chaos Lord You", "chaoslord", "r2", "Left"],
    26881: ["Prince Drakath", "finalshowdown", "r2", "Left"]
});

// The four map items, as each map's own script hands them over: spot, map, and
// the number of requests. Nothing here names the bag item, because the map
// decides which one a spot pays.
var GROUND = {
    3765: [[2726, "mountdoomskull", 1]],
    3795: [[2894, "drakathfight", 1]],
    3796: [[2895, "shadowrise", 1]],
    3798: [[2896, "shadowattack", 1]]
};

function ground(id) {
    var spots = GROUND[id];
    if (spots == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return false;
    }
    // One spot at a time, remembering how far the list got: the engine forgets
    // its counts the moment the spot changes, so a loop that starts over every
    // tick would re-send the first spot and never reach the last.
    var key = "ground" + id;
    var at = bot.memory[key] || 0;
    while (at < spots.length) {
        if (!bot.travel(spots[at][1])) return false;
        if (!bot.mapItem(spots[at][0], spots[at][2])) return false;
        bot.memory[key] = ++at;
    }
    // The requests went out; the slot is the receipt. A spot that pays nothing
    // leaves this waiting, so it is counted instead.
    var tries = (bot.memory[key + "tries"] || 0) + 1;
    bot.memory[key + "tries"] = tries;
    if (tries > 200) {
        bot.fail("quest " + id + " took nothing from " + spots[0][1]);
    }
}

function work(id) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return true;
        bot.quest.accept(id);
        return;
    }
    // The confrontation is a place, not a chore: the reference walks in before
    // 3875 is turned in, and the map is where the story happens.
    if (id == 3875 && !bot.travel("confrontation")) return;

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
        if (!bot.travel(spot.map)) return;
        if (!bot.moveToCell(spot.cell, spot.pad)) return;
        bot.kill(spot.monster, want.need - want.have);
        return;
    }

    ground(id);
}

// The next quest still standing in a stretch of the story, or null when the
// whole stretch is behind us.
function next(ids) {
    for (var i = 0; i < ids.length; i++) {
        if (!bot.quest.done(ids[i])) return ids[i];
    }
    return null;
}

var step = next(RECAP) || next(WAR) || next(BEASTS) || next(REST) || next(FINALE);
if (step == null) {
    bot.log("chaos-13-hero: done");
    return true;
}
return work(step);
