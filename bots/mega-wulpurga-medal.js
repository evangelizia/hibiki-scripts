/// name: Mega Wulpurga Medal
/// desc: Vampiric Ancestors in ShadowSlayer War for Wulpurga Medals.
/// once: false
/// timeout: 30

// Quests 10908 and 10909 are repeatable, so farm() would answer at once on
// their chain value; the quests are accepted, killed and handed in by hand
// instead. One kill feeds both trackers, so both stay active.
if (!bot.travel("shadowslayerwar")) return;
if (!bot.moveToCell("r8")) return;

if (!bot.quest.active(10908)) { bot.quest.accept(10908); return; }
if (!bot.quest.active(10909)) { bot.quest.accept(10909); return; }

if (bot.quest.ready(10908)) {
    if (bot.quest.turnIn(10908)) return true;
    return;
}

if (bot.quest.ready(10909)) {
    if (bot.quest.turnIn(10909)) return true;
    return;
}

// The room is provoked once the ancestor is down, before the loot is picked
// up: the next pass starts the next kill, so every fight after the first
// opens with the room already on the player.
if (!bot.kill("Vampiric Ancestor", 1)) return;
bot.aggroRoom();
if (!bot.pickDrop()) return;
return true;
