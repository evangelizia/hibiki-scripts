/// name: Gold: BattleGround E
/// desc: Ice Lords at r2, handing in Level 61-75 until the gold target is met.
/// once: false
/// timeout: 10

// The reference farm (Skua's CoreFarms.BattleGroundE) registers both the
// "Level 46-60" and the "Level 61-75" quest here. Only the E salle's monsters
// pay the E item, so the D quest would never fill and is left out.
var QUEST = 3992;
var MAP = "battlegrounde";
var CELL = "r2";
var PAD = "Center";
// The quest wants ten of its item, so a batch is one hand-in.
var BATCH = 10;
// Stop here. The purse stops at 100,000,000 in the client, so that is the
// ceiling a farm can reach; lower it if you only want a top-up.
var TARGET = 100000000;

// Gold is read from the client every pass. A build that keeps it elsewhere
// answers null, and a farm that cannot see the purse must not mistake silence
// for a full one: count the silence, then say so.
if (bot.gold == null) {
    var silent = (bot.memory.silent || 0) + 1;
    bot.memory.silent = silent;
    if (silent > 300) bot.fail("gold is not readable");
    return;
}
bot.memory.silent = 0;

if (bot.gold >= TARGET) {
    bot.finish("gold " + bot.gold);
    return true;
}

if (!bot.checkpoint(MAP)) return;
if (!bot.travel(MAP)) return;
if (!bot.moveToCell(CELL, PAD)) return;

if (bot.quest.ready(QUEST)) {
    bot.stopCombat();
    bot.quest.turnIn(QUEST);
    return;
}

// A character under level 61 cannot take this quest, and the engine stops the
// run with "would not start" rather than accepting nothing forever.
if (!bot.quest.active(QUEST)) {
    bot.quest.accept(QUEST);
    return;
}

if (!bot.kill("*", BATCH)) return;
if (!bot.pickDrop()) return;
return true;
