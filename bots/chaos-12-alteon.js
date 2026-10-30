/// name: 13 Lords of Chaos: Alteon
/// desc: The twelfth Lord of Chaos, from the archives to Swordhaven falls.
/// once: true
/// timeout: 120

// One slot runs the whole line, from the archives to the falls.
var CHAIN = 131;

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
    // The archives
    19185: ["Chaos Bandit", "archives", "r12", "Left"],
    19186: ["Camouflaged Sp-eye", "archives", "r6", "Right"],
    19187: ["Camouflaged Sp-eye", "archives", "r6", "Right"],
    19190: ["Chaos Bandit", "archives", "r12", "Left"],
    19191: ["Chaos Bandit", "archives", "r12", "Left"],
    19193: ["Chaos Rat", "archives", "r14", "Left"],
    19194: ["Chaos Spider", "archives", "r15", "LeftB"],
    19195: ["Chaos Spider", "archives", "r15", "LeftB"],
    19196: ["Chaos Rat", "archives", "r14", "Left"],
    19197: ["Sludgelord", "archives", "r17", "LeftB"],
    // The armory
    19418: ["Chaorrupted Prisoner", "armory", "r2", "Left"],
    19422: ["Chaos General", "armory", "r11", "Right"],
    19536: ["Chaorrupted Prisoner", "armory", "r2", "Left"],
    19537: ["Chaorrupted Prisoner", "armory", "r2", "Left"],
    19539: ["Chaos Drifter", "armory", "r7", "Left"],
    // The ceremony
    20026: ["Chaos Invader", "ceremony", "r2", "Left"],
    20038: ["Chaos Invader", "ceremony", "r2", "Left"],
    20041: ["Chaos Invader", "ceremony", "r2", "Left"],
    20042: ["Chaos Justicar", "ceremony", "r7", "Left"],
    // The forge and the altar
    20037: ["Living Fire", "mafic", "r7", "Left"],
    20304: ["Princess Thrall", "chaosaltar", "r14", "Left"],
    // The castle roof and the falls
    20659: ["Chaos Dragon", "castleroof", "r2", "Left"],
    20661: ["Chaos Lord Alteon", "swordhavenfalls", "r10", "Left"]
});

// The map items, as each map's own script asks for them: spot, map, and the
// number of requests. Nothing here names the bag item, because the map decides
// which one a spot pays. The invitations come from three maps in one quest.
var GROUND = {
    3080: [[1937, "archives", 1]],
    3092: [[1957, "armory", 1]],
    3095: [[1956, "armory", 4]],
    3121: [[2108, "yulgar", 1], [2109, "yulgar", 1], [2110, "yulgar", 1],
           [2111, "archives", 1], [2112, "swordhaven", 1], [2113, "swordhaven", 1],
           [2114, "swordhaven", 1], [2115, "swordhaven", 1]],
    3122: [[2116, "swordhaven", 8]],
    3125: [[2118, "ceremony", 6]],
    3126: [[2119, "ceremony", 1]],
    3133: [[2127, "chaosaltar", 12]],
    3159: [[2158, "swordhavenfalls", 1]]
};

function ground(id) {
    var spots = GROUND[id];
    if (spots == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return false;
    }
    // One spot at a time, remembering how far the list got: the engine forgets
    // its counts the moment the spot changes, so a loop that starts over every
    // tick would re-send the first spot and never reach the last.
    var key = "ground" + id;
    var at = bot.memory[key] || 0;
    while (at < spots.length) {
        if (!bot.travel(spots[at][1])) return false;
        if (!bot.mapItem(spots[at][0], spots[at][2])) return false;
        bot.memory[key] = ++at;
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

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// The archives
if (chain < 1) return work(3077);
if (chain < 2) return work(3078);
if (chain < 3) return work(3079);
if (chain < 4) return work(3080);
if (chain < 5) return work(3081);
if (chain < 6) return work(3082);
if (chain < 7) return work(3083);
if (chain < 8) return work(3084);

// The armory
if (chain < 9) return work(3094);
if (chain < 10) return work(3095);
if (chain < 11) return work(3096);

// Three charms sit on the same value, one per element: the chain needs only
// one of them, and its two siblings would never move it.
if (chain < 12) return work(3089);

if (chain < 13) return work(3092);
if (chain < 14) return work(3093);

// The ceremony
if (chain < 15) return work(3120);
if (chain < 16) return work(3121);
if (chain < 17) return work(3122);
if (chain < 18) return work(3123);
if (chain < 19) return work(3124);
if (chain < 20) return work(3125);
if (chain < 21) return work(3126);
if (chain < 22) return work(3127);

// The altar, the roof and the falls
if (chain < 23) return work(3133);
if (chain < 24) return work(3134);
if (chain < 25) return work(3158);
if (chain < 26) return work(3159);
if (chain < 27) return work(3160);

bot.log("chaos-12-alteon: done");
return true;
