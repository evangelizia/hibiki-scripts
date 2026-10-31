/// name: ArchPaladin
/// desc: The ArchPaladin class chain, from the seal to the class item.
/// once: true
/// timeout: 0

// One pass is the whole chain, and the energy leg alone is a thousand kills,
// so the pass budget is off and every dead end ends the run with its reason.

// 5463 to 5470 all write the same chain slot, one value each, so that slot is
// the whole resume point - and the class's own shop item opens at 8.
var CHAIN = 219;
var QUESTS = [5463, 5464, 5465, 5466, 5467, 5468, 5469, 5470];

var HUB = "darkthronehub";
var CLASS_SHOP = 1303;
var CLASS_ITEM = 36920;

// Two turn-ins are bought for gold and both want Good rank 10 - the seal and
// the hand grenade - so the reputation is a prerequisite, not a step here.
// Farming it belongs to the Good REP bot, which sits behind the PoisonForest
// story; this script only asks and refuses to start without it.
var GOOD = "Good";
var GOOD_RANK = 10;

// Undead Energy does not drop until the spellbook's own chain writes 5.
var DOOMWOOD = [2066, 2067, 2082, 2083, 2084];
var DOOMWOOD_SLOT = 78;

// One ArchMage Ink becomes five scrolls, and the ink is a merge of two Mystic
// Shards that opens at SpellCrafting rank 8.
var SCROLL_QUEST = 2347;
var ARCHMAGE_INK = 13289;
var SHARDS = 15975;
var INK_SHOP = 549;
var INK_MAP = "dragonrune";
var INK_RANK = 8;
var SKULL = ["underworld", "r5", "Left", "Skull Warrior"];

var ENERGY = 11285;
var SCROLL = 12934;

// item -> map, cell, pad, and the monster that pays it. Everything the quests
// count in hundreds is here too: the fight is one kill a pass either way, and
// a real item waits on the floor, so the pickup comes before the next kill.
var HUNT = {
    18093: ["doomvault", "r5", "Left", "Binky"],
    22341: ["banished", "r14", "Left", "Desterrat Moya"],
    25144: ["doomkitten", "Enter", "Spawn", "DoomKitten"],
    11285: ["battleunderb", "Enter", "Spawn", "Skeleton Warrior"],
    37121: ["vordredboss", "f1", "Spawn", "Vordred"],
    37124: ["dreadfight", "Enter", "Spawn", "*"],
    6697: ["battleunderb", "Enter", "Spawn", "Skeleton Warrior"],
    598: ["battleunderb", "Enter", "Spawn", "Skeleton Warrior"],
    12184: ["battleunderb", "Enter", "Spawn", "Skeleton Warrior"],
    18350: ["timevoid", "Frame1", "Left", "Ephemerite"],
    11343: ["xantown", "r8", "Left", "Xan"],
    27719: ["northstar", "r12", "Left", "Karok the Fallen"],
    37045: ["thunderfang", "r12", "Bottom", "Lightning Ball"],
    23823: ["dragonheart", "r7", "Left", "Proto-Air Dracolich"],
    37046: ["downward", "r11", "Right", "Crystal Mana Construct"],
    37047: ["farm", "End", "Right", "Treeant"],
    32286: ["thirdspell", "r3", "Left", "Mana Phoenix"],
    37048: ["manor", "r9", "Down", "Bird of Paradise"],
    37049: ["doomwood", "r6", "Right", "*"],
    37050: ["fotia", "r6", "Left", "Amia the Cult Leader"],
    37051: ["brightfall", "r3", "Left", "Painadin Overlord"],
    37052: ["citadel", "m14", "Left", "Grand Inquisitor"],
    37053: ["alliance", "r3", "Left", "Good Lieutenant"],
    11770: ["poisonforest", "r15", "Left", "Xavier Lionfang"],
    37055: ["ultraalteon", "r10", "Left", "Ultra Chaos Alteon"],
    37056: ["newfinale", "r2", "Left", "Alliance Healer"],
    37057: ["skytower", "r11", "Bottom", "Dove"],
    12583: ["xancave", "r11", "Left", "Shurpu Ring Guardian"],
    37058: ["onslaughttower", "r6", "Right", "Golden Caster"],
    37059: ["palace", "r8", "Up", "Pettivox"],
    37060: ["seraph", "r15", "Left", "Adventus"],
    37061: ["marsh", "Forest1", "Left", "Marsh Tree"],
    37062: ["wanders", "r5", "Left", "Lotus Spider"],
    37063: ["gaiazor", "r2", "Left", "Wisterrora"],
    37064: ["bloodtusk", "r6", "Left", "Trollola Plant"],
    37065: ["gaiazor", "r7", "Left", "Nevanna"],
    37066: ["infernalspire", "r21a", "Left", "Malxas"]
};

// item -> shop, the map it loads in, and the gold the step needs in the bag.
// A shop with no price still needs the map; the client refuses the purchase
// quietly when the gold or the reputation is short, and the call then fails.
var BUY = {
    8491: [288, "temple", 35000],
    37037: [1308, "darkthronehub", 500000],
    1843: [88, "castle", 50000],
    8687: [276, "doomwood", 0],
    7691: [276, "doomwood", 0]
};

function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("archpaladin: " + name);
}

