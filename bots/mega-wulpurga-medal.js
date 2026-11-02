/// name: Mega Wulpurga Medal
/// desc: Vampiric Ancestors in ShadowSlayer War for Mega Wulpurga Medals.
/// once: false
/// timeout: 30

// Quest 10909 is repeatable, so farm() would answer at once on its chain
// value; the quest is accepted, killed and handed in by hand instead.
if (!bot.travel("shadowslayerwar")) return;
if (!bot.moveToCell("r8")) return;

if (!bot.quest.active(10909)) { bot.quest.accept(10909); return; }

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
