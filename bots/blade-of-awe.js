/// name: Blade of Awe
/// desc: Valencia's Awe quests, rank 6, and the Blade of Awe.
/// once: true
/// timeout: 20

// The five legs share chain 123 and are marked repeatable. After the first
// completion quest.done stays true and quest.farm answers at once, so each leg
// is accepted, fought and handed in by hand, in the order its value unlocks.
var CHAIN = 123;
var LEGS = [
    { id: 2933, value: 1, map: "j6", cell: "R4", pad: "Left",
      monster: "Sketchy Dragon" },
    { id: 2934, value: 2, map: "gilead", cell: "r4", pad: "Left",
      monster: "Fire Elemental" },
    { id: 2935, value: 3, map: "castleundead", cell: "Enter", pad: "Left",
      monster: "Skeletal Viking" },
    { id: 2936, value: 4, map: "hydra", cell: "Boss", pad: "Left",
      monster: "Hydra Head" },
    { id: 2937, value: 5, map: "escherion", cell: "Boss", pad: "Left",
      monster: "Escherion" }
];

// Rank 6 is the sword's gate. The five legs pay 44,100 reputation together,
// exactly rank 6; the Hilt leg is repeatable and is the fallback if the chain
// ever stops short.
var RANK = 6;
var HILT = 2935;
var SHOP = 631;
var SWORD = 17585;

// Escherion only takes damage while his staff is down, and the staff returns,
// so the fight names whichever is up instead of standing on an invulnerable
// boss.
function fight(leg) {
    if (leg.id != 2937) {
        bot.kill(leg.monster, 1);
        return;
    }

    var staff = bot.monster("Staff of Inversion");
    if (staff != null && staff.alive) {
        bot.kill("Staff of Inversion", 1);
        return;
    }
    bot.kill("Escherion", 1);
}

function step(leg) {
    if (!bot.quest.active(leg.id)) {
        if (!bot.travel(leg.map)) return;
        if (!bot.moveToCell(leg.cell, leg.pad)) return;
        if (!bot.quest.accept(leg.id)) return;
        return;
    }

    if (bot.quest.ready(leg.id)) {
        if (!bot.quest.turnIn(leg.id)) return;
        return;
    }

    if (!bot.travel(leg.map)) return;
    if (!bot.moveToCell(leg.cell, leg.pad)) return;
    fight(leg);
}

function farmRank() {
    var faction = bot.rep("Blade of Awe");
    if (faction == null) return false;

    if (bot.memory.rank !== faction.rank) {
        bot.memory.rank = faction.rank;
        bot.log("blade-of-awe: rank " + faction.rank);
    }
    if (faction.rank >= RANK) return true;

    if (!bot.quest.active(HILT)) {
        bot.quest.accept(HILT);
        return false;
    }
    if (bot.quest.ready(HILT)) {
        bot.quest.turnIn(HILT);
        return false;
    }

    if (!bot.travel("castleundead")) return false;
    if (!bot.moveToCell("Enter", "Left")) return false;
    bot.kill("Skeletal Viking", 1);
    return false;
}

// The first item() call only asks for the count; the answer is one snapshot
// away, and a blade already in the bag is a finished run.
var sword = bot.item(SWORD);
if (sword == null) return;
if (sword > 0) {
    bot.log("blade-of-awe: Blade of Awe already held");
    return true;
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

for (var i = 0; i < LEGS.length; i++) {
    if (chain >= LEGS[i].value) continue;
    step(LEGS[i]);
    return;
}

if (!farmRank()) return;

if (!bot.travel("museum")) return;
if (!bot.buy(SHOP, SWORD)) return;
bot.log("blade-of-awe: Blade of Awe bought");
return true;
