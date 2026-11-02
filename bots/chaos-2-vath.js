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

// A gate quest wants only the reward of the quest before it. The bag says
// which quest is next, and the step never reports done: the chain value
// moves the run on, so answering true here would end it early.
function bare(id) {
    if (bot.quest.done(id)) return false;
    if (!bot.quest.active(id)) {
        bot.quest.accept(id);
        return false;
    }
    bot.quest.turnIn(id);
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

function make327() {
    if (!bot.quest.active(327)) {
        bot.quest.accept(327);
        return false;
    }
    if (bot.quest.ready(327)) {
        bot.quest.turnIn(327);
        return false;
    }
    if (!bot.travel("pines")) return false;
    if (!bot.moveToCell("Greenguard", "Left")) return false;
    bot.kill("Pine Troll", 1);
    return false;
}

function make340() {
    if (!bot.quest.active(340)) {
        bot.quest.accept(340);
        return false;
    }
    if (bot.quest.ready(340)) {
        bot.quest.turnIn(340);
        return false;
    }
    if (!bot.travel("dwarfhold")) return false;
    if (!bot.moveToCell("Enter", "Right")) return false;
    bot.kill("Albino Bat", 1);
    return false;
}

function make353() {
    if (!bot.quest.active(353)) {
        bot.quest.accept(353);
        return false;
    }
    if (bot.quest.ready(353)) {
        bot.quest.turnIn(353);
        return false;
    }
    prison(353);
    return false;
}

// Like Butter plays its cutscene on the caldera's CutCap cell, then hands
// in below in the prison. The walk is the trigger; the turn-in stays where
// the reference puts it.
function butter() {
    if (bot.quest.done(354)) return false;
    var thermite = bot.item(1698);
    if (thermite == null) return false;
    if (thermite < 1) {
        make353();
        return false;
    }
    if (!bot.quest.active(354)) {
        bot.quest.accept(354);
        return false;
    }
    if (!bot.memory.cut354) {
        if (!bot.travel("vath")) return false;
        if (!bot.moveToCell("CutCap", "Left")) return false;
        bot.memory.cut354 = true;
        return false;
    }
    if (!bot.travel("dwarfprison")) return false;
    if (!bot.moveToCell("Enter", "Right")) return false;
    bot.quest.turnIn(354);
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
if (chain < 9) {
    var gold = bot.item(1596);
    if (gold == null) return;
    if (gold < 1) return make327();
    return bare(323);
}

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
if (chain < 21) {
    var key = bot.item(1641);
    if (key == null) return;
    if (key < 1) return make340();
    return bare(343);
}
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
if (chain < 30) return make353();
if (chain < 31) return butter();
if (chain < 32) return bot.quest.farm(355, "Warden Elfis", "dwarfprison", "Warden", "Right");

if (chain < 33) {
    if (!explosives()) return;
    return bare(357);
}

// The Chaos Beast and its master
if (chain < 34) return bot.quest.gather(362, 62, "roc");
if (chain < 35) return bot.quest.gather(363, 63, "stalagbite");

bot.log("chaos-2-vath: done");
return true;
