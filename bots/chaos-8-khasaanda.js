/// name: 13 Lords of Chaos: Khasaanda
/// desc: The eighth Lord of Chaos, the Bloodtusk war to Khasaanda.
/// once: true
/// timeout: 120

// The Bloodtusk line runs one slot from the Crossroads to the dream nexus.
var CHAIN = 52;

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
    // Crossroads and Bloodtusk
    8917: ["Trollola Plant", "bloodtusk", "r4", "Center"],
    8918: ["Lemurphant", "crossroads", "r2", "Down"],
    8919: ["Koalion", "crossroads", "r6", "Left"],
    8921: ["Chinchilizard", "crossroads", "r6", "Right"],
    8922: ["Lemurphant", "crossroads", "r2", "Down"],
    8924: ["Lemurphant", "crossroads", "r2", "Down"],
    8925: ["Trollola Plant", "bloodtusk", "r4", "Center"],
    8928: ["Koalion", "crossroads", "r6", "Left"],
    8933: ["Rock", "bloodtusk", "r8", "Center"],
    8934: ["Koalion", "crossroads", "r6", "Left"],
    8935: ["Lemurphant", "crossroads", "r2", "Down"],
    8937: ["Crystal-Rock", "bloodtusk", "r8", "Center"],
    8938: ["Chinchilizard", "crossroads", "r6", "Right"],
    // The ravine temple
    9144: ["Temple Guardian", "ravinetemple", "r6", "Up"],
    9146: ["Temple Guardian", "ravinetemple", "r6", "Up"],
    9148: ["Temple Guardian", "ravinetemple", "r6", "Up"],
    // The alliance camp
    9784: ["Good Soldier", "alliance", "r2", "Right"],
    9785: ["Evil Soldier", "alliance", "r2", "Left"],
    9788: ["Chaorrupted Evil Soldier", "alliance", "r10", "Down"],
    9789: ["General Cynari", "alliance", "r9", "Up"],
    9790: ["General Tibias", "alliance", "r4", "Left"],
    // The ancient temple
    9948: ["Chaotic Vulture", "ancienttemple", "r3", "Right"],
    9950: ["Chaotic Vulture", "ancienttemple", "r3", "Right"],
    9951: ["Chaos Troll Spirit", "ancienttemple", "r5", "Right"],
    9952: ["Serpentress", "ancienttemple", "r7", "Left"],
    // The ore cavern
    10137: ["Crashroom", "orecavern", "r2", "Right"],
    10141: ["Chaorrupted Evil Soldier", "orecavern", "r6", "Right"],
    10142: ["Naga Baas", "orecavern", "r11", "Down"],
    // The dream nexus
    10168: ["Dark Wyvern", "dreamnexus", "r2", "Right"],
    10169: ["Dark Wyvern", "dreamnexus", "r2", "Right"],
    10170: ["Aether Serpent", "dreamnexus", "r3", "Right"],
    10171: ["Aether Serpent", "dreamnexus", "r3", "Right"],
    10173: ["Solar Phoenix", "dreamnexus", "r6", "Right"],
    10174: ["Solar Phoenix", "dreamnexus", "r6", "Right"],
    10175: ["Khasaanda", "dreamnexus", "r17a", "Up"]
});

