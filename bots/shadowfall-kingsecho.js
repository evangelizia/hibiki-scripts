/// name: Shadowfall to King's Echo
/// desc: Shadowfall Rise, the Lynaria saga, the armor merges, then King's Echo.
/// once: true
/// timeout: 0

// Shadowfall Rise into Lynaria into King's Echo in one run: the two sagas,
// the three Bocklin armor merges, then the class chain. The pass budget stays
// off; the armor pixel alone is thousands of kills, so every dead end names
// its reason instead of stalling.
//
// The run assumes a solo-capable preset for the boss legs and level 80 by the
// time the King's Echo leg starts; the level 80 quests simply will not start
// below it. Good rank 10 still belongs to the good-rep bot.

// Slot 283 walks Shadowfall Rise to Star Light Star Bright on its own.
var SHADOW = [6539,6540,6541,6542,6543,6544,6545,6546,6547,6548,6549,6550,6560,6561,6562,6563,6564,6565,6566,6567,6581,6582,6583,6584,6585,6586,6587,6588,6589,6590,6591,6592];
// Slot 585 walks Lynaria to the Thronekeeper. The repeatable merge quests
// (10240, 10253, 10266 and their Legend twins) are farmed in their own
// phases, not here.
var LYN = [10230,10231,10232,10233,10234,10235,10236,10237,10238,10239,10243,10244,10245,10246,10247,10248,10249,10250,10251,10252,10256,10257,10258,10259,10260,10261,10262,10263,10264,10265];

// The King's Echo leg, same order as the standalone chain.
var CROWN_Q = 10440;
var SWORD_Q = 10442;
var ARMOR_Q = 10441;
var BLESS_Q = 10438;
var KING_Q = 10439;
var SWORD_SLOT = 131;
var SWORD_VALUE = 28;
var CHAIN_SLOT = 620;
var QUEEN_UPDATE = 8361;
var QUEEN_SLOT = 426;
var QUEEN_VALUE = 33;

// Where each quest is accepted: the map Skua stands in for it.
var ACCEPT_MAP = {
    6539: "noxustower", 6540: "noxustower", 6541: "noxustower", 6542: "noxustower",
    6543: "noxustower", 6544: "noxustower", 6545: "noxustower", 6546: "noxustower",
    6547: "noxustower", 6548: "noxustower", 6549: "noxustower", 6550: "noxustower",
    6560: "lightguardwar", 6561: "lightguardwar", 6562: "lightguardwar", 6563: "lightguardwar",
    6564: "lightguardwar", 6565: "lightguardwar", 6566: "lightguardwar", 6567: "lightguardwar",
    6581: "lumafortress", 6582: "lumafortress", 6583: "lumafortress", 6584: "lumafortress",
    6585: "lumafortress", 6586: "lumafortress", 6587: "lumafortress", 6588: "lumafortress",
    6589: "lumafortress", 6590: "lumafortress", 6591: "lumafortress", 6592: "lumafortress",
    10230: "bocklingrove", 10231: "bocklingrove", 10232: "bocklingrove", 10233: "bocklingrove",
    10234: "bocklingrove", 10235: "bocklingrove", 10236: "bocklingrove", 10237: "bocklingrove",
    10238: "bocklingrove", 10239: "bocklingrove", 10240: "bocklingrove", 10242: "bocklingrove",
    10243: "bocklincastle", 10244: "bocklincastle", 10245: "bocklincastle", 10246: "bocklincastle",
    10247: "bocklincastle", 10248: "bocklincastle", 10249: "bocklincastle", 10250: "bocklincastle",
    10251: "bocklincastle", 10252: "bocklincastle", 10253: "bocklincastle", 10255: "bocklincastle",
    10256: "bocklinsanctum", 10257: "bocklinsanctum", 10258: "bocklinsanctum", 10259: "bocklinsanctum",
    10260: "bocklinsanctum", 10261: "bocklinsanctum", 10262: "bocklinsanctum", 10263: "bocklinsanctum",
    10264: "bocklinsanctum", 10265: "bocklinsanctum", 10266: "bocklinsanctum", 10267: "bocklinsanctum",
    8361: "queenbattle",
    10440: "terminatemple", 10442: "portal", 10441: "terminatemple",
    10438: "terminatemple", 10439: "terminatemple"
};

