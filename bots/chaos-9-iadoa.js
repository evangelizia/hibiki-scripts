/// name: 13 Lords of Chaos: Iadoa
/// desc: The ninth Lord of Chaos, from the Span of Time to the Iadoa fight.
/// once: true
/// timeout: 120

// The Iadoa line spills into a second slot: the Span of Time runs 83 to the
// second proto-chaos beast, then the future runs 100 to the Lord himself.
var CHAIN = 83;
var NEXT = 100;

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
    // The time library
    13236: ["Sneak", "timelibrary", "Frame8", "Right"],
    13237: ["Tog", "timelibrary", "Frame5", "Right"],
    13238: ["Shadowscythe", "timelibrary", "Frame2", "Right"],
    13239: ["Undead Knight", "timelibrary", "FrameAQ", "Left"],
    13240: ["Moglin Ghost", "timelibrary", "Frame9", "Right"],
    13242: ["Tog", "timelibrary", "Frame5", "Right"],
    13248: ["Tog", "timelibrary", "Frame5", "Right"],
    13250: ["Shadowscythe", "timelibrary", "Frame2", "Right"],
    13251: ["Training Globe", "timelibrary", "Frame3", "Right"],
    13253: ["Queen's Recruit", "timelibrary", "FrameAQW2", "Right"],
    13254: ["Queen's Recruit", "timelibrary", "FrameAQW2", "Right"],
    13255: ["Queen's Knight", "timelibrary", "FrameAQW2", "Right"],
    // The time void
    13467: ["Ephemerite", "timevoid", "Frame1", "Right"],
    13469: ["Time-Travel Fairy", "timevoid", "Frame5", "Right"],
    13470: ["Time-Travel Fairy", "timevoid", "Frame5", "Right"],
    13474: ["Void Phoenix", "timevoid", "Frame4", "Right"],
    13480: ["Time-Travel Fairy", "timevoid", "Frame5", "Right"],
    13479: ["Unending Avatar", "timevoid", "Frame8", "Left"],
    // The AQ lesson
    13690: ["Ninja", "aqlesson", "Frame1", "Right"],
    13695: ["Water Elemental", "aqlesson", "Frame3", "Right"],
    13696: ["Eternite Ore", "aqlesson", "Frame3", "Right"],
    13697: ["Ice Elemental", "aqlesson", "Frame4", "Right"],
    13698: ["Fire Elemental", "aqlesson", "Frame4", "Right"],
    13701: ["Void Dragon", "aqlesson", "Frame5", "Left"],
    13703: ["Firezard", "aqlesson", "Frame6", "Right"],
    13704: ["Ice Elemental", "aqlesson", "Frame4", "Right"],
    13706: ["Akriloth", "aqlesson", "Frame7", "Left"],
    13707: ["Carnax", "aqlesson", "Frame9", "Right"],
    // The DF lesson
    14661: ["Fire Elemental", "dflesson", "r2", "Right"],
    14662: ["Fire Elemental", "dflesson", "r2", "Right"],
    14663: ["Fire Elemental", "dflesson", "r2", "Right"],
    14664: ["Lava Slime", "dflesson", "r1", "Right"],
    14665: ["Fire Elemental", "dflesson", "r2", "Right"],
    14666: ["Tog", "dflesson", "r6", "Right"],
    14667: ["Agitated Orb", "dflesson", "r7", "Right"],
    14668: ["Agitated Orb", "dflesson", "r7", "Right"],
    14669: ["Vultragon", "dflesson", "r8b", "Left"],
    14670: ["Chaos Sp-eye", "dflesson", "r9", "Right"],
    14671: ["Chaorrupted Evil Soldier", "dflesson", "r9", "Right"],
    14672: ["Lava Golem", "dflesson", "r10", "Right"],
    14673: ["Fire Elemental", "dflesson", "r2", "Right"],
    14674: ["Chaotic Horcboar", "dflesson", "r11", "Right"],
    14675: ["Chaotic Chicken", "dflesson", "r11", "Right"],
    14676: ["Fluffy the Dracolich", "dflesson", "r12", "Right"],
    // The MQ lesson
    15016: ["Asteroid", "mqlesson", "p1", "Left"],
    15018: ["MystRaven Student", "mqlesson", "Frame3", "Right"],
    15019: ["Training Globe", "mqlesson", "Frame1", "Right"],
    15020: ["MystRaven Student", "mqlesson", "Frame3", "Right"],
    15021: ["Chaos Shadowscythe", "mqlesson", "Frame5", "Right"],
    15022: ["Chaos Shadowscythe", "mqlesson", "Frame5", "Right"],
    15023: ["Chaos Shadowscythe", "mqlesson", "Frame5", "Right"],
    15024: ["Dragonoid", "mqlesson", "Boss", "Left"],
    // The deep chaos
    15165: ["Chaotic Merdrac", "deepchaos", "Frame1", "Right"],
    15166: ["Chaos Angler", "deepchaos", "Frame2", "Right"],
    15167: ["Kathool", "deepchaos", "Frame4", "Left"],
    // Timespace
    15168: ["Astral Ephemerite", "timespace", "Frame1", "Right"],
    15170: ["Chaos Lord Iadoa", "timespace", "Frame2", "Left"]
});

