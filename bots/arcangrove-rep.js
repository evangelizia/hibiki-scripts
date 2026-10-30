/// name: Arcangrove REP
/// desc: Gorillaphants and Seed Spitters for Arcangrove reputation.
/// once: false
/// timeout: 30

// Quests 794-801 are repeatable and share no chain slot: faction rank is the
// only progress, and the client never reports it, so this runs until it is
// stopped by hand at rank 10.
//
// The two farm cells do not drop the same items, and the request rates are
// nothing alike: a "Defeated Seed Spitter" is one kill, a "Gorillaphant Tusk"
// takes many. A fixed number of kills per cell therefore finishes the spitter
// half every pass and leaves the tusk half short forever, so each cell is
// worked until its own turn-in items are held instead.
var QUESTS = [794, 795, 796, 797, 798, 799, 800, 801];

// Turn-in item ids by the monster that drops them, from the quest data.
var SPITTER = {
    cell: ["RightBack", "Left"],
    items: [5573, 5576, 5578, 5580, 5583]
};
var GORILLA = {
    cell: ["LeftBack", "Left"],
    items: [5574, 5577, 5582, 5585]
};

// True once no wanted item from this cell's list is still short. The list is
// read from the client's own quest definitions, so there is no copy of the
// quantities here to drift.
function complete(cell, only) {
    for (var i = 0; i < QUESTS.length; i++) {
        if (!bot.quest.active(QUESTS[i])) continue;
        var wants = bot.quest.wants(QUESTS[i]);
        if (wants == null) return false;
        for (var w = 0; w < wants.length; w++) {
            if (only.indexOf(wants[w].id) < 0) continue;
            if (wants[w].have < wants[w].need) return false;
        }
    }
    return true;
}

// Both cells are worked in the same pass, so the phase is the only thing worth
// a line: a log per kill would bury LOG.
function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("arcangrove: " + name);
}

// The fight belongs to the kill step, and it only ends when the next count is
// asked for. A round that fills mid-run never asks again, so the room would
// stay aggroed for the whole hand-in; end it here instead.
function handIn() {
    bot.stopCombat();
    for (var i = 0; i < QUESTS.length; i++) {
        if (bot.quest.ready(QUESTS[i]) && !bot.quest.turnIn(QUESTS[i])) return false;
    }
    return true;
}

if (!bot.checkpoint("arcangrove")) return;
if (!bot.travel("arcangrove")) return;

// A round is all eight in the tracker. They are only handed in together and
// only accepted together: a quest accepted back the moment it was turned in
// comes back empty, and the next pass farms that quest again instead of
// finishing the round, so the other cell is never reached.
//
// "Any quest is active" is not "the round has started": after the first accept
// that is true, and the other seven would never be asked for.
var allActive = true;
for (var s = 0; s < QUESTS.length; s++) {
    if (!bot.quest.active(QUESTS[s])) allActive = false;
}

if (!allActive) {
    // Either the round has not started, or it is being handed in. Anything
    // ready goes first, and only when nothing is left does the next round
    // begin: that is what keeps a hand-in from being undone by a re-accept.
    var ready = false;
    for (var r = 0; r < QUESTS.length; r++) {
        if (bot.quest.ready(QUESTS[r])) ready = true;
    }

    if (ready) {
        handIn();
        return;
    }

    // Everything handed in: start the next round. The pass ends here, so a
    // farm that never finishes still restarts its own timeout instead of
    // running into it.
    for (var take = 0; take < QUESTS.length; take++) {
        if (!bot.quest.active(QUESTS[take]) && !bot.quest.accept(QUESTS[take])) return;
    }
    return true;
}

// A half-finished round keeps working; the hand-ins wait until both cells have
// supplied what their quests ask for.
var gorillaDone = complete(GORILLA.cell[0], GORILLA.items);
var spitterDone = complete(SPITTER.cell[0], SPITTER.items);

// Quest items land in the bag with the kill, so there is no floor drop here.
if (!gorillaDone) {
    phase("gorillaphants");
    if (!bot.moveToCell(GORILLA.cell[0], GORILLA.cell[1])) return;
    if (!bot.kill("*", 5)) return;
    bot.aggroRoom();
    return;
}

if (!spitterDone) {
    phase("seed spitters");
    if (!bot.moveToCell(SPITTER.cell[0], SPITTER.cell[1])) return;
    if (!bot.kill("*", 5)) return;
    bot.aggroRoom();
    return;
}

phase("turning in");
if (!handIn()) return;

bot.memory.phase = "";
return true;