// item -> map, cell, pad, and the monster that pays it. Cells come from live
// room dumps; a blank pad lands on the cell default, which farms the same
// monsters. Pads are only named where Skua names them.
var HUNT = {
    45261: ["noxustower", "r2", "", "Slimeskull"],
    45262: ["noxustower", "r2", "", "Doomwood Treeant"],
    45263: ["noxustower", "r2", "", "Sanguine Souleater"],
    45264: ["noxustower", "r7", "", "Lightguard Caster"],
    45265: ["noxustower", "r7", "", "Lightguard Caster"],
    45266: ["noxustower", "r7", "", "Lightguard Caster"],
    45268: ["noxustower", "r5", "", "Lightguard Wolf"],
    45269: ["noxustower", "r6", "", "Lightguard Paladin"],
    45272: ["noxustower", "r2", "", "Slimeskull"],
    45270: ["noxustower", "r7", "", "Lightguard Caster"],
    45271: ["noxustower", "r2", "", "Doomwood Treeant"],
    45275: ["noxustower", "r15", "", "General Goldhammer"],
    45379: ["lightguardwar", "r2", "", "Citadel Crusader"],
    45380: ["lightguardwar", "r2", "", "Citadel Crusader"],
    45381: ["lightguardwar", "r2", "", "Citadel Crusader"],
    45382: ["lightguardwar", "r2", "", "Citadel Crusader"],
    45383: ["lightguardwar", "Siege", "", "Lightguard Engine"],
    45384: ["lightguardwar", "r6", "", "Scorching Flame"],
    45385: ["lightguardwar", "r2", "", "Citadel Crusader"],
    45386: ["lightguardwar", "r10", "", "Sigrid Sunshield"],
    45723: ["lumafortress", "r5", "", "Invasive Shadow"],
    45724: ["lumafortress", "r5", "", "Light Treeant"],
    45726: ["lumafortress", "r5", "", "Light Elemental"],
    45727: ["lumafortress", "r3a", "", "Hapless Skeleton"],
    45728: ["lumafortress", "r5", "", "Light Treeant"],
    45730: ["lumafortress", "r10a", "", "Lightwing"],
    45732: ["lumafortress", "r5", "", "Light Elemental"],
    45733: ["lumafortress", "Enter", "", "Living Shadow"],
    45734: ["lumafortress", "Enter", "", "Skeleton Minion"],
    45735: ["lumafortress", "r4", "Left", "Corrupted Luma"],
    45736: ["lumafortress", "r5", "", "Light Elemental"],
    93544: ["bocklingrove", "r2", "", "Wolf"],
    93546: ["bocklingrove", "r3", "", "Spider"],
    93547: ["bocklingrove", "r4", "", "Sp-Eye"],
    93550: ["bocklingrove", "r7", "", "Garde Grif"],
    93551: ["bocklingrove", "r8", "", "Undead Garde"],
    93552: ["bocklingrove", "r9", "", "Garde Wraith"],
    93556: ["bocklingrove", "r9", "", "Garde Wraith"],
    93555: ["bocklingrove", "r8", "", "Undead Garde"],
    93557: ["bocklingrove", "r10", "", "Elder Necromancer"],
    93593: ["bocklincastle", "r2", "", "Undead Garde"],
    93595: ["bocklincastle", "r3", "", "Garde Wraith"],
    93598: ["bocklincastle", "r2", "", "Undead Garde"],
    93599: ["bocklincastle", "r3", "", "Garde Wraith"],
    93600: ["bocklincastle", "r6", "", "Warped Revenant"],
    93601: ["bocklincastle", "r7", "", "Forsaken Necromancer"],
    93610: ["bocklincastle", "r9", "", "Faceless Ritualist"],
    93604: ["bocklincastle", "r6", "", "Warped Revenant"],
    93605: ["bocklincastle", "r9", "", "Faceless Ritualist"],
    93606: ["bocklincastle", "r10", "Left", "Headless Knight"],
    93672: ["bocklinsanctum", "r2", "", "Warped Revenant"],
    93673: ["bocklinsanctum", "r3", "", "Faceless Ritualist"],
    93676: ["bocklinsanctum", "r3", "", "Faceless Ritualist"],
    93675: ["bocklinsanctum", "r2", "", "Warped Revenant"],
    93678: ["bocklinsanctum", "r5", "", "Tarnished Scion"],
    93679: ["bocklinsanctum", "r7", "", "Ghostly Servant"],
    93681: ["bocklinsanctum", "r9", "", "Headless Rider"],
    93684: ["bocklinsanctum", "r7", "", "Ghostly Servant"],
    93685: ["bocklinsanctum", "r9", "", "Headless Rider"],
    93686: ["bocklinsanctum", "r10", "", "Thronekeeper"],
    93687: ["bocklinsanctum", "r10", "", "Thronekeeper"],
    93558: ["bocklingrove", "r8", "", "Undead Garde"],
    93559: ["bocklingrove", "r9", "", "Garde Wraith"],
    93560: ["bocklingrove", "r10", "", "Elder Necromancer"],
    93607: ["bocklincastle", "r6", "", "Warped Revenant"],
    93608: ["bocklincastle", "r9", "", "Faceless Ritualist"],
    // Golden Anjou has no documented farmer; the castle boss in the quest's
    // own cell is the only candidate, so it is hunted there.
    93609: ["bocklincastle", "r10", "Left", "Headless Knight"],
    93763: ["alteonfight", "r2", "", "King Alteon"],
    93645: ["darkplane", "r8", "", "Victorious"],
    44209: ["ebondungeon", "r7", "", "Dethrix"],
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

// item -> map and the pickup spot. One spot per pass; multi-spot quests list
// every spot and the pass takes the first short one.
var MAPITEM = {
    45267: ["noxustower", 6018],
    45273: ["noxustower", 6019],
    45274: ["noxustower", 6020],
    45722: ["lumafortress", 6098],
    45725: ["lumafortress", 6099],
    45729: ["lumafortress", 6100],
    45731: ["lumafortress", 6101],
    93545: ["bocklingrove", 14429],
    93548: ["bocklingrove", 14430],
    93549: ["bocklingrove", 14431],
    93553: ["bocklingrove", 14432],
    93554: ["bocklingrove", 14433],
    93594: ["bocklincastle", 14446],
    93596: ["bocklincastle", 14451],
    93597: ["bocklincastle", 14447],
    93602: ["bocklincastle", 14448],
    93603: ["bocklincastle", 14449],
    93611: ["bocklincastle", 14450],
    93674: ["bocklinsanctum", 14478],
    93677: ["bocklinsanctum", 14479],
    93680: ["bocklinsanctum", 14480],
    93682: ["bocklinsanctum", 14481],
    93683: ["bocklinsanctum", 14482]
};

// The Defiler pays Graveclaw for members and the Destructive Defiler for
// everyone else, and the engine cannot ask which the character is. Camp one
// and only move after six full passes pay nothing; progress resets it.
var DEFILE_ITEM = 96126;
var DEFILE = [
    ["shattersword", "r11", "Left", "Graveclaw the Defiler"],
    ["infernalarena", "r16", "", "Destructive Defiler"]
];

// Repeatable merge quests come in member and Legend twins; the engine cannot
// tell them apart, so the run tries the first and keeps the one that starts.
var TWINS = { 10240: 10242, 10253: 10255, 10266: 10267 };

// Three merges, each bought where it lives once its ingredients are in the
// bag. The voucher is stocked by all three merge shops at 100k a copy.
var LYNARIA_ARMOR = 93590;
var VALEN_ARMOR = 93591;
var LIBERATION = 93592;
var VOUCHER = 62749;
var MACE = 96387;
var CLASS_ITEM = 95742;
var TARA_SPOT = 15048;
var TARA_ITEM = 96120;

function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("mega: " + name);
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

// Plain questless farm until the bag holds count of item.
function farmItem(item, count) {
    var have = bot.item(item);
    if (have == null) return false;
    if (have >= count) return true;
    if (HUNT[item] == null) {
        bot.fail("mega: no source for item " + item);
        return false;
    }
    hunt(HUNT[item]);
    return false;
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
        bot.log("mega: defiler dry, trying " + DEFILE[(idx + 1) % DEFILE.length][0]);
    }
    return false;
}