// The map items, as each map's own script asks for them: spot, map, and the
// number of requests. The Span's six are handed over by the tutors rather than
// picked off the floor, so a refused request leaves nothing to read but the
// quest's own count.
var GROUND = {
    2239: [[1358, "thespan", 1], [1359, "thespan", 1], [1360, "thespan", 1],
           [1361, "thespan", 1], [1362, "thespan", 1], [1363, "thespan", 1]],
    2241: [[1365, "timelibrary", 3]],
    2242: [[1366, "timelibrary", 2]],
    2243: [[1367, "timelibrary", 1]],
    2244: [[1368, "timelibrary", 1]],
    2254: [[1438, "timevoid", 12]],
    2255: [[1439, "timevoid", 12]],
    2257: [[1440, "timevoid", 1], [1441, "timevoid", 1],
           [1442, "timevoid", 1], [1443, "timevoid", 1]],
    2376: [[1467, "aqlesson", 1]],
    2378: [[1468, "aqlesson", 8], [1469, "aqlesson", 1]],
    2379: [[1470, "aqlesson", 3], [1471, "aqlesson", 3]],
    2380: [[1472, "aqlesson", 3], [1473, "aqlesson", 3]],
    2384: [[1474, "thespan", 1]],
    2470: [[1549, "dflesson", 8]],
    2504: [[1580, "mqlesson", 1]],
    2506: [[1581, "mqlesson", 5]],
    2516: [[1582, "deepchaos", 3]]
};

// The engine paces every map item, whatever its id, at the client's own one
// second, so a pass only moves one request and six notes take seven seconds.
// The cap is a minute of passes, and it starts over whenever the quest's own
// counts move, so it only ends a step whose map item will never pay.
var SWEEPS = 600;

function ground(id) {
    var spots = GROUND[id];
    if (spots == null) {
        bot.fail("quest " + id + " wants an item no step gives");
        return false;
    }
    var key = "ground" + id;
    var wants = bot.quest.wants(id);
    var have = "";
    for (var i = 0; wants != null && i < wants.length; i++) {
        have += wants[i].have + "/" + wants[i].need + " ";
    }
    if (bot.memory[key + "have"] != have) {
        bot.memory[key + "have"] = have;
        bot.memory[key] = 0;
    }
    var sweeps = (bot.memory[key] || 0) + 1;
    bot.memory[key] = sweeps;
    if (sweeps > SWEEPS) {
        bot.fail("quest " + id + " took nothing from " + spots[0][1]);
        return false;
    }
    for (var j = 0; j < spots.length; j++) {
        if (!bot.travel(spots[j][1])) return false;
        if (!bot.mapItem(spots[j][0], spots[j][2])) return false;
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

// The Span of Time
if (chain < 33) {
    if (chain < 1) return work(2239);
    if (chain < 2) return work(2240);
    if (chain < 3) return work(2241);
    if (chain < 4) return work(2242);
    if (chain < 5) return work(2243);
    if (chain < 6) return work(2244);
    if (chain < 7) return work(2253);
    if (chain < 8) return work(2254);
    if (chain < 9) return work(2255);
    if (chain < 10) return work(2256);
    if (chain < 11) return work(2257);
    if (chain < 12) return work(2258);
    if (chain < 13) return work(2376);
    if (chain < 14) return work(2377);
    if (chain < 15) return work(2378);
    if (chain < 16) return work(2379);
    if (chain < 17) return work(2380);
    if (chain < 18) return work(2381);
    if (chain < 19) return work(2382);
    if (chain < 20) return work(2383);
    if (chain < 21) return work(2384);
    if (chain < 22) return work(2385);
    if (chain < 23) return work(2386);
    if (chain < 24) return work(2470);
    if (chain < 25) return work(2471);
    if (chain < 26) return work(2472);
    if (chain < 27) return work(2473);
    if (chain < 28) return work(2474);
    if (chain < 29) return work(2475);
    if (chain < 30) return work(2476);
    if (chain < 31) return work(2477);
    if (chain < 32) return work(2478);
    return work(2479);
}

var next = bot.quest.value(NEXT);
if (next == null) return;

// The future
if (next < 1) return work(2504);
if (next < 2) return work(2505);
if (next < 3) return work(2506);
if (next < 4) return work(2507);
if (next < 5) return work(2508);
if (next < 6) return work(2509);
if (next < 7) return work(2510);
if (next < 8) return work(2511);
if (next < 9) return work(2512);
if (next < 10) return work(2513);
if (next < 11) return work(2515);
if (next < 12) return work(2516);
if (next < 13) return work(2517);
if (next < 14) return work(2518);
if (next < 15) return work(2519);

bot.log("chaos-9-iadoa: done");
return true;
