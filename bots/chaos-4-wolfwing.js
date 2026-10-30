/// name: 13 Lords of Chaos: Wolfwing
/// desc: The fourth Lord of Chaos, Darkovia up to Wolfwing.
/// once: true
/// timeout: 60

// Darkovia runs one slot from the graveyard to the lair.
var CHAIN = 26;

// The ending is one chain value and two quests, one per alignment. Slot 41 is
// the alignment the prologue wrote, so the run follows the hero.
var ALIGN_SLOT = 41;
var GOOD_END = 597;
var EVIL_END = 598;

// Red's axe is the reward of 515 and the hand-in for 514, so the bag says
// which of the two is next. The reward lands on the floor, not in the bag.
var AXE = 2926;
var AXE_NAME = "Red's Big Wolf Slaying Axe";

// The Greenguard trials come before Red lends the axe. They repeat and carry
// no chain slot, so the run keeps its own place in them.
var TRIALS = [
    { id: 308, monster: "Wolf", map: "greenguardeast", cell: "Enter", pad: "Spawn" },
    { id: 309, monster: "Slime", map: "greenguardwest", cell: "West10", pad: "Right" },
    { id: 310, monster: "Frogzard", map: "greenguardwest", cell: "West15", pad: "Down" },
    { id: 311, monster: "Spider", map: "greenguardeast", cell: "Enter", pad: "Spawn" }
];

// Which monster pays each item a quest asks for.
function spots(table) {
    var out = {};
    for (var id in table) {
        var row = table[id];
        out[id] = { monster: row[0], map: row[1], cell: row[2], pad: row[3] };
    }
    return out;
}

var DOCS = spots({
    2885: ["Spider", "greenguardeast", "Enter", "Spawn"],
    2886: ["Wolf", "greenguardeast", "Enter", "Spawn"],
    2887: ["Slime", "greenguardwest", "West10", "Right"],
    2888: ["Frogzard", "greenguardwest", "West15", "Down"],
    2889: ["Big Bad Boar", "greenguardwest", "West12", "Up"]
});

