/// name: Blade of Awe REP
/// desc: Rank 10 Blade of Awe, off Find the Hilt!
/// once: false
/// timeout: 20

// The five Awe quests are chain steps and pay 44,100 together, which is rank 6
// - the sword's gate, not the relics'. 2935 is the one leg that repeats and
// still pays 11,000, so the top-up to rank 10 is that quest alone.
var HILT = 2935;
var RANK = 10;
var CHAIN = 123;
var UNLOCKED = 2;
var MAP = "castleundead";
var CELL = "Enter";
var PAD = "Left";
var MONSTER = "Skeletal Viking";

var faction = bot.rep("Blade of Awe");
if (faction != null) {
    if (bot.memory.rank !== faction.rank) {
        bot.memory.rank = faction.rank;
        bot.log("blade-of-awe-rep: rank " + faction.rank);
    }
    if (faction.rank >= RANK) {
        bot.finish("blade-of-awe-rep: rank " + faction.rank);
        return true;
    }
}

// The client refuses 2935 below chain 2 with no line in LOG, so the gate is
// read here and named instead.
var chain = bot.quest.value(CHAIN);
if (chain == null) return;
if (chain < UNLOCKED) {
    bot.fail("Find the Hilt! wants the Awe chain at " + UNLOCKED + "; this hero reads " + chain);
    return;
}

if (!bot.travel(MAP)) return;
if (!bot.moveToCell(CELL, PAD)) return;

if (!bot.quest.active(HILT)) {
    if (!bot.quest.accept(HILT)) return;
    return true;
}

// One turn-in is one round: the pass ends here and its timer restarts, so a
// farm that needs two dozen of them never runs into the budget.
if (bot.quest.ready(HILT)) {
    if (!bot.quest.turnIn(HILT)) return;
    return true;
}

bot.kill(MONSTER, 1);
