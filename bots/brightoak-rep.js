/// name: Brightoak REP
/// desc: Elfhame puzzle runs for Brightoak reputation.
/// once: false
/// timeout: 30

// Quest 4667 sits on the Brightoak chain slot, so it only opens once the
// fourth rune is done: the story bot gets there. The faction rank is the
// client's own number, so the run ends itself at rank 10.
var QUEST = 4667;
var PUZZLE = 3984;

// 4666 is the step before it on the same chain slot. Done means the chain is
// past it, so the puzzle quest is open; not done means the story is unfinished.
function opened() {
    return bot.quest.done(4666);
}

// Null is "no record yet" as well as "none", so a missing answer keeps the
// farm going instead of ending it.
var faction = bot.rep("Brightoak");
if (faction != null) {
    if (bot.memory.rank !== faction.rank) {
        bot.memory.rank = faction.rank;
        bot.log("brightoak: rank " + faction.rank);
    }
    if (faction.rank >= 10) {
        bot.finish("brightoak: rank 10");
        return true;
    }
}

if (!bot.checkpoint("elfhame")) return;
if (!bot.travel("elfhame")) return;

if (!bot.quest.active(QUEST)) {
    var ready = opened();
    if (ready === false) {
        bot.fail("brightoak: finish the story through Unlocking the Guardian's Fourth Rune first");
        return;
    }
    if (ready == null) return;
    if (!bot.quest.accept(QUEST)) return;
    bot.memory.puzzle = false;
    bot.memory.waits = 0;
    return;
}

if (bot.quest.ready(QUEST)) {
    if (!bot.quest.turnIn(QUEST)) return;
    bot.memory.puzzle = false;
    return true;
}

// One map item per round. The pass count is the only clock a script has, so
// the request is repeated now and then in case it landed while the bot was
// looking elsewhere.
bot.memory.waits = (bot.memory.waits || 0) + 1;
if (bot.memory.waits % 20 === 0) {
    bot.memory.puzzle = false;
}

if (bot.memory.puzzle) return;

if (!bot.mapItem(PUZZLE, 1, 0)) return;
bot.memory.puzzle = true;
