/// name: Somnia REP
/// desc: Somnia reputation to rank 10, three repeatable quests.
/// once: false
/// timeout: 45

// All three quests are repeatable with no chain slot, so the rank is the only
// progress - and a repeatable quest is never finished, only handed in. Chaining
// one farm call after another starves everything past the first: the first
// quest re-accepts the pass after its hand-in, so the later lines never run.
// The run therefore rotates: one quest per round, advancing when its hand-in
// leaves the tracker.
//
// Each cell holds only its target, or shares with as few others as possible,
// and each pad is the arrival the map's own exits give for that leg. One kill
// per pass: the drop rate is then irrelevant, and a hand-in never strands a
// fight mid-count.
var RANK = 10;

var QUESTS = [
    { id: 7665, name: "Dream Truffles", monster: "Nightspore",
      cell: "r8", pad: "Left" },
    { id: 7666, name: "Simple Orphium Blade", monster: "Orpheum Elemental",
      cell: "r9", pad: "Left" },
    { id: 7669, name: "Dreamsilk Hair", monster: "Dream Larva",
      cell: "r3", pad: "Left" }
];

var rank = bot.rep("Somnia");
if (rank != null) {
    if (bot.memory.rank !== rank.rank) {
        bot.memory.rank = rank.rank;
        bot.log("somnia: rank " + rank.rank);
    }
    if (rank.rank >= RANK) {
        bot.finish("somnia: rank " + RANK);
        return true;
    }
}

if (!bot.checkpoint("somnia")) return;

// A hand-in going out is remembered first: the tracker clears a pass later,
// and that - not the send - is what moves the rotation on.
function handIn(q) {
    bot.memory.sent = q.id;
    bot.quest.turnIn(q.id);
}

// Anything ready is handed in first, one per pass, so a re-selected run does
// not wait a full rotation to collect what is already complete.
for (var i = 0; i < QUESTS.length; i++) {
    if (bot.quest.active(QUESTS[i].id) && bot.quest.ready(QUESTS[i].id)) {
        handIn(QUESTS[i]);
        return;
    }
}

if (bot.memory.at == null) bot.memory.at = 0;
var q = QUESTS[bot.memory.at % QUESTS.length];

if (!bot.quest.active(q.id)) {
    if (bot.memory.sent === q.id) {
        bot.memory.sent = 0;
        bot.memory.at = bot.memory.at + 1;
        return;
    }
    if (bot.memory.quest !== q.id) {
        bot.memory.quest = q.id;
        bot.log("somnia: " + q.name);
    }
    bot.quest.accept(q.id);
    return;
}

if (bot.quest.ready(q.id)) {
    handIn(q);
    return;
}

if (!bot.travel("somnia")) return;
if (!bot.moveToCell(q.cell, q.pad)) return;
bot.kill(q.monster, 1);
