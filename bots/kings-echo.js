/// name: King's Echo
/// desc: The King's Echo class chain, from the reps to the class item.
/// once: true
/// timeout: 0

// King's Echo (refs Scripts/Other/Classes/KingsEcho.cs) is a long chain and
// the pass budget stays off: thousands of kills across three sub-quests, so
// every dead end names its reason instead of stalling.
//
// The script assumes what it cannot do itself: level 80, the 13 Lords of
// Chaos clear (run chaos-prologue through chaos-13-hero), and Alden's
// Liberation Armor, which is a Bocklin Treasury merge the engine cannot buy.
// Good rank 10 is the same story - the good-rep bot owns that farm - while
// Swordhaven rank 10 is farmed inline in castle, since no rep bot covers it.
// Everything else is one phase per quest with the chain slots as resume.

// Good is a prerequisite, not a step: the seal and the grenade both want
// rank 10, and good-rep already farms the Burning Loyalists.
var GOOD = "Good";
var GOOD_RANK = 10;

// Swordhaven is farmed here: seven castle quests, all accepted at once, and
// whichever fills first is handed in. r6 holds the spider, the fiend and the
// gargoyle; r7 holds the wraith.
var SWORD = "Swordhaven";
var SWORD_RANK = 10;
var SWORDS = [3065, 3066, 3067, 3070, 3085, 3086, 3087];

// The Queen of Monsters quest was retired, so it cannot be accepted. Her slot
// is written through the client's own update quest request instead, and the
// value is waited on below.
var QUEEN_SLOT = 426;
var QUEEN_VALUE = 33;

var CROWN_Q = 10440;
var SWORD_Q = 10442;
var ARMOR_Q = 10441;
var BLESS_Q = 10438;
var KING_Q = 10439;
var SWORD_SLOT = 131;
var SWORD_VALUE = 28;
var CHAIN_SLOT = 620;

// The Path of the King is only offered in the portal; the rest of the chain
// is accepted in Termina Temple.
var ACCEPT_MAP = {};
ACCEPT_MAP[CROWN_Q] = "terminatemple";
ACCEPT_MAP[SWORD_Q] = "portal";
ACCEPT_MAP[ARMOR_Q] = "terminatemple";
ACCEPT_MAP[BLESS_Q] = "terminatemple";
ACCEPT_MAP[KING_Q] = "terminatemple";

// Alden's Liberation Armor is a merge, so the run stops when it is missing
// instead of pretending a shop sells it.
var LIBERATION = 93592;
// The three sub-quest rewards plus the bought mace unlock Echo of the King.
var MACE = 96387;
var CLASS_ITEM = 95742;

// item -> map, cell, pad, and the monster that pays it. Pads come from Skua
// where it names them; a blank pad lands on the cell default, which farms
// the same monsters. The Defiler has its own two-cell rotation below.
var HUNT = {
    64736: ["queenbattle", "r12", "", "Queen of Monsters"],
    96122: ["queenbattle", "r12", "", "Queen of Monsters"],
    96121: ["dreadhaven", "r12", "", "Slugwrath"],
    74259: ["ultradrakath", "r1", "Left", "Champion of Chaos"],
    96129: ["chaoswar", "r9", "Left", "*"],
    96128: ["falcontower", "Seppy", "", "Sepulchure"],
    96130: ["naoisegrave", "r10", "", "Volgritian"],
    96127: ["ebondungeon", "r7", "", "Dethrix"],
    94980: ["thelimacity", "r5", "Center", "*"],
    96124: ["liatarahill", "r9", "Left", "*"],
    96123: ["atlaskingdom", "r2", "Left", "*"],
    96125: ["camlan", "r9", "Left", "*"],
    19062: ["castle", "r6", "", "Dungeon Fiend"],
    19063: ["castle", "r6", "", "Dungeon Fiend"],
    19071: ["castle", "r6", "", "Dungeon Fiend"],
    19064: ["castle", "r6", "", "Castle Spider"],
    19074: ["castle", "r6", "", "Castle Spider"],
    19070: ["castle", "r6", "", "Castle Spider"],
    19234: ["castle", "r6", "", "Gargoyle"],
    19073: ["castle", "r6", "", "Gargoyle"],
    19065: ["castle", "r7", "", "Castle Wraith"],
    19254: ["castle", "r7", "", "Castle Wraith"],
    19072: ["castle", "r7", "", "Castle Wraith"]
};

