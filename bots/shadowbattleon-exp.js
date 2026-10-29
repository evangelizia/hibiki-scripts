/// name: Shadow Battleon EXP
/// desc: Doomed Trolls at Enter, handing in both Shadow Hunt quests.
/// once: false
/// timeout: 10

if (!bot.travel("shadowbattleon")) return;

if (!bot.quest.active(9421)) { bot.quest.accept(9421); return; }
if (!bot.quest.active(9422)) { bot.quest.accept(9422); return; }

if (bot.quest.ready(9421)) {
    if (bot.quest.turnIn(9421)) return true;
    return;
}

if (bot.quest.ready(9422)) {
    if (bot.quest.turnIn(9422)) return true;
    return;
}

// The room is provoked once the troll is down, before the loot is picked up:
// the next pass starts the next kill, so every fight after the first opens
// with the room already on the player. Inside a fight, kill() returns before
// this line, so the request never waits out its pace mid-fight.
if (!bot.kill("Doomed Troll", 1)) return;
bot.aggroRoom();
if (!bot.pickDrop()) return;
return true;
