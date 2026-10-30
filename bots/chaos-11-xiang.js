/// name: 13 Lords of Chaos: Xiang
/// desc: The eleventh Lord of Chaos, from BattleOff to the mirror portal.
/// once: true
/// timeout: 120

// One slot runs the whole line, from Warlic's list to Chaos Lord Xiang.
var CHAIN = 122;

// The three items the warding quest wants, each paid by its own repeatable
// quest. Those three share the chain's last value, so their progress is the
// bag, not the slot.
var PRISM = 20890;
var SAMPLE = 20891;
var FEATHER = 20892;

// The harpy's shriek is what the ward answers. Drakath sells it in the portal.
var SHOP = 774;
var WARD = 20771;

// Which monster pays each item a quest asks for.
function spots(table) {
    var out = {};
    for (var id in table) {
        var row = table[id];
        out[id] = { monster: row[0], map: row[1], cell: row[2], pad: row[3] };
    }
    return out;
}

var FIGHT = spots({
    // BattleOff
    17377: ["Evil Moglin", "battleoff", "r7", "Right"],
    17378: ["Evil Moglin", "battleoff", "r7", "Right"],
    // Brightfall
    17379: ["Undead Minion", "brightfall", "r4", "Left"],
    17380: ["Undead Mage", "brightfall", "r1", "Down"],
    17383: ["Painadin Overlord", "brightfall", "r3", "Left"],
    // The overworld
    17459: ["Undead Minion", "overworld", "r5", "Up"],
    17460: ["Undead Minion", "overworld", "r5", "Up"],
    17461: ["Undead Minion", "overworld", "r5", "Up"],
    17462: ["Undead Mage", "overworld", "r2", "Up"],
    17464: ["Undead Bruiser", "overworld", "r3", "Right"],
    17465: ["Undead Bruiser", "overworld", "r3", "Right"],
    17466: ["Undead Minion", "overworld", "r5", "Up"],
    17468: ["Undead Minion", "overworld", "r5", "Up"],
    17469: ["Undead Minion", "overworld", "r5", "Up"],
    17470: ["Undead Minion", "overworld", "r5", "Up"],
    17472: ["Undead Artix", "overworld", "boss1", "Left"],
    // The red death swamp
    20800: ["Fire Leech", "reddeath", "r4", "Left"],
    20801: ["RedDeath Moglin", "reddeath", "r2", "Left"],
    20805: ["Fire Leech", "reddeath", "r4", "Left"],
    20806: ["Grim Widow", "reddeath", "r6", "Left"],
    20807: ["Swamp Wraith", "reddeath", "r10", "Left"],
    20808: ["Swamp Wraith", "reddeath", "r10", "Left"],
    // The three warding errands
    20887: ["Shard Spinner", "earthstorm", "r8", "Left"],
    20888: ["Chaotic Horcboar", "bloodtuskwar", "r4", "Down"],
    20889: ["Chaos Tigriff", "bloodtuskwar", "r5", "Down"],
    // The mirror portal
    20893: ["Chaos Harpy", "mirrorportal", "r3", "Left"],
    20894: ["Chaos Lord Xiang", "mirrorportal", "r4", "Right"]
});

// The map items, as each map's own script asks for them: spot, map, and the
// number of requests. Nothing here names the bag item, because the map decides
// which one a spot pays.
var GROUND = {
    2909: [[1779, "battleoff", 1]],
    2910: [[1780, "battleoff", 8]],
    2915: [[1781, "brightfall", 6]],
    2916: [[1782, "brightfall", 8]],
    2923: [[1800, "overworld", 6]],
    2927: [[1801, "overworld", 8]],
    2931: [[1802, "overworld", 10]],
    3167: [[2178, "reddeath", 1], [2179, "reddeath", 1]],
    3168: [[2180, "reddeath", 1]],
    3183: [[2203, "battleontown", 1]]
};

function held(id) {
    var count = bot.item(id);
    return count == null ? 0 : count;
}