function source(itemId, want) {
    if (itemId === DEFILE_ITEM) return defiler(want);
    if (HUNT[itemId] != null) { hunt(HUNT[itemId]); return false; }
    if (MAPITEM[itemId] != null) {
        var spot = MAPITEM[itemId];
        if (!bot.checkpoint(spot[0])) return false;
        if (!bot.travel(spot[0])) return false;
        bot.mapItem(spot[1], want.need, itemId);
        return false;
    }
    bot.fail("mega: no source for item " + itemId);
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
        bot.fail("mega: quest " + id + " would not start");
        return false;
    }
    bot.quest.accept(id);
    return false;
}

// One twin starts; the other is only tried when the first will not.
function startEither(a, b) {
    var pick = bot.memory["twin" + a];
    if (pick == null) pick = a;
    if (bot.quest.active(pick)) {
        bot.memory.tries = 0;
        return pick;
    }
    var map = ACCEPT_MAP[pick];
    if (map != null) {
        if (!bot.checkpoint(map)) return 0;
        if (!bot.travel(map)) return 0;
    }
    if (bot.memory.triesId !== pick) {
        bot.memory.triesId = pick;
        bot.memory.tries = 0;
    }
    bot.memory.tries = bot.memory.tries + 1;
    if (bot.memory.tries > 12) {
        bot.memory.tries = 0;
        pick = (pick === a) ? b : a;
        bot.memory["twin" + a] = pick;
        bot.log("mega: quest " + a + " twin, trying " + pick);
        return 0;
    }
    bot.quest.accept(pick);
    return 0;
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

// A repeatable merge quest to a target count of one item. Turn-ins consume
// the wants, so the loop ends when the bag holds target, not when the quest
// is done. Twin quests (member and Legend) try the first and keep whichever
// starts.
function repeatTwin(a, item, target) {
    var have = bot.item(item);
    if (have == null) return false;
    if (have >= target) return true;
    var id = startEither(a, TWINS[a]);
    if (!id) return false;
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return false;
    }
    var wants = bot.quest.wants(id);
    if (wants == null) return false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have >= wants[i].need) continue;
        source(wants[i].id, wants[i]);
        return false;
    }
    return false;
}

