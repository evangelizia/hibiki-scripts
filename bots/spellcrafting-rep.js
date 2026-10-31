/// name: SpellCrafting REP
/// desc: Ember and Hallow ink scrolls for SpellCrafting reputation, to rank 10.
/// once: false
/// timeout: 45

// 2260 is the once-only opener: one map item in dragonrune, thirteen parchment
// from the skeletal warriors, and it pays the first 500 rep.
//
// After that there is no chain slot to count - both crafting quests are
// repeatable on slot -1 - so the rank is the only progress. 2299 pays 250 for
// one Ember Ink and 2322 pays 2,550 for one Hallow Ink, and both inks are
// bought for a single drop, which is why the reference switches paths at rank 4
// and never comes back.
//
// One pass does one thing: hand in, buy one ink, or kill for a drop. A hand-in
// ends the pass, so the next one reads the new counts with nothing swinging.
//
// The two drops are shop currency, not quest items, so they land on the floor
// and wait for a click: the pickup comes before the next kill, because a fight
// started over a drop is a fight the drop may not survive.
var EMBER = {
    quest: 2299,
    ink: 13280,
    drop: 15973,
    map: "mobius",
    cell: "Slugfit",
    pad: "Bottom",
    monster: "Slugfit"
};

var HALLOW = {
    quest: 2322,
    ink: 13285,
    drop: 15974,
    map: "underworld",
    cell: "r5",
    pad: "Left",
    monster: "Skull Warrior"
};

var SHOP = 549;
var SHOP_MAP = "dragonrune";
var OPENING = 2260;
var MAP_ITEM = 1920;
var PARCHMENT = 18871;
var RUNETHREAD = 18872;
var RANK = 10;
var SWITCH = 4;

function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("spellcrafting: " + name);
}

// The quest's own turnin list, so no quantity is copied here.
function want(wants, id) {
    if (wants == null) return null;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].id == id) return wants[i];
    }
    return null;
}

// The opener, one request or one kill per pass. Both are gated on the counts
// the quest itself reports, so a step that never paid is asked again instead of
// counted.
function opener() {
    if (!bot.quest.active(OPENING)) {
        bot.quest.accept(OPENING);
        return;
    }

    var wants = bot.quest.wants(OPENING);
    if (wants == null) return;

    var thread = want(wants, RUNETHREAD);
    if (thread != null && thread.have < thread.need) {
        phase("silver runethread");
        if (!bot.travel(SHOP_MAP)) return;
        var asks = (bot.memory.asks || 0) + 1;
        bot.memory.asks = asks;
        if (asks > 60) {
            bot.fail("map item " + MAP_ITEM + " never paid the Silver Runethread");
            return;
        }
        bot.mapItem(MAP_ITEM, thread.need);
        return;
    }

    var paper = want(wants, PARCHMENT);
    if (paper != null && paper.have < paper.need) {
        phase("arcane parchment");
        if (!bot.travel("castleundead")) return;
        if (!bot.moveToCell("Enter", "Left")) return;
        bot.kill("Skeletal Warrior", 1);
        return;
    }

    if (bot.quest.ready(OPENING)) bot.quest.turnIn(OPENING);
}

// The hand-in loop for one ink. `true` means a hand-in went out and the pass
// restarted; every other path keeps the pass open.
function craft(path) {
    var ink = bot.item(path.ink);
    var drop = bot.item(path.drop);
    if (ink == null || drop == null) return false;

    if (!bot.quest.active(path.quest)) {
        bot.quest.accept(path.quest);
        return false;
    }
    if (bot.quest.ready(path.quest)) return bot.quest.turnIn(path.quest);

    // The shop sells one ink for one drop, so a pass buys one. Asking for the
    // whole stack instead would spend the pass waiting on the shop timer.
    if (drop > 0) {
        phase(path.monster.toLowerCase() + ": shop");
        if (!bot.travel(SHOP_MAP)) return false;
        bot.buy(SHOP, path.ink, ink + 1);
        return false;
    }

    phase(path.monster.toLowerCase());
    if (!bot.travel(path.map)) return false;
    if (!bot.moveToCell(path.cell, path.pad)) return false;
    if (!bot.pickDrop()) return false;
    bot.kill(path.monster, 1);
    return false;
}

// Null is "no record yet" as well as "none": a character with no reputation
// spent has no faction record at all, and that is the rank 1 path.
var faction = bot.rep("SpellCrafting");
if (faction != null) {
    if (bot.memory.rank !== faction.rank) {
        bot.memory.rank = faction.rank;
        bot.log("spellcrafting: rank " + faction.rank);
    }
    if (faction.rank >= RANK) {
        bot.finish("spellcrafting: rank " + RANK);
        return true;
    }
}

if (!bot.checkpoint(SHOP_MAP)) return;

var opening = bot.quest.done(OPENING);
if (opening === null) return;
if (!opening) {
    opener();
    return;
}

var path = faction != null && faction.rank >= SWITCH ? HALLOW : EMBER;
if (craft(path)) return true;
