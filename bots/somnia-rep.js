/// name: Somnia REP
/// desc: Somnia reputation to rank 10, three repeatable quests.
/// once: false
/// timeout: 45

// All three quests are repeatable with no chain slot, so the rank is the only
// progress. One pass does one farm step; a hand-in ends the pass, and the
// next one reads the new counts with nothing swinging.
//
// Each cell holds only its target, or shares with as few others as possible,
// and each pad is the arrival the map's own exits give for that leg.
var RANK = 10;

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

if (!bot.quest.farm(7665, "Nightspore", "somnia", "r8", "Left")) return;
if (!bot.quest.farm(7666, "Orpheum Elemental", "somnia", "r9", "Left")) return;
if (!bot.quest.farm(7669, "Dream Larva", "somnia", "r3", "Left")) return;