var NO_RESPECT = spots({
    3747: ["Lycan", "lycan", "r2", "Right"],
    3748: ["Lycan Knight", "lycan", "r2", "Right"]
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

// A trial has no chain slot and can be taken again, so its hand-in leaving the
// tracker is the only finish it has. The send and the answer are different
// passes: the hand-in is marked out first, so the accept cannot restart it.
function trial(q) {
    if (bot.memory[q.id]) return true;

    var sent = bot.memory["sent" + q.id];

    if (!bot.quest.active(q.id)) {
        if (sent) {
            bot.memory[q.id] = true;
            return true;
        }
        bot.quest.accept(q.id);
        return false;
    }
    if (bot.quest.ready(q.id)) {
        bot.memory["sent" + q.id] = true;
        bot.quest.turnIn(q.id);
        return false;
    }
    if (sent) return false;

    var wants = bot.quest.wants(q.id);
    if (wants == null) return false;

    var want = wants[0];
    if (want.have >= want.need) return false;

    if (!bot.travel(q.map)) return false;
    if (!bot.moveToCell(q.cell, q.pad)) return false;
    bot.kill(q.monster, want.need - want.have);
    return false;
}

function trialRun() {
    for (var i = 0; i < TRIALS.length; i++) {
        if (!trial(TRIALS[i])) return false;
    }
    return true;
}

// Lil' Red asks for the axe by name; Red's own quest is what pays it.
function lilred() {
    if (!trialRun()) return;

    var axe = bot.item(AXE);
    if (axe == null) return;

    if (axe > 0) {
        if (!bot.quest.active(514)) {
            if (bot.quest.done(514)) return;
            bot.quest.accept(514);
            return;
        }
        bot.quest.turnIn(514);
        return;
    }

    if (!bot.quest.active(515)) {
        // The quest left the tracker, so the axe is on the floor: it is a drop
        // of Red's quest, not a bag reward. The sent flag keeps the accept from
        // starting 515 over while the pickup is on its way.
        if (bot.memory.sent515) {
            if (!bot.pickDrop(AXE_NAME)) return;
            bot.memory.late = (bot.memory.late || 0) + 1;
            if (bot.memory.late > 600) bot.fail("quest 515 paid no axe");
            return;
        }
        bot.quest.accept(515);
        return;
    }
    // The hand-in is out; the resend is the turn-in's own job, and farming the
    // documents again would cost the item the hand-in already spent.
    if (bot.memory.sent515) {
        bot.quest.turnIn(515);
        return;
    }
    if (bot.quest.ready(515)) {
        bot.memory.sent515 = true;
        bot.quest.turnIn(515);
        return;
    }
    collect(515, DOCS);
}

// The war boss falls before the quest that names him: the map plays its
// cutscene on his death while the chain still reads 17, and 552 is the step
// that records it.
function war() {
    if (!bot.travel("lycanwar")) return;
    if (!bot.moveToCell("Boss", "Right")) return;

    var edvard = bot.monster("Edvard");
    if (edvard != null && edvard.alive) {
        bot.kill("Edvard", 1);
        return;
    }

    if (!bot.quest.active(552)) {
        if (bot.quest.done(552)) return;
        bot.quest.accept(552);
        return;
    }
    bot.quest.turnIn(552);
}

// The Chaos Gate opens once Edvard is down; the investigation itself is a map
// item in the cave below him, not a drop in the war.
function report() {
    if (!bot.quest.active(564)) {
        if (bot.quest.done(564)) return;
        bot.quest.accept(564);
        return;
    }
    if (bot.quest.ready(564)) {
        bot.quest.turnIn(564);
        return;
    }

    if (!bot.memory.gate) {
        if (!bot.travel("lycanwar")) return;
        if (!bot.moveToCell("Boss", "Right")) return;

        var edvard = bot.monster("Edvard");
        if (edvard != null && edvard.alive) {
            bot.kill("Edvard", 1);
            return;
        }
        bot.memory.gate = true;
        return;
    }

    if (!bot.travel("chaoscave")) return;
    bot.mapItem(107, 1, 4786);
}

// The lair's cutscene plays on the kill, and the two endings are the same
// chain value: the run takes the one the hero is aligned for.
function wolfwing() {
    var align = bot.quest.value(ALIGN_SLOT);
    if (align == null) return;

    var id = align == 2 ? EVIL_END : GOOD_END;

    // The body is re-entered ten times a second and the accept is paced under
    // that, so these are a minute and a half, not attempts: the other end is
    // tried at thirty seconds, and both are given up on at ninety.
    if ((bot.memory.end || 0) > 300) id = id === GOOD_END ? EVIL_END : GOOD_END;

    // Nothing in either end is handed in, so the client offers the turn-in the
    // moment it is accepted; the kill has to come first.
    if (!bot.memory.fought) {
        if (!bot.travel("wolfwing")) return;
        if (!bot.moveToCell("Boss", "Left")) return;

        var wolf = bot.monster("Wolfwing");
        if (wolf != null && wolf.alive) {
            bot.kill("Wolfwing", 1);
            return;
        }
        bot.log("chaos-4-wolfwing: wolfwing down, " + (align == 2 ? "evil" : "good") + " end");
        bot.memory.fought = true;
        return;
    }

    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return;

        bot.memory.end = (bot.memory.end || 0) + 1;
        if (bot.memory.end > 900) {
            bot.fail("neither end of Wolfwing would start; the hero's alignment is " + align);
            return;
        }
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.ready(id)) {
        bot.quest.turnIn(id);
    }
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// Darkovia Graveyard
if (chain < 1) return bot.quest.gather(494, 97, "darkoviagrave");
if (chain < 2) return bot.quest.farm(495, "Skeletal Fire Mage", "darkoviagrave", "Enter", "Spawn");
if (chain < 3) return bot.quest.farm(496, "Rattlebones", "darkoviagrave", "Enter", "Spawn");
if (chain < 4) return bot.quest.farm(497, "Albino Bat", "darkoviagrave", "g3", "Right");
if (chain < 5) return bot.quest.farm(498, "Blightfang", "darkoviagrave", "g7", "Top");

// Greenguard, for Red's axe
if (chain < 6) return lilred();

// Darkovia Forest
if (chain < 7) return bot.quest.farm(516, "Dire Wolf", "darkoviaforest", "f1", "Left");
if (chain < 8) return bot.quest.farm(517, "Blood Maggot", "darkoviaforest", "f3", "Left");
if (chain < 9) return bot.quest.farm(518, "Lich of the Stone", "darkoviaforest", "f3", "Left");

// Safiria's castle
if (chain < 10) return bot.quest.farm(519, "Blood Maggot", "safiria", "c1", "Right");
if (chain < 11) return bot.quest.farm(520, "Albino Bat", "safiria", "c2", "Bottom");
if (chain < 12) return bot.quest.farm(521, "Chaos Lycan", "safiria", "c3", "BtmLeft");
if (chain < 13) return bot.quest.farm(522, "Twisted Paw", "safiria", "c11", "Right");

// Lycan Ridge
if (chain < 14) return bot.quest.farm(534, "Dire Wolf", "lycan", "Enter", "Spawn");
if (chain < 15) return work(535, NO_RESPECT);
if (chain < 16) return bot.quest.farm(536, "Chaos Vampire Knight", "lycan", "r4", "Left");
if (chain < 17) return bot.quest.farm(537, "Sanguine", "lycan", "r5", "Right");

// The war and the cave under it
if (chain < 18) return war();
if (chain < 19) return report();
if (chain < 20) return bot.quest.farm(565, "Werepyre", "chaoscave", "r1", "Left");
if (chain < 21) return bot.quest.farm(566, "Werepyre", "chaoscave", "r3", "Left");
if (chain < 22) return bot.quest.farm(567, "DracoWerePyre", "chaoscave", "r5", "Left");

// The lair
if (chain < 23) return wolfwing();

bot.log("chaos-4-wolfwing: done");
return true;
