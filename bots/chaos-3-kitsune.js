/// name: 13 Lords of Chaos: Kitsune
/// desc: The third Lord of Chaos, the Yokai isles up to Kitsune.
/// once: true
/// timeout: 60

// The Yokai chain runs one slot from the ferry to Kitsune's lair.
var CHAIN = 25;

// The shrine takes the three ingredients the ninja drop and makes the roll;
// the quest itself only names the roll, so the ingredient ids come from the
// shrine's own item list.
var NORI = 2693;
var CUCUMBER = 2694;
var SUMESHI = 2695;
var ROLL = 2696;

// The Tsukumo-Gami all answer to one name, so the room is what tells them
// apart; each room is killed until its own counters are full.
var RECYCLE = [
    { cell: "r4", pad: "Down", items: [2662, 2667] },
    { cell: "r2", pad: "Left", items: [2663, 2665] },
    { cell: "r3", pad: "Down", items: [2666] }
];

// A quest that wants more than one monster says which room pays each item.
function spots(map, table) {
    var out = {};
    for (var id in table) {
        var row = table[id];
        out[id] = { map: map, monster: row[0], cell: row[1], pad: row[2] };
    }
    return out;
}

var HACHIKO = spots("hachiko", {
    2222: ["Ninja Nopperabo", "r2", "Left"],
    2223: ["Samurai Nopperabo", "Enter", "Spawn"]
});

var ZODIAC = spots("hachiko", {
    2225: ["Samurai Nopperabo", "Tiger", "Center"],
    2226: ["Ninja Nopperabo", "Snake", "Center"],
    2227: ["Samurai Nopperabo", "Horse", "Center"],
    2228: ["Ninja Nopperabo", "Pig", "Center"]
});

var FACES = spots("yokaigrave", {
    2700: ["Ninja Nopperabo", "r4", "Right"],
    2701: ["Samurai Nopperabo", "r4", "Right"]
});

function collect(id, table) {
    var wants = bot.quest.wants(id);
    if (wants == null) return;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;

        var spot = table[want.id];
        if (spot == null) {
            bot.fail("quest " + id + " wants item " + want.id + ", which no step gives");
            return;
        }
        if (!bot.travel(spot.map)) return;
        if (!bot.moveToCell(spot.cell, spot.pad)) return;
        bot.kill(spot.monster, want.need - want.have);
        return;
    }
}

function work(id, table) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return true;
        bot.quest.accept(id);
        return false;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return false;
    }
    collect(id, table);
    return false;
}

// Turtle Power wants a map item and seven ninja, so it is not a plain farm.
function turtle() {
    if (!bot.quest.active(380)) {
        if (bot.quest.done(380)) return true;
        bot.quest.accept(380);
        return false;
    }
    if (bot.quest.ready(380)) {
        bot.quest.turnIn(380);
        return false;
    }
    if (!bot.travel("yokaiboat")) return false;
    if (!bot.mapItem(64, 1, 44425)) return false;
    if (!bot.moveToCell("War", "Left")) return false;

    var wants = bot.quest.wants(380);
    if (wants == null) return false;
    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.id != 44426 || want.have >= want.need) continue;
        bot.kill("Kappa Ninja", want.need - want.have);
        return false;
    }
    return false;
}

// The Tsukumo-Gami share a name, so the room is the only way to pick which
// pair of quest items a kill pays.
function recycle() {
    if (!bot.quest.active(470)) {
        if (bot.quest.done(470)) return true;
        bot.quest.accept(470);
        return false;
    }
    if (bot.quest.ready(470)) {
        bot.quest.turnIn(470);
        return false;
    }

    var wants = bot.quest.wants(470);
    if (wants == null) return false;

    var counts = {};
    for (var i = 0; i < wants.length; i++) counts[wants[i].id] = wants[i];

    for (var g = 0; g < RECYCLE.length; g++) {
        var group = RECYCLE[g];
        var short = 0;
        for (var j = 0; j < group.items.length; j++) {
            var want = counts[group.items[j]];
            if (want != null && want.have < want.need) short += want.need - want.have;
        }
        if (short == 0) continue;

        if (!bot.travel("junkyard")) return false;
        if (!bot.moveToCell(group.cell, group.pad)) return false;
        bot.kill("*", short);
        return false;
    }
    return false;
}

// The shrine turns the ninja's ingredients into the roll, so the roll in the
// bag is the gate: once it is there, no more killing.
function cuisine() {
    if (!bot.quest.active(474)) {
        if (bot.quest.done(474)) return true;
        bot.quest.accept(474);
        return false;
    }
    if (bot.quest.ready(474)) {
        bot.quest.turnIn(474);
        return false;
    }

    var roll = bot.item(ROLL);
    if (roll == null) return false;
    if (roll < 1) {
        if (!bot.travel("yokairiver")) return false;
        if (!bot.moveToCell("r4", "Left")) return false;

        var nori = bot.item(NORI);
        var cucumber = bot.item(CUCUMBER);
        var sumeshi = bot.item(SUMESHI);
        if (nori == null || cucumber == null || sumeshi == null) return false;

        var short = Math.max(0, 6 - nori) + Math.max(0, 1 - cucumber) + Math.max(0, 3 - sumeshi);
        if (short > 0) {
            bot.kill("Kappa Ninja", short);
            return false;
        }
    }

    bot.mapItem(92, 1, ROLL);
    return false;
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// The ferry
if (chain < 1) return turtle();
if (chain < 2) return bot.quest.farm(381, "Kappa Ninja", "yokaiboat", "r4", "Left");
if (chain < 3) return bot.quest.farm(382, "Ryoku", "dragonkoi", "t6", "Left");

// Hachiko Hotel
if (chain < 4) return work(402, HACHIKO);
if (chain < 5) return bot.quest.farm(403, "Samurai Nopperabo", "hachiko", "Ox", "Center");
if (chain < 6) return work(405, ZODIAC);
if (chain < 7) return bot.quest.farm(406, "Dai Tengu", "hachiko", "Roof", "Left");

// Bamboo Forest
if (chain < 8) return bot.quest.gather(466, 90, "bamboo");
if (chain < 9) return bot.quest.farm(467, "Tanuki", "bamboo", "Enter", "Spawn");
if (chain < 10) return bot.quest.farm(468, "SoulTaker", "bamboo", "r5", "Right");

// Yokai Junkyard
if (chain < 11) return bot.quest.gather(469, 91, "junkyard");
if (chain < 12) return recycle();
if (chain < 13) return bot.quest.farm(471, "Onibaba", "junkyard", "r7", "Left");

// Yokai River
if (chain < 14) return bot.quest.farm(473, "Funa-yurei", "yokairiver", "Enter", "Spawn");
if (chain < 15) return cuisine();
if (chain < 16) return bot.quest.farm(476, "Nure Onna", "yokairiver", "r5", "Left");

// Yokai Graveyard
if (chain < 17) return bot.quest.farm(477, "Skello Kitty", "yokaigrave", "Enter", "Spawn");
if (chain < 18) return work(478, FACES);
if (chain < 19) return bot.quest.farm(479, "Neko Mata", "yokaigrave", "Enter2", "Center");

// The rift and Kitsune
if (chain < 20) return bot.quest.farm(481, "O-dokuro", "odokuro", "Boss", "Right");
if (chain < 21) return bot.quest.farm(484, "O-dokuro's Head", "yokaiwar", "Boss", "Left");
if (chain < 22) return bot.quest.farm(488, "Kitsune", "kitsune", "Boss", "Left");

bot.log("chaos-3-kitsune: done");
return true;
