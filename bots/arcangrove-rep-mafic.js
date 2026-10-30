/// name: Arcangrove REP (Mafic)
/// desc: Mafic Dragon hearts for Arcangrove reputation.
/// once: false
/// timeout: 30

// Quest 848 is repeatable, has no chain slot and no level gate, and pays 2500
// Arcangrove rep for a single Burning Heart. The drop is rng, but one heart is
// worth several rounds of the gorillaphant and spitter quests, and the dragon
// is alone in its cell.
//
// The heart is a temporary item, so it lands on the floor and has to be taken
// before the quest will offer the hand-in.
var QUEST = 848;
var FLAME = ["r5", "Left"];
var DRAGON = ["r12", "Left"];

// True once every item the quest asks for is held. Null until the movie has
// answered, which counts as "not yet": the fight is the same either way.
function held() {
    var wants = bot.quest.wants(QUEST);
    if (wants == null) return false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have < wants[i].need) return false;
    }
    return true;
}

function phase(name) {
    if (bot.memory.phase === name) return;
    bot.memory.phase = name;
    bot.log("mafic: " + name);
}

if (!bot.checkpoint("mafic")) return;
if (!bot.travel("mafic")) return;

// The flame that gives and takes this quest is on screen 5. Accepting and
// handing in happen there, the fight happens at the dragon.
if (!bot.quest.active(QUEST)) {
    phase("accepting");
    if (!bot.moveToCell(FLAME[0], FLAME[1])) return;
    if (!bot.quest.accept(QUEST)) return;
    return;
}

// Whatever is on the floor goes in the bag first. A fight started with a drop
// still lying there is a fight the drop may not survive.
if (!bot.pickDrop("Burning Heart")) return;

if (held()) {
    phase("turning in");
    if (!bot.moveToCell(FLAME[0], FLAME[1])) return;
    if (!bot.quest.turnIn(QUEST)) return;
    bot.memory.phase = "";
    return true;
}

phase("mafic dragon");
if (!bot.moveToCell(DRAGON[0], DRAGON[1])) return;
if (!bot.kill("Mafic Dragon", 1)) return;
return true;
