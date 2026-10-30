/// name: Good REP
/// desc: Burning Loyalists in PoisonForest for Good reputation.
/// once: false
/// timeout: 30

// Quest 1952 pays a thousand reputation a hand-in and repeats: ten Burning
// Knights freed for ten kills. It sits on the PoisonForest chain slot, and the
// client keeps that slot past the quest for good once it is done, so
// `bot.quest.farm` answers done from the first hand-in on and never farms
// again. The long form asks the tracker instead.
var QUEST = 1952;
var SLOT = 46;   // the PoisonForest chain, from the quest data
var OPEN = 9;    // 1952 unlocks once Corrosive Philtre writes 9 to that slot

// r10 holds a Burning Loyalist beside a Traitor Lieutenant.
var FARM = ["r10", "Left"];

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

if (!bot.checkpoint("poisonforest")) return;
if (!bot.travel("poisonforest")) return;

var chain = bot.quest.value(SLOT);
if (chain == null) return;

if (chain < OPEN) {
    bot.fail("good: the PoisonForest chain is not at Corrosive Philtre yet; finish the story first");
    return;
}

if (bot.quest.ready(QUEST)) {
    if (!bot.quest.turnIn(QUEST)) return;
    return true;
}

if (!bot.quest.active(QUEST)) {
    if (!bot.quest.accept(QUEST)) return;
    return true;
}

// Quest items land in the bag with the kill, so there is no floor drop here.
if (!bot.moveToCell(FARM[0], FARM[1])) return;
if (!bot.kill("Burning Loyalist", 1)) return;
bot.aggroRoom();
