/// name: Arcangrove REP
/// desc: Gorillaphants and Seed Spitters for Arcangrove reputation.
/// once: false
/// timeout: 30

// Quests 794-801 are repeatable and share no chain slot: faction rank is the
// only progress, and the client never reports it, so this runs until stopped
// by hand at rank 10. Every quest's items drop from the two farm cells, and
// the mixed one (796, Mustard Seeds plus Pretzel Roots) fills from both legs.
var QUESTS = [794, 795, 796, 797, 798, 799, 800, 801];

if (!bot.checkpoint("arcangrove")) return;
if (!bot.travel("arcangrove")) return;

// The site script registers all eight at once; the tracker holds them the
// same way here. Accept and turn-in need no NPC walk: the client answers both
// remotely once the quest is in its tree.
for (var i = 0; i < QUESTS.length; i++) {
    if (!bot.quest.active(QUESTS[i]) && !bot.quest.accept(QUESTS[i])) return;
}

for (var j = 0; j < QUESTS.length; j++) {
    if (bot.quest.ready(QUESTS[j]) && !bot.quest.turnIn(QUESTS[j])) return;
}

// RightBack holds only Seed Spitters, LeftBack only Gorillaphants; both pads
// are the cells' own entrances, so one pair each serves from anywhere in the
// map. Quest items land in the bag with the kill, so there is no floor drop
// to pick up.
if (!bot.moveToCell("RightBack", "Left")) return;
if (!bot.kill("*", 10)) return;
bot.aggroRoom();

if (!bot.moveToCell("LeftBack", "Left")) return;
if (!bot.kill("*", 10)) return;
bot.aggroRoom();

return true;
