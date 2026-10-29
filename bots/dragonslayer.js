/// name: Dragonslayer
/// desc: Galanoth's four rank quests in the Lair, from Veteran to Marshal.
/// once: true
/// timeout: 60

var GALANOTH = ["Lobby", "Left"];

var RANKS = [
    { id: 165, name: "Veteran", farm: ["Enter", "Spawn"] },
    { id: 166, name: "Sergeant", farm: ["Hole", "Down"] },
    { id: 167, name: "Captain", farm: ["Ledge", "LeftUp"] },
    { id: 168, name: "Marshal", farm: ["End", "Right"] }
];

if (!bot.travel("lair")) return;

// Slot 18 is the chain's counter: it reads 1 after Veteran and 4 after
// Marshal. Unlike the tracker and this script's memory it survives a reload,
// so a run that is picked up again does not start over at Veteran.
var done = bot.quest.value(18);
if (done == null) return;

if (bot.memory.rank == null) bot.memory.rank = 0;
if (done > bot.memory.rank) bot.memory.rank = done;
if (bot.memory.rank > RANKS.length) bot.memory.rank = RANKS.length;

// A quest in the tracker may be running. It can move the rank forward, never
// back: a repeatable quest left in the tracker must not pull the run down to
// a rank the counter already passed.
for (var i = RANKS.length - 1; i >= 0; i--) {
    if (bot.quest.active(RANKS[i].id)) {
        if (i > bot.memory.rank) bot.memory.rank = i;
        break;
    }
}

if (bot.memory.rank >= RANKS.length) {
    bot.log("dragonslayer: Marshal done, buy the class from Galanoth");
    return true;
}

var rank = RANKS[bot.memory.rank];
if (bot.memory.shown !== rank.id) {
    bot.memory.shown = rank.id;
    bot.log("dragonslayer: " + rank.name + " (" + (bot.memory.rank + 1) + " of " + RANKS.length + ")");
}

if (!bot.quest.active(rank.id)) {
    if (!bot.moveToCell(GALANOTH[0], GALANOTH[1])) return;
    if (!bot.quest.accept(rank.id)) return;
}

if (bot.quest.ready(rank.id)) {
    if (!bot.moveToCell(GALANOTH[0], GALANOTH[1])) return;
    if (!bot.quest.turnIn(rank.id)) return;
    bot.log("dragonslayer: " + rank.name + " done");
    bot.memory.rank++;
    return;
}

if (!bot.moveToCell(rank.farm[0], rank.farm[1])) return;
if (!bot.kill("*", 1)) return;
if (!bot.pickDrop()) return;