// The Defiler pays Graveclaw for members and the Destructive Defiler for
// everyone else, and the engine cannot ask which the character is. Camp one
// and only move after six full passes pay nothing; progress resets it.
var DEFILE_ITEM = 96126;
var DEFILE = [
    ["shattersword", "r11", "Left", "Graveclaw the Defiler"],
    ["infernalarena", "r16", "", "Destructive Defiler"]
];

// item -> shop, the map it loads in, and the gold one copy costs. A zero
// price skips the gold check; the voucher is 500k a copy, a hundred copies.
var BUY = {};
BUY[61043] = [2036, "alchemyacademy", 500000];
BUY[96387] = [2631, "castle", 0];
BUY[95742] = [2630, "terminatemple", 0];

// Talk to Tara is a map pickup in Termina Temple, not a drop.
var TARA_SPOT = 15048;
var TARA_ITEM = 96120;

function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("kings-echo: " + name);
}

function arrive(where) {
    if (!bot.checkpoint(where[0])) return false;
    if (!bot.travel(where[0])) return false;
    return bot.moveToCell(where[1], where[2]);
}

function hunt(leg) {
    if (!arrive(leg)) return false;
    if (!bot.kill(leg[3], 1)) return false;
    if (!bot.pickDrop()) return false;
    if (leg[3] === "*") bot.aggroRoom();
    return true;
}

function buy(leg, itemId, count) {
    var want = Math.max(1, count || 1);
    if (leg[2] > 0) {
        var gold = bot.gold;
        if (gold == null) return false;
        var have = bot.item(itemId);
        if (have == null) return false;
        var missing = want - have;
        if (missing > 0 && gold < missing * leg[2]) {
            bot.fail("kings-echo: item " + itemId + " needs about " + (missing * leg[2]) + " gold in the bag");
            return false;
        }
    }
    if (!bot.checkpoint(leg[1])) return false;
    if (!bot.travel(leg[1])) return false;
    return bot.buy(leg[0], itemId, want);
}

function defiler(want) {
    var idx = bot.memory.defile || 0;
    var leg = DEFILE[idx % DEFILE.length];
    if (!hunt(leg)) return false;
    if (bot.memory.defhave == null) { bot.memory.defhave = want.have; return false; }
    if (want.have !== bot.memory.defhave) {
        bot.memory.defhave = want.have;
        bot.memory.defdry = 0;
        return false;
    }
    var dry = (bot.memory.defdry || 0) + 1;
    bot.memory.defdry = dry;
    if (dry >= 6) {
        bot.memory.defdry = 0;
        bot.memory.defile = idx + 1;
        bot.log("kings-echo: defiler dry, trying " + DEFILE[(idx + 1) % DEFILE.length][0]);
    }
    return false;
}

function source(itemId, want) {
    if (itemId === DEFILE_ITEM) return defiler(want);
    if (HUNT[itemId] != null) { hunt(HUNT[itemId]); return false; }
    if (BUY[itemId] != null) { buy(BUY[itemId], itemId, want.need); return false; }
    bot.fail("kings-echo: no source for item " + itemId);
    return false;
}

var ACCEPT_LIMIT = 30;

function start(id) {
    if (bot.quest.active(id)) {
        bot.memory.tries = 0;
        return true;
    }
    var map = ACCEPT_MAP[id];
    if (map != null) {
        if (!bot.checkpoint(map)) return false;
        if (!bot.travel(map)) return false;
    }
    if (bot.memory.triesId !== id) {
        bot.memory.triesId = id;
        bot.memory.tries = 0;
    }
    bot.memory.tries = bot.memory.tries + 1;
    if (bot.memory.tries > ACCEPT_LIMIT) {
        bot.fail("kings-echo: quest " + id + " would not start");
        return false;
    }
    bot.quest.accept(id);
    return false;
}

function quest(id) {
    if (!start(id)) return false;
    if (bot.quest.ready(id)) return bot.quest.turnIn(id);
    var wants = bot.quest.wants(id);
    if (wants == null) return false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have >= wants[i].need) continue;
        source(wants[i].id, wants[i]);
        return false;
    }
    return false;
}

