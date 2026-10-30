/// name: 13 Lords of Chaos: Lionfang
/// desc: The tenth Lord of Chaos, from the Blackhorn crypt to the storm temple.
/// once: true
/// timeout: 120

// The Lionfang line runs on three slots: the main chain on 106, the deathpits
// detour on 113 while the main chain waits at thirty, and the storm temple on
// 117 once the main chain is done.
var CHAIN = 106;
var PITS = 113;
var STORM = 117;

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
    // The Blackhorn crypt
    15707: ["Restless Undead", "blackhorn", "Frame1", "Right"],
    15709: ["Tomb Spider", "blackhorn", "Frame2", "Right"],
    15710: ["Restless Undead", "blackhorn", "Frame1", "Right"],
    15711: ["Tomb Spider", "blackhorn", "Frame2", "Right"],
    15714: ["Bonefeeder Spider", "blackhorn", "Frame10", "Right"],
    15716: ["Tomb Spider", "blackhorn", "Frame2", "Right"],
    15717: ["Restless Undead", "blackhorn", "Frame1", "Right"],
    // The onslaught tower
    15755: ["Golden Caster", "onslaughttower", "Path1", "Right"],
    15756: ["Golden Caster", "onslaughttower", "Path1", "Right"],
    15760: ["Golden Caster", "onslaughttower", "Path1", "Right"],
    15762: ["Maximillian Lionfang", "onslaughttower", "Boss", "Left"],
    // Falguard
    15884: ["Chaonslaught Caster", "falguard", "r5", "Right"],
    15886: ["Chaonslaught Warrior", "falguard", "r3", "Right"],
    15887: ["Chaonslaught Cavalry", "falguard", "r4", "Right"],
    15889: ["Chaonslaught Warrior", "falguard", "r3", "Right"],
    15892: ["Chaonslaught Caster", "falguard", "r5", "Right"],
    15894: ["Primarch", "falguard", "r2", "Left"],
    // The deathpits
    16439: ["Rotting Darkblood", "deathpits", "r1", "Right"],
    16441: ["Rotting Darkblood", "deathpits", "r1", "Right"],
    16442: ["Rotting Darkblood", "deathpits", "r1", "Right"],
    16443: ["Ghastly Darkblood", "deathpits", "r5", "Right"],
    16444: ["Ghastly Darkblood", "deathpits", "r5", "Right"],
    16446: ["Ghastly Darkblood", "deathpits", "r5", "Right"],
    16447: ["Rotting Darkblood", "deathpits", "r1", "Right"],
    16448: ["Sundered Darkblood", "deathpits", "r10", "Right"],
    16450: ["Sundered Darkblood", "deathpits", "r10", "Right"],
    16451: ["Rotting Darkblood", "deathpits", "r1", "Right"],
    16452: ["Ghastly Darkblood", "deathpits", "r5", "Right"],
    16454: ["Wrathful Vestis", "deathpits", "r14", "Left"],
    // The venom vaults
    16714: ["Chaonslaught Warrior", "venomvaults", "r3", "Left"],
    16717: ["Chaonslaught Caster", "venomvaults", "r4", "Right"],
    16719: ["Chaonslaught Caster", "venomvaults", "r4", "Right"],
    16720: ["Chaonslaught Warrior", "venomvaults", "r3", "Left"],
    16721: ["Chaonslaught Caster", "venomvaults", "r4", "Right"],
    16723: ["Chaonslaught Caster", "venomvaults", "r4", "Right"],
    16724: ["Manticore", "venomvaults", "r1", "Left"],
    // The storm temple
    16783: ["Chaonslaught Warrior", "stormtemple", "r1", "Right"],
    16784: ["Chaonslaught Caster", "stormtemple", "r2", "Right"],
    16785: ["Chaonslaught Caster", "stormtemple", "r2", "Right"],
    16787: ["Chaonslaught Caster", "stormtemple", "r2", "Right"],
    16789: ["Chaonslaught Cavalry", "stormtemple", "r4", "Right"],
    16791: ["Chaos Lord Lionfang", "stormtemple", "r16", "Left"]
});