function ground(id) {
    var spots = GROUND[id];
    if (spots == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return false;
    }
    var key = "ground" + id;
    if (!bot.memory[key]) {
        for (var i = 0; i < spots.length; i++) {
            if (!bot.travel(spots[i][1])) return false;
            if (!bot.mapItem(spots[i][0], spots[i][2])) return false;
        }
        bot.memory[key] = true;
        return false;
    }
    // The requests went out; the slot is the receipt. A spot that pays nothing
    // leaves this waiting, so it is counted instead.
    var tries = (bot.memory[key + "tries"] || 0) + 1;
    bot.memory[key + "tries"] = tries;
    if (tries > 200) {
        bot.fail("quest " + id + " took nothing from " + spots[0][1]);
    }
}

function work(id) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return true;
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return;
    }

    var wants = bot.quest.wants(id);
    if (wants == null) return;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;

        var spot = FIGHT[want.id];
        if (spot == null) continue;
        if (!bot.travel(spot.map)) return;
        if (!bot.moveToCell(spot.cell, spot.pad)) return;
        bot.kill(spot.monster, want.need - want.have);
        return;
    }

    ground(id);
}

// The errands behind the ward: each hands its item over on the turn-in, and
// the turn-in only offers it, so the bag is what says the errand is over.
function shard(id, reward) {
    if (held(reward) > 0) return true;
    if (!bot.pickDrop()) return false;

    if (!bot.quest.active(id)) {
        // The errand shares the chain's own value, so the slot cannot say
        // whether it is done; the bag does, and that is the check above.
        var rounds = (bot.memory["shard" + id] || 0) + 1;
        bot.memory["shard" + id] = rounds;
        if (rounds > 40) {
            bot.fail("quest " + id + " never paid item " + reward);
            return false;
        }
        bot.quest.accept(id);
        return false;
    }

    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return false;
    }

    var wants = bot.quest.wants(id);
    if (wants == null) return false;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;

        var spot = FIGHT[want.id];
        if (spot == null) continue;
        if (!bot.travel(spot.map)) return false;
        if (!bot.moveToCell(spot.cell, spot.pad)) return false;
        bot.kill(spot.monster, want.need - want.have);
        return false;
    }
    return false;
}

// Warlic's list is handed to Dage: the quest carries its own "Meet with Dage"
// the moment it starts, and the overworld turns it in once it sees that.
function talk(id, map) {
    if (!bot.travel(map)) return;

    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return true;
        bot.quest.accept(id);
        return;
    }

    var tries = (bot.memory["talk" + id] || 0) + 1;
    bot.memory["talk" + id] = tries;
    if (tries > 200) {
        bot.fail("quest " + id + " would not hand in");
        return;
    }
    bot.quest.turnIn(id);
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// BattleOff and Brightfall
if (chain < 1) return work(2909);
if (chain < 2) return work(2910);
if (chain < 3) return work(2911);
if (chain < 4) return work(2912);
if (chain < 5) return work(2913);
if (chain < 6) return work(2914);
if (chain < 7) return work(2915);
if (chain < 8) return work(2916);
if (chain < 9) return work(2917);

if (chain < 10) return talk(2918, "overworld");

// The overworld
if (chain < 11) return work(2919);
if (chain < 12) return work(2920);
if (chain < 13) return work(2921);
if (chain < 14) return work(2922);
if (chain < 15) return work(2923);
if (chain < 16) return work(2924);
if (chain < 17) return work(2925);
if (chain < 18) return work(2926);
if (chain < 19) return work(2927);
if (chain < 20) return work(2928);
if (chain < 21) return work(2929);
if (chain < 22) return work(2930);
if (chain < 23) return work(2931);
if (chain < 24) return work(2932);

// The red death swamp
if (chain < 25) return work(3166);
if (chain < 26) return work(3167);
if (chain < 27) return work(3168);
if (chain < 28) return work(3169);
if (chain < 29) return work(3170);
if (chain < 30) return work(3171);
if (chain < 31) return work(3172);

// Battleontown
if (chain < 32) return work(3183);

// The ward wants three things, and only the three errands make them.
if (chain < 33) {
    if (!shard(3184, PRISM)) return;
    if (!shard(3185, SAMPLE)) return;
    if (!shard(3186, FEATHER)) return;
    return work(3187);
}

// The mirror portal
if (chain < 34) {
    if (held(WARD) < 1) {
        if (!bot.travel("mirrorportal")) return;
        if (!bot.buy(SHOP, WARD, 1)) return;
    }
    if (!bot.equip(WARD)) return;
    return work(3188);
}

if (chain < 35) return work(3189);

bot.log("chaos-11-xiang: done");
return true;
