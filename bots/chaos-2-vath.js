/// name: 13 Lords of Chaos: Vath
/// desc: The second Lord of Chaos, Dwarfhold up to Vath.
/// once: true
/// timeout: 60

// Dwarfhold runs one slot from the frozen tavern to the caldera above it.
var CHAIN = 22;

// Which prison monster drops each item the two prison quests ask for.
var PRISON = {
    1695: { monster: "Balboa", cell: "r8", pad: "Left" },
    1696: { monster: "Albino Bat", cell: "r9", pad: "Left" },
    1697: { monster: "Chaos Drow", cell: "r8", pad: "Left" },
    1700: { monster: "Albino Bat", cell: "r9", pad: "Left" },
    1701: { monster: "Chaos Drow", cell: "r8", pad: "Left" },
    1702: { monster: "Balboa", cell: "r8", pad: "Left" }
};

// A gate quest wants only the reward of the quest before it. The bag is the
// answer, and a reward that never comes is reported instead of waited on.
function handIn(id, item) {
    if (bot.quest.done(id)) {
        bot.memory.itemless = 0;
        return true;
    }
    if (bot.quest.active(id)) {
        bot.memory.itemless = 0;
        bot.quest.turnIn(id);
        return false;
    }

    var have = bot.item(item);
    if (have == null) return false;
    if (have > 0) {
        bot.memory.itemless = 0;
        bot.quest.accept(id);
        return false;
    }

    // A reward can land a pass after the slot moves, so it gets the benefit
    // of the doubt first; a few hundred passes, then the chain is broken.
    bot.memory.itemless = (bot.memory.itemless || 0) + 1;
    if (bot.memory.itemless > 200) {
        bot.fail("quest " + id + " wants item " + item + ", which no step made");
    }
    return false;
}

// Mock the Lock and Explosives 101 each want one item from three monsters,
// so the bag says which room is next.
function prison(id) {
    var wants = bot.quest.wants(id);
    if (wants == null) return false;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have >= want.need) continue;

        var part = PRISON[want.id];
        if (part == null) {
            bot.fail("quest " + id + " wants item " + want.id + ", which no step gives");
            return false;
        }
        if (!bot.travel("dwarfprison")) return false;
        if (!bot.moveToCell(part.cell, part.pad)) return false;
        bot.kill(part.monster, want.need - want.have);
        return false;
    }
    return true;
}

function mixed(id) {
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return true;
        bot.quest.accept(id);
        return false;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
        return false;
    }
    prison(id);
    return false;
}

// Explosives 101 has no chain slot of its own. It exists to make the
// Tee-En-Tee that Big Bada-Boom hands in, so holding that is "done".
function explosives() {
    if (!bot.quest.active(356)) {
        var tee = bot.item(1703);
        if (tee != null && tee > 0) return true;
        bot.quest.accept(356);
        return false;
    }
    if (bot.quest.ready(356)) {
        bot.quest.turnIn(356);
        return false;
    }
    prison(356);
    return false;
}

// Vath only comes back once Stalagbite is down, and the caldera hands over
// the proof only when both have fallen in the same visit.
function vath() {
    if (!bot.quest.active(363)) {
        if (bot.quest.done(363)) return true;
        bot.quest.accept(363);
        return false;
    }
    if (bot.quest.ready(363)) {
        bot.quest.turnIn(363);
        return false;
    }
    if (!bot.travel("stalagbite")) return false;
    if (!bot.moveToCell("r2", "Left")) return false;

    var stalagbite = bot.monster("Stalagbite");
    if (stalagbite != null && stalagbite.alive) {
        bot.kill("Stalagbite", 1);
        return false;
    }

    bot.kill("Vath", 1);
    return false;
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// Pinewood Forest
if (chain < 1) return bot.quest.gather(319, 56, "tavern");
if (chain < 2) return bot.quest.farm(320, "Pine Grizzly", "pines", "Tavern", "Left");
if (chain < 3) return bot.quest.farm(321, "Red Shell Turtle", "pines", "Llama", "Left");
if (chain < 4) return bot.quest.farm(322, "Twistedtooth", "pines", "Boss", "Right");
if (chain < 5) return bot.quest.farm(324, "Red Shell Turtle", "pines", "Llama", "Left");
if (chain < 6) return bot.quest.farm(325, "Pine Grizzly", "pines", "Tavern", "Left");
if (chain < 7) return bot.quest.farm(326, "LeatherWing", "pines", "Citadel", "Left");
if (chain < 8) return bot.quest.farm(327, "Pine Troll", "pines", "Greenguard", "Left");
if (chain < 9) return handIn(323, 1596);

// The city and the path to it
if (chain < 10) return bot.quest.gather(344, 60, "dwarfhold");
if (chain < 11) return bot.quest.farm(331, "Ore Balboa", "mountainpath", "r4", "Left");
if (chain < 12) return bot.quest.farm(332, "Vultragon", "mountainpath", "r3", "Left");

// Lower Dwarfhold
if (chain < 13) return bot.quest.farm(333, "Chaos Drow", "dwarfhold", "r2", "Left");
if (chain < 14) return bot.quest.farm(334, "Glow Worm", "dwarfhold", "r1", "Left");
if (chain < 15) return bot.quest.farm(335, "Albino Bat", "dwarfhold", "Enter", "Right");
if (chain < 16) return bot.quest.farm(336, "Chaotic Draconian", "dwarfhold", "r3", "Left");
if (chain < 17) return bot.quest.gather(337, 59, "dwarfhold");
if (chain < 18) return bot.quest.farm(338, "Chaos Drow", "dwarfhold", "r2", "Left");
if (chain < 19) return bot.quest.farm(339, "Chaotic Draconian", "dwarfhold", "r3", "Left");
if (chain < 20) return bot.quest.farm(340, "Albino Bat", "dwarfhold", "Enter", "Right");
if (chain < 21) return handIn(343, 1641);
if (chain < 22) return bot.quest.farm(341, "Amadeus", "dwarfhold", "rmole", "Right");

// Upper City
if (chain < 23) return bot.quest.gather(346, 61, "uppercity");
if (chain < 24) return bot.quest.farm(347, "Drow Assassin", "uppercity", "r1", "Left");
if (chain < 25) return bot.quest.farm(348, "Chaotic Draconian", "uppercity", "r2", "Left");
if (chain < 26) return bot.quest.farm(349, "Chaos Egg", "uppercity", "r3", "Left");
if (chain < 27) return bot.quest.farm(350, "Terradactyl", "uppercity", "r4", "Right");
if (chain < 28) return bot.quest.farm(351, "Rhino Beetle", "uppercity", "r6", "Left");
if (chain < 29) return bot.quest.farm(352, "Cave Lizard", "uppercity", "r7", "Left");

// The prison under the city
if (chain < 30) return mixed(353);
if (chain < 31) return handIn(354, 1698);
if (chain < 32) return bot.quest.farm(355, "Warden Elfis", "dwarfprison", "Warden", "Left");

if (chain < 33) {
    if (!explosives()) return;
    return handIn(357, 1703);
}

// The Chaos Beast and its master
if (chain < 34) return bot.quest.farm(362, "Rock Roc", "roc", "Enter", "Spawn");
if (chain < 35) return vath();

bot.log("chaos-2-vath: done");
return true;
