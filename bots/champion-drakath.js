/// name: Champion Drakath
/// desc: The weekly Champion Drakath kill, with the leader taunting every nuke.
/// once: true
/// timeout: 30

// Champion Drakath nukes at fixed health marks and the room wipes if the
// taunt is not up: 18M, 16M, 14M, 12M, 8M, 6M, 4M. The marks at 10M
// (Unleashed Chaos) and 2M (Meteor) are left alone - the first does not need
// a taunt and the second ignores it. The leader holds Scroll of Enrage so the
// taunt is theirs; everyone else keeps a potion in slot 5.
var BOSS = "Champion Drakath";
var MAP = "championdrakath";
var QUEST = 8300;

var FATE = 11683;          // Fate Tonic
var ELIXIR = 11741;        // Potent Battle Elixir
var HONOR = 11736;         // Potent Honor Potion
var SCROLL = 12917;        // Scroll of Enrage

var NUKES = [18000000, 16000000, 14000000, 12000000, 8000000, 6000000, 4000000];
// Press a little before the mark: Focus has to be up when the nuke lands.
var LEAD = 250000;

// Three potions, each as equip-then-use on leader and party, then the scroll
// onto the leader. One action per pass, so the engine pace spaces them: a
// follower's use has to come after its own equip window, or the session
// drops it.
var BUFFS = [FATE, ELIXIR, HONOR];
var STEPS = BUFFS.length * 4 + 1;

function buff() {
    var step = bot.memory.step || 0;
    if (step >= STEPS) return true;

    var phase = step % 4;
    var item = step < BUFFS.length * 4 ? BUFFS[Math.floor(step / 4)] : SCROLL;
    var done;
    if (phase == 0) done = bot.equip(item);
    else if (phase == 1) done = bot.followers.equip(item);
    else if (phase == 2) done = bot.use(item);
    else done = bot.followers.use(item);

    if (done) bot.memory.step = step + 1;
    return false;
}

// Focus is the aura the scroll puts on the boss; a threshold is spent once it
// is up, so the press stops instead of burning the whole stack.
function taunt() {
    var boss = bot.monster(BOSS);
    if (boss == null || !boss.alive) return;

    var fired = bot.memory.fired || {};
    var pressed = bot.memory.pressed || {};
    // A wipe or a respawn fills the bar again, so the marks are new.
    if (boss.hp > (bot.memory.hp || 0) + 1000000) {
        fired = {};
        pressed = {};
    }
    bot.memory.hp = boss.hp;

    var i;
    for (i = 0; i < NUKES.length; i++) {
        if (fired[i] || boss.hp > NUKES[i] + LEAD) continue;
        if (boss.aura("focus") > 0) {
            fired[i] = true;
            continue;
        }
        if (!pressed[i]) {
            pressed[i] = true;
            bot.log("taunt " + (NUKES[i] / 1000000) + "M");
        }
        bot.memory.fired = fired;
        bot.memory.pressed = pressed;
        bot.use(SCROLL);
        return;
    }
    bot.memory.fired = fired;
    bot.memory.pressed = pressed;
}

if (!bot.travel(MAP)) return;

// The boss has its own cell in this room; walk to it instead of naming a
// layout, and take the monster's own pad when the map gives one.
var where = bot.roomMonster(BOSS);
if (where == null || where.cell == "") return;
if (!bot.moveToCell(where.cell, where.pad || "Left")) return;

if (!bot.quest.active(QUEST) && !bot.quest.accept(QUEST)) return;

// A taunter without a scroll is a wipe with extra steps: say so now.
var scrolls = bot.item(SCROLL);
if (scrolls == null) return;
if (scrolls < 1) {
    bot.fail("no Scroll of Enrage to taunt with");
    return;
}

if (!buff()) return;

if (!bot.memory.killed) {
    if (!bot.kill(BOSS, 1)) {
        taunt();
        return;
    }
    bot.memory.killed = true;
    bot.memory.hp = 0;
}

// The Defeated item lands a beat after the kill; ready is the client's answer
// that the hand-in would be taken now.
if (!bot.quest.ready(QUEST)) return;
if (!bot.quest.turnIn(QUEST)) return;
if (!bot.pickDrop()) return;

bot.memory.step = 0;
bot.memory.killed = false;
bot.memory.fired = {};
bot.memory.pressed = {};
return true;
