/// name: 13 Lords of Chaos: Kimberly
/// desc: The fifth Lord of Chaos, Mythsong up to Kimberly.
/// once: true
/// timeout: 60

// Mythsong runs one slot from the Stairway to the Palooza.
var CHAIN = 27;

// Which monster pays each item a quest asks for.
function spots(table) {
    var out = {};
    for (var id in table) {
        var row = table[id];
        out[id] = { monster: row[0], map: row[1], cell: row[2], pad: row[3] };
    }
    return out;
}

var HAVEN = spots({
    4989: ["Grateful Undead", "stairway", "r1", "Right"],
    4990: ["Rock Lobster", "stairway", "r1", "Right"],
    4993: ["Elwood Bruise", "stairway", "r8", "Right"],
    4994: ["Jake Bruise", "stairway", "r8", "Right"]
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
        if (bot.quest.done(id)) return;
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return;
    }
    collect(id, table);
}

// A cutscene quest asks for nothing: the accept and the turn-in are the whole
// step, and the chain moves on with the value it writes. A refusal here means
// the chain gate is wrong, so it is reported instead of retried for ever.
function bare(id) {
    if (bot.quest.done(id)) return;

    var key = "try" + id;
    bot.memory[key] = (bot.memory[key] || 0) + 1;
    if (bot.memory[key] > 300) {
        bot.fail("quest " + id + " would not complete; chain value " + chain);
        return;
    }

    if (!bot.quest.active(id)) {
        bot.quest.accept(id);
        return;
    }
    bot.quest.turnIn(id);
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// Stairway to Haven
if (chain < 1) return work(648, HAVEN);
if (chain < 2) return bot.quest.farm(649, "Rock Lobster", "stairway", "r1", "Right");
if (chain < 3) return bot.quest.farm(650, "Grateful Undead", "stairway", "r1", "Right");
if (chain < 4) return work(651, HAVEN);

// The Beehive
if (chain < 5) return bot.quest.farm(658, "Stinger", "beehive", "r1", "Left");
if (chain < 6) return bot.quest.farm(659, "Killer Queen Bee", "beehive", "r5", "Left");
if (chain < 7) return bot.quest.farm(660, "Lord Ovthedance", "beehive", "r6", "Right");
if (chain < 8) return bare(661);

// The Orchestra
if (chain < 9) return bot.quest.farm(675, "Mozard", "orchestra", "R7", "Down");
if (chain < 10) return bot.quest.farm(676, "Pachelbel's Cannon", "orchestra", "R4", "Down");
if (chain < 11) return bot.quest.farm(677, "Mozard", "orchestra", "R7", "Down");
if (chain < 12) return bot.quest.farm(678, "Faust", "orchestra", "R8", "Down");

// The war and the Palooza
if (chain < 13) return bare(707);
if (chain < 14) return bot.quest.farm(709, "Pony Gary Yellow", "palooza", "Act7", "Right");
if (chain < 15) return bot.quest.farm(710, "Kimberly", "palooza", "Act11", "Right");

bot.log("chaos-5-kimberly: done");
return true;