// Swordhaven rank 10, seven quests at once. Every pass hands in whatever is
// ready and farms the first shortfall across the whole set.
function swordhaven() {
    for (var i = 0; i < SWORDS.length; i++) {
        if (!bot.quest.active(SWORDS[i])) {
            phase("swordhaven quest " + SWORDS[i]);
            if (!bot.checkpoint("castle")) return false;
            if (!bot.travel("castle")) return false;
            bot.quest.accept(SWORDS[i]);
            return false;
        }
    }
    var ids = SWORDS.slice();
    for (var j = 0; j < ids.length; j++) {
        if (bot.quest.ready(ids[j])) {
            phase("swordhaven turn-in " + ids[j]);
            bot.quest.turnIn(ids[j]);
            return false;
        }
    }
    var wants = null;
    for (var k = 0; k < ids.length; k++) {
        wants = bot.quest.wants(ids[k]);
        if (wants == null) return false;
        for (var m = 0; m < wants.length; m++) {
            if (wants[m].have >= wants[m].need) continue;
            phase("swordhaven " + wants[m].id);
            source(wants[m].id, wants[m]);
            return false;
        }
    }
    return false;
}

var good = bot.rep(GOOD);
if (good == null) return;
if (good.rank < GOOD_RANK) {
    bot.fail("kings-echo: Good rank " + GOOD_RANK + " is needed first; run good-rep");
    return;
}

var sword = bot.rep(SWORD);
if (sword == null) return;
if (sword.rank < SWORD_RANK) {
    phase("swordhaven rank " + sword.rank);
    swordhaven();
    return;
}

var armor = bot.item(LIBERATION);
if (armor == null) return;
if (armor < 1) {
    bot.fail("kings-echo: Alden's Liberation Armor is needed first; take it from the Bocklin Treasury merge");
    return;
}

var mace = bot.item(MACE);
if (mace == null) return;
if (mace < 1) {
    phase("alden's mace");
    buy(BUY[MACE], MACE, 1);
    return;
}

var qv = bot.quest.value(QUEEN_SLOT);
if (qv == null) return;
if (qv < QUEEN_VALUE) {
    phase("the queen of monsters");
    var queenTries = (bot.memory.queenTries || 0) + 1;
    bot.memory.queenTries = queenTries;
    if (queenTries > 8) {
        bot.fail("kings-echo: quest slot " + QUEEN_SLOT + " will not take " + QUEEN_VALUE);
        return;
    }
    bot.quest.set(QUEEN_SLOT, QUEEN_VALUE);
    return;
}

phase("purify the crown");
var crown = bot.item(95745);
if (crown == null) return;
if (crown < 1) {
    quest(CROWN_Q);
    return;
}

var sv = bot.quest.value(SWORD_SLOT);
if (sv == null) return;
if (sv < SWORD_VALUE) {
    phase("the path of the king");
    quest(SWORD_Q);
    return;
}

phase("the king's armor");
var plate = bot.item(95744);
if (plate == null) return;
if (plate < 1) {
    quest(ARMOR_Q);
    return;
}

// The three rewards plus the mace unlock Echo of the King; name whichever
// is missing instead of letting the accept fail mute.
var blade = bot.item(95760);
if (blade == null || mace == null || crown == null || plate == null) return;
if (blade < 1) {
    bot.fail("kings-echo: Royal Dragon Sword is missing; redo The Path of the King");
    return;
}
if (crown < 1) {
    bot.fail("kings-echo: King Alteon's Crown is missing; redo Purify The Crown");
    return;
}
if (plate < 1) {
    bot.fail("kings-echo: Alteon's Reforged Armor is missing; redo The King's Armor");
    return;
}

phase("familial blessing");
var blessed = bot.quest.done(BLESS_Q);
if (blessed == null) return;
if (!blessed) {
    if (!start(BLESS_Q)) return;
    if (bot.quest.ready(BLESS_Q)) {
        bot.quest.turnIn(BLESS_Q);
        return;
    }
    if (!bot.checkpoint("terminatemple")) return;
    if (!bot.travel("terminatemple")) return;
    bot.mapItem(TARA_SPOT, 1, TARA_ITEM);
    return;
}

phase("echo of the king");
var echo = bot.quest.done(KING_Q);
if (echo == null) return;
if (!echo) {
    quest(KING_Q);
    return;
}

phase("the class");
if (!bot.checkpoint("terminatemple")) return;
if (!bot.travel("terminatemple")) return;
if (!bot.buy(2630, CLASS_ITEM, 1)) return;
if (!bot.equip(CLASS_ITEM)) return;
bot.finish("kings-echo: King's Echo is in the bag");
return true;
