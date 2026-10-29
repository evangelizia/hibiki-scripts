/// name: Dragonslayer
/// desc: Galanoth's four rank quests in the Lair, from Veteran to Marshal.
/// once: true
/// timeout: 60

var GALANOTH = ["Lobby", "Left"];

var RANKS = [
    { id: 165, farm: ["Enter", "Spawn"] },
    { id: 166, farm: ["Hole", "Down"] },
    { id: 167, farm: ["Ledge", "LeftUp"] },
    { id: 168, farm: ["End", "Right"] }
];

if (!bot.travel("lair")) return;

// The client lists active quests, never finished ones, so the bot remembers
// the rank it turned in. Selecting the bot again clears the memory, and the
// active quest is the only thing that can put a fresh run back on track.
if (bot.memory.rank == null) {
    bot.memory.rank = 0;
    if (bot.quest.active(168)) bot.memory.rank = 3;
    else if (bot.quest.active(167)) bot.memory.rank = 2;
    else if (bot.quest.active(166)) bot.memory.rank = 1;
}

if (bot.memory.rank >= RANKS.length) {
    bot.log("Marshal done: buy the Dragonslayer class from Galanoth.");
    return true;
}

var rank = RANKS[bot.memory.rank];

if (!bot.quest.active(rank.id)) {
    if (!bot.moveToCell(GALANOTH[0], GALANOTH[1])) return;
    if (!bot.quest.accept(rank.id)) return;
}

if (bot.quest.ready(rank.id)) {
    if (!bot.moveToCell(GALANOTH[0], GALANOTH[1])) return;
    if (!bot.quest.turnIn(rank.id)) return;
    bot.memory.rank++;
    return;
}

if (!bot.moveToCell(rank.farm[0], rank.farm[1])) return;
if (!bot.kill("*", 1)) return;
if (!bot.pickDrop()) return;