// One leg is a map, a cell and a pad; the checkpoint returns to that map when
// a save comes due, so it is named after the place the leg lives in.
function arrive(where) {
    if (!bot.checkpoint(where[0])) return false;
    if (!bot.travel(where[0])) return false;
    return bot.moveToCell(where[1], where[2]);
}

function hunt(leg) {
    if (!arrive(leg)) return false;
    if (!bot.pickDrop()) return false;
    bot.kill(leg[3], 1);
    return false;
}

function buy(leg, itemId) {
    var gold = bot.gold;
    if (leg[2] > 0 && gold != null && gold < leg[2]) {
        bot.fail("archpaladin: " + leg[2] + " gold is needed for item " + itemId);
        return false;
    }
    if (!bot.checkpoint(leg[1])) return false;
    if (!bot.travel(leg[1])) return false;
    bot.buy(leg[0], itemId, 1);
    return false;
}

// Undead Energy waits on the spellbook's chain: two purchases and three
// fights before it, then the compass, then the energy itself.
function minecrafting() {
    var value = bot.quest.value(DOOMWOOD_SLOT);
    if (value == null) return false;
    if (value >= DOOMWOOD.length) return true;
    for (var i = 0; i < DOOMWOOD.length; i++) {
        if (value >= i + 1) continue;
        phase("doomwood " + DOOMWOOD[i]);
        quest(DOOMWOOD[i]);
        return false;
    }
    return false;
}

function energy() {
    if (!minecrafting()) return false;
    hunt(HUNT[ENERGY]);
}

// The scroll is a quest of its own: one ArchMage Ink turns into five of them,
// and the ink is a merge the SpellCrafting shop only offers at rank 8.
function scroll() {
    var ink = bot.item(ARCHMAGE_INK);
    if (ink == null) return false;
    if (ink < 1) {
        phase("archmage ink");
        var spell = bot.rep("SpellCrafting");
        if (spell != null && spell.rank < INK_RANK) {
            bot.fail("archpaladin: SpellCrafting rank " + INK_RANK + " is needed for ArchMage Ink; run spellcrafting-rep");
            return false;
        }
        var shards = bot.item(SHARDS);
        if (shards == null) return false;
        if (shards < 2) {
            hunt(SKULL);
            return false;
        }
        if (!bot.checkpoint(INK_MAP)) return false;
        if (!bot.travel(INK_MAP)) return false;
        bot.buy(INK_SHOP, ARCHMAGE_INK, 1);
        return false;
    }
    phase("scroll of ethereal slumber");
    quest(SCROLL_QUEST);
    return false;
}

// The turn-in list decides the step, so no quantity is copied into the bot.
function source(itemId) {
    if (itemId == ENERGY) return energy();
    if (itemId == SCROLL) return scroll();
    if (HUNT[itemId] != null) return hunt(HUNT[itemId]);
    if (BUY[itemId] != null) return buy(BUY[itemId], itemId);
    bot.fail("archpaladin: no source for item " + itemId);
    return false;
}

// A quest the client will not put in the tracker is a dead end: thirty accepts
// is a minute of asking, and then the reason is worth saying. The count clears
// as soon as the quest lands, so a quest handed in again starts at zero.
var ACCEPT_LIMIT = 30;

function start(id) {
    if (bot.quest.active(id)) {
        bot.memory.tries = 0;
        return true;
    }
    if (bot.memory.triesId !== id) {
        bot.memory.triesId = id;
        bot.memory.tries = 0;
    }
    bot.memory.tries = bot.memory.tries + 1;
    if (bot.memory.tries > ACCEPT_LIMIT) {
        bot.fail("archpaladin: quest " + id + " would not start");
        return false;
    }
    bot.quest.accept(id);
    return false;
}

// Accept, one leg, hand in. `true` goes back only from a hand-in, so the next
// pass reads the new counts with nothing swinging.
function quest(id) {
    if (!start(id)) return false;
    if (bot.quest.ready(id)) return bot.quest.turnIn(id);

    var wants = bot.quest.wants(id);
    if (wants == null) return false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have >= wants[i].need) continue;
        source(wants[i].id);
        return false;
    }
    return false;
}

var value = bot.quest.value(CHAIN);
if (value == null) return;

// Null is "no answer yet" and also "nothing under that name", so a missing
// answer keeps the pass going instead of ending the run.
var good = bot.rep(GOOD);
if (good == null) return;
if (good.rank < GOOD_RANK) {
    bot.fail("archpaladin: Good rank " + GOOD_RANK + " is needed for the seal and the hand grenade; run good-rep first");
    return;
}

for (var i = 0; i < QUESTS.length; i++) {
    if (value >= i + 1) continue;
    phase("quest " + QUESTS[i]);
    quest(QUESTS[i]);
    return;
}

// Every quest is written. The class is free at 8 and is taken once.
var owned = bot.item(CLASS_ITEM);
if (owned == null) return;
if (owned < 1) {
    phase("the class");
    if (!bot.checkpoint(HUB)) return;
    if (!bot.travel(HUB)) return;
    if (!bot.buy(CLASS_SHOP, CLASS_ITEM, 1)) return;
}
if (!bot.equip(CLASS_ITEM)) return;
bot.finish("archpaladin: the class is in the bag");
return true;
