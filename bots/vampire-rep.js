/// name: Vampire REP
/// desc: Twisted Paw heads in Safiria for Vampire reputation.
/// once: false
/// timeout: 45

// Quest 522 is repeatable with no chain slot, so the rank is the only
// progress. The farm needs the Wolfwing chain behind it: 522 unlocks in
// Safiria at the end of that run, and the reference refuses without it.
var RANK = 10;

var rank = bot.rep("Vampire");
if (rank != null) {
    if (bot.memory.rank !== rank.rank) {
        bot.memory.rank = rank.rank;
        bot.log("vampire: rank " + rank.rank);
    }
    if (rank.rank >= RANK) {
        bot.finish("vampire: rank " + RANK);
        return true;
    }
}

if (!bot.checkpoint("safiria")) return;

if (!bot.quest.farm(522, "Twisted Paw", "safiria", "c11", "Right")) return;