// The map items, as each map's own script asks for them: spot, map, and the
// number of requests. Nothing here names the bag item, because the map decides
// which one a spot pays.
var GROUND = {
    2613: [[1615, "blackhorn", 10]],
    2615: [[1616, "blackhorn", 1]],
    2616: [[1617, "blackhorn", 1]],
    2618: [[1618, "blackhorn", 1]],
    2621: [[1619, "blackhorn", 1]],
    2622: [[1620, "onslaughttower", 1], [1621, "onslaughttower", 1],
           [1622, "onslaughttower", 1], [1623, "onslaughttower", 1]],
    2625: [[1624, "onslaughttower", 8]],
    2626: [[1625, "onslaughttower", 1]],
    2627: [[1626, "onslaughttower", 4]],
    2629: [[1627, "onslaughttower", 1]],
    2667: [[1628, "falguard", 6]],
    2669: [[1629, "falguard", 1]],
    2671: [[1630, "falguard", 1]],
    2672: [[1631, "falguard", 1]],
    2674: [[1632, "falguard", 1]],
    2721: [[1691, "deathpits", 5]],
    2726: [[1692, "deathpits", 6]],
    2730: [[1693, "deathpits", 9]],
    2732: [[1694, "deathpits", 12]],
    2740: [[1695, "deathpits", 1]],
    2792: [[1724, "venomvaults", 1]],
    2794: [[1725, "venomvaults", 1]],
    2796: [[1726, "venomvaults", 1]],
    2798: [[1727, "venomvaults", 5]],
    2802: [[1728, "venomvaults", 3]],
    2805: [[1729, "stormtemple", 4]],
    2809: [[1730, "stormtemple", 3]],
    2811: [[1731, "stormtemple", 1]],
    2813: [[1732, "stormtemple", 1]]
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

// The Blackhorn crypt and the onslaught tower
if (chain < 30) {
    if (chain < 1) return work(2612);
    if (chain < 2) return work(2613);
    if (chain < 3) return work(2614);
    if (chain < 4) return work(2615);
    if (chain < 5) return work(2616);
    if (chain < 6) return work(2617);
    if (chain < 7) return work(2618);
    if (chain < 8) return work(2619);
    if (chain < 9) return work(2620);
    if (chain < 10) return work(2621);
    if (chain < 11) return work(2622);
    if (chain < 12) return work(2623);
    if (chain < 13) return work(2624);
    if (chain < 14) return work(2625);
    if (chain < 15) return work(2626);
    if (chain < 16) return work(2627);
    if (chain < 17) return work(2628);
    if (chain < 18) return work(2629);
    if (chain < 19) return work(2630);

    // Falguard
    if (chain < 20) return work(2666);
    if (chain < 21) return work(2667);
    if (chain < 22) return work(2668);
    if (chain < 23) return work(2669);
    if (chain < 24) return work(2670);
    if (chain < 25) return work(2671);
    if (chain < 26) return work(2672);
    if (chain < 27) return work(2673);
    if (chain < 28) return work(2674);
    if (chain < 29) return work(2675);

    // The deathpits run on their own slot while the main chain waits here.
    var pits = bot.quest.value(PITS);
    if (pits == null) return;
    if (pits < 1) return work(2720);
    if (pits < 2) return work(2721);
    if (pits < 3) return work(2722);
    if (pits < 4) return work(2723);
    if (pits < 5) return work(2724);
    if (pits < 6) return work(2725);
    if (pits < 7) return work(2726);
    if (pits < 8) return work(2727);
    if (pits < 9) return work(2728);
    if (pits < 10) return work(2729);
    if (pits < 11) return work(2730);
    if (pits < 12) return work(2731);
    if (pits < 13) return work(2732);
}

// Back on the main chain: the tears, then the venom vaults
if (chain < 30) return work(2740);
if (chain < 31) return work(2792);
if (chain < 32) return work(2793);
if (chain < 33) return work(2794);
if (chain < 34) return work(2796);
if (chain < 35) return work(2797);

var storm = bot.quest.value(STORM);
if (storm == null) return;

// The storm temple
if (storm < 1) return work(2798);
if (storm < 2) return work(2799);
if (storm < 3) return work(2800);
if (storm < 4) return work(2801);
if (storm < 5) return work(2802);
if (storm < 6) return work(2803);
if (storm < 7) return work(2804);
if (storm < 8) return work(2805);
if (storm < 9) return work(2806);
if (storm < 10) return work(2807);
if (storm < 11) return work(2808);
if (storm < 12) return work(2809);
if (storm < 13) return work(2810);
if (storm < 14) return work(2811);
if (storm < 15) return work(2812);
if (storm < 16) return work(2813);
if (storm < 17) return work(2814);

bot.log("chaos-10-lionfang: done");
return true;