// The ground items, as the map's own script asks for them: item id, map, and
// the number of requests. The fourth number, where it is known, is the bag item
// that spot pays, and naming it is what makes the engine wait for the count to
// rise instead of firing the whole burst into a spawn that is still down.
var GROUND = {
    1232: [[523, "bloodtusk", 1]],
    1234: [[525, "crossroads", 1]],
    1235: [[521, "crossroads", 10]],
    1237: [[522, "crossroads", 5, 8931], [524, "crossroads", 5, 8936]],
    1280: [[553, "ravinetemple", 1]],
    1281: [[554, "ravinetemple", 5], [555, "ravinetemple", 10], [556, "ravinetemple", 10]],
    1283: [[557, "ravinetemple", 10]],
    1375: [[679, "alliance", 1], [680, "alliance", 1]],
    1377: [[675, "alliance", 10]],
    1378: [[676, "alliance", 1]],
    1425: [[706, "ancienttemple", 7]],
    1428: [[707, "ancienttemple", 1]],
    1456: [[717, "orecavern", 1]],
    1457: [[719, "orecavern", 5]],
    1458: [[718, "orecavern", 5]],
    1469: [[734, "dreamnexus", 1], [735, "dreamnexus", 1],
           [736, "dreamnexus", 1], [737, "dreamnexus", 1]],
    1471: [[738, "dreamnexus", 10], [739, "dreamnexus", 11]]
};

function ground(id) {
    var spots = GROUND[id];
    if (spots == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return false;
    }
    var key = "ground" + id;
    if (!bot.memory[key]) {
        for (var i = 0; i < spots.length; i++) {
            var spot = spots[i];
            if (!bot.travel(spot[1])) return false;
            if (!bot.mapItem(spot[0], spot[2], spot[3])) return false;
        }
        bot.memory[key] = true;
        return false;
    }
    // The requests went out; the slot is the receipt. A spot that pays
    // nothing leaves this waiting, so it is counted instead.
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

// A quest with nothing to fetch: the accept and the hand-in are the step. The
// count is what turns a refused hand-in into a line in LOG.
function bare(id) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return;
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.done(id)) return;

    var key = "bare" + id;
    bot.memory[key] = (bot.memory[key] || 0) + 1;
    if (bot.memory[key] > 300) {
        bot.fail("quest " + id + " would not complete");
        return;
    }
    bot.quest.turnIn(id);
}

// Eclipse is the map's own cutscene: frame 92 of the Crossroads completes 1241
// the moment the player stands on its CutE cell, so the step is the walk.
function eclipse() {
    if (!bot.quest.active(1241)) {
        if (bot.quest.done(1241)) return;
        bot.quest.accept(1241);
        return;
    }
    if (!bot.travel("crossroads")) return;
    if (!bot.moveToCell("CutE", "Left")) return;

    bot.memory.eclipse = (bot.memory.eclipse || 0) + 1;
    if (bot.memory.eclipse > 300) {
        bot.fail("quest 1241 did not complete on the CutE cell");
    }
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// The Crossroads and Bloodtusk Ravine
if (chain < 1) return work(1232);
if (chain < 2) return work(1233);
if (chain < 3) return work(1234);
if (chain < 4) return work(1235);
if (chain < 5) return bare(1236);
if (chain < 6) return work(1237);
if (chain < 7) return eclipse();
if (chain < 8) return bare(1273);

// The ravine temple
if (chain < 9) return work(1280);
if (chain < 10) return work(1281);
if (chain < 11) return work(1282);
if (chain < 12) return work(1283);
if (chain < 13) return work(1284);

// The alliance camp
if (chain < 14) return work(1375);
if (chain < 15) return work(1376);
if (chain < 16) return work(1377);
if (chain < 17) return work(1378);
if (chain < 18) return work(1379);
if (chain < 19) return work(1380);

// The ancient temple
if (chain < 20) return work(1424);
if (chain < 21) return work(1425);
if (chain < 22) return work(1426);
if (chain < 23) return work(1427);
if (chain < 24) return work(1428);

// The ore cavern
if (chain < 25) return work(1456);
if (chain < 26) return work(1457);
if (chain < 27) return work(1458);
if (chain < 28) return work(1459);
if (chain < 29) return work(1460);

// The dream nexus
if (chain < 30) return work(1469);
if (chain < 31) return work(1470);
if (chain < 32) return work(1471);
if (chain < 33) return work(1472);
if (chain < 34) return work(1473);

bot.log("chaos-8-khasaanda: done");
return true;
