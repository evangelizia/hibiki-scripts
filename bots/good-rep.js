/// name: Good REP
/// desc: Good reputation without the PoisonForest story: slimes, then tombs.
/// once: false
/// timeout: 30

// The PoisonForest repeatable (1952) wants the whole storyline, and it pays
// 1000 for ten kills anyway. The older ladder is both open and far richer:
// quest 369 costs nothing to start and pays 250, quest 372 pays 10000 but
// asks for 10000 of reputation first - which is exactly rank 4, the total
// 369 builds. So 369 climbs to the gate and 372 carries the rest.
var EARLY = 369;   // That Hero Who Chases Slimes: 6 Slime in a Jar, 250 rep
var LATE = 372;    // Tomb with a View: 5 Chaorrupted Skull, 10000 rep
var GATE = 10000;  // 372's RequiredFactionRep, the rank 4 total

// Cell names come from the map dumps; the pad is left open because neither
// cell's pads are documented.
var SMALL = ["swordhavenbridge", "Bridge", "Slime"];
var BIG = ["castleundead", "Enter", "*"];

// Null is "no record yet" as well as "none", so a missing answer keeps the
// farm going instead of ending it.
var faction = bot.rep("Good");
if (faction != null) {
    if (bot.memory.rank !== faction.rank) {
        bot.memory.rank = faction.rank;
        bot.log("good: rank " + faction.rank);
    }
    if (faction.rank >= 10) {
        bot.finish("good: rank 10");
        return true;
    }
}

// No answer yet means no points known, and 369 asks for none: the quest that
// needs nothing is the safe default.
var step = faction != null && faction.rep >= GATE ? BIG : SMALL;
var quest = step === BIG ? LATE : EARLY;

if (!bot.checkpoint(step[0])) return;
if (!bot.travel(step[0])) return;
if (!bot.moveToCell(step[1])) return;

if (bot.quest.ready(quest)) {
    if (!bot.quest.turnIn(quest)) return;
    return true;
}

if (!bot.quest.active(quest)) {
    if (!bot.quest.accept(quest)) return;
    return true;
}

// Quest items land in the bag with the kill, so there is no floor drop here.
if (!bot.kill(step[2], 1)) return;
bot.aggroRoom();