// One merge purchase: the engine sends the merge quantity itself, so this is
// the same call as a gold shop once the ingredients are held.
function merge(map, shop, item) {
    if (!bot.checkpoint(map)) return false;
    if (!bot.travel(map)) return false;
    return bot.buy(shop, item, 1);
}

function vouchers(count) {
    var have = bot.item(VOUCHER);
    if (have == null) return false;
    if (have >= count) return true;
    var gold = bot.gold;
    if (gold == null) return false;
    var missing = count - have;
    if (gold < missing * 100000) {
        bot.fail("mega: " + (missing * 100000) + " gold is needed for " + missing + " Gold Voucher 100k");
        return false;
    }
    if (!bot.checkpoint("bocklinsanctum")) return false;
    if (!bot.travel("bocklinsanctum")) return false;
    bot.buy(2578, VOUCHER, count);
    return false;
}

function swordhaven() {
    var SWORDS = [3065, 3066, 3067, 3070, 3085, 3086, 3087];
    for (var i = 0; i < SWORDS.length; i++) {
        if (!bot.quest.active(SWORDS[i])) {
            phase("swordhaven quest " + SWORDS[i]);
            if (!bot.checkpoint("castle")) return false;
            if (!bot.travel("castle")) return false;
            bot.quest.accept(SWORDS[i]);
            return false;
        }
    }
    for (var j = 0; j < SWORDS.length; j++) {
        if (bot.quest.ready(SWORDS[j])) {
            phase("swordhaven turn-in " + SWORDS[j]);
            bot.quest.turnIn(SWORDS[j]);
            return false;
        }
    }
    for (var k = 0; k < SWORDS.length; k++) {
        var wants = bot.quest.wants(SWORDS[k]);
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

var good = bot.rep("Good");
if (good == null) return;
if (good.rank < 10) {
    bot.fail("mega: Good rank 10 is needed first; run good-rep");
    return;
}

var sword = bot.rep("Swordhaven");
if (sword == null) return;
if (sword.rank < 10) {
    phase("swordhaven rank " + sword.rank);
    swordhaven();
    return;
}

// Shadowfall Rise, slot 283. The first unfinished quest runs. A definition
// that has not loaded yet answers null, and the pass waits for it: working
// quest 1 on every rejoin would re-accept a finished quest and fail the run.
var qi;
for (qi = 0; qi < SHADOW.length; qi++) {
    var sd = bot.quest.done(SHADOW[qi]);
    if (sd == null) return;
    if (!sd) break;
}
if (qi < SHADOW.length) {
    phase("shadowfall " + SHADOW[qi]);
    quest(SHADOW[qi]);
    return;
}

// Lynaria, slot 585, same shape: null waits, false runs, true skips.
var li;
for (li = 0; li < LYN.length; li++) {
    var ld = bot.quest.done(LYN[li]);
    if (ld == null) return;
    if (!ld) break;
}
if (li < LYN.length) {
    phase("lynaria " + LYN[li]);
    quest(LYN[li]);
    return;
}

// The armor pixel, gated on what is already owned so a buy never refarms
// its own ingredients: each merge consumes its pile, and the next pass must
// see the armor, not an empty bag. Shards feed the Grove batch first, then
// the Treasury pile; ornaments feed Valen first, then the Treasury. Once
// Liberation is in the bag the whole block is behind us.
var liberation = bot.item(LIBERATION);
if (liberation == null) return;
if (liberation < 1) {
    var lyn = bot.item(LYNARIA_ARMOR);
    if (lyn == null) return;
    var valen = bot.item(VALEN_ARMOR);
    if (valen == null) return;
    if (lyn < 1) {
        phase("gem shards for lynaria");
        if (!repeatTwin(10240, 93612, 80)) return;
        phase("victorious scale");
        if (!farmItem(93645, 1)) return;
    }
    var vneed = 20 + (lyn < 1 ? 8 : 0) + (valen < 1 ? 8 : 0);
    phase("gold voucher 100k");
    if (!vouchers(vneed)) return;
    if (lyn < 1) {
        phase("champion lynaria armor");
        if (!merge("bocklingrove", 2576, LYNARIA_ARMOR)) return;
    }
    if (valen < 1) {
        phase("bocklin ornaments for valen");
        if (!repeatTwin(10253, 92886, 60)) return;
        phase("monster blood");
        if (!farmItem(44209, 1)) return;
        phase("valen's knightly armor");
        if (!merge("bocklincastle", 2577, VALEN_ARMOR)) return;
    }

    phase("gem shards for treasury");
    if (!repeatTwin(10240, 93612, 80)) return;

    phase("bocklin ornaments for treasury");
    if (!repeatTwin(10253, 92886, 60)) return;

    phase("thronekeeper runes");
    if (!repeatTwin(10266, 92791, 100)) return;

    phase("king alteon fragments");
    if (!farmItem(93763, 20)) return;

    phase("alden's liberation armor");
    if (!merge("bocklinsanctum", 2578, LIBERATION)) return;
}

// The King's Echo leg. The armor is already in the bag from the merges.
var mace = bot.item(MACE);
if (mace == null) return;
if (mace < 1) {
    phase("alden's mace");
    if (!bot.checkpoint("castle")) return;
    if (!bot.travel("castle")) return;
    if (!bot.buy(2631, MACE, 1)) return;
}

var qv = bot.quest.value(QUEEN_SLOT);
if (qv == null) return;
if (qv < QUEEN_VALUE) {
    phase("the queen of monsters");
    quest(QUEEN_UPDATE);
    return;
}

var crown = bot.item(95745);
if (crown == null) return;
if (crown < 1) {
    phase("purify the crown");
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
var blade = bot.item(95760);
if (blade == null) return;
if (blade < 1) {
    phase("the path of the king");
    quest(SWORD_Q);
    return;
}

var plate = bot.item(95744);
if (plate == null) return;
if (plate < 1) {
    if (!liberation) {
        bot.fail("mega: Alden's Liberation Armor is missing; the merge leg did not finish it");
        return;
    }
    phase("the king's armor");
    quest(ARMOR_Q);
    return;
}

var blessed = bot.quest.done(BLESS_Q);
if (blessed == null) return;
if (!blessed) {
    phase("familial blessing");
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

var echo = bot.quest.done(KING_Q);
if (echo == null) return;
if (!echo) {
    phase("echo of the king");
    quest(KING_Q);
    return;
}

if (!bot.checkpoint("terminatemple")) return;
if (!bot.travel("terminatemple")) return;
var gem50 = bot.item(61043);
if (gem50 == null) return;
if (gem50 < 100) {
    phase("the class vouchers");
    var gold = bot.gold;
    if (gold == null) return;
    if (gold < (100 - gem50) * 500000) {
        bot.fail("mega: " + ((100 - gem50) * 500000) + " gold is needed for the 500k vouchers");
        return;
    }
    if (!bot.checkpoint("alchemyacademy")) return;
    if (!bot.travel("alchemyacademy")) return;
    bot.buy(2036, 61043, 100);
    return;
}
phase("the class");
if (!bot.buy(2630, CLASS_ITEM, 1)) return;
if (!bot.equip(CLASS_ITEM)) return;
bot.finish("mega: King's Echo is in the bag");
return true;
