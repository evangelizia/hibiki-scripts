/// name: Vampire REP
/// desc: Twisted Paw heads in Safiria for Vampire reputation.
/// once: false
/// timeout: 45

// Quest 522 is repeatable with no chain of its own, but it sits at value 13
// of chain 26: 521 has to be behind the hero before 522 opens, and 519 and
// 520 before that. The run clears those three first, then farms.
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

var chain = bot.quest.value(26);
if (chain == null) return;

if (chain < 9) {
    bot.fail("vampire: Safiria is locked at chain " + chain + "; run 13 Lords of Chaos: Wolfwing first");
    return;
}
if (chain < 10) {
    if (!bot.quest.farm(519, "Blood Maggot", "safiria", "c1", "Right")) return;
    return;
}
if (chain < 11) {
    if (!bot.quest.farm(520, "Albino Bat", "safiria", "c2", "Bottom")) return;
    return;
}
if (chain < 12) {
    if (!bot.quest.farm(521, "Chaos Lycan", "safiria", "c3", "BtmLeft")) return;
    return;
}

if (!bot.quest.farm(522, "Twisted Paw", "safiria", "c11", "Right")) return;
