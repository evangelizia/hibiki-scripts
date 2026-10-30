/// name: 13 Lords of Chaos: Ledgermayne
/// desc: The sixth Lord of Chaos, Arcangrove up to Ledgermayne.
/// once: true
/// timeout: 90

// Arcangrove runs one slot from the Observatory to the Plane of Magic.
var CHAIN = 32;

// The Mana Potion quest 810 wants is bought, not dropped.
var MANA_POTION = 5572;
var MANA_SHOP = 1100;
var MANA_MAP = "embersea";

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
    5717: ["Seed Spitter", "arcangrove", "Back", "Right"],
    5718: ["Acornent", "cloister", "r2", "Right"],
    5719: ["Karasu", "cloister", "r3", "Right"],
    5720: ["Wendigo", "cloister", "Boss", "Down"],
    5721: ["Swamp Frogdrake", "mudluk", "r4", "Right"],
    5730: ["Earth Elemental", "gilead", "r2", "Right"],
    5731: ["Seed Spitter", "arcangrove", "Back", "Right"],
    5732: ["Water Elemental", "gilead", "r3", "Right"],
    5733: ["Merdraconian", "natatorium", "r3", "Right"],
    5734: ["Wind Elemental", "gilead", "r5", "Right"],
    5735: ["Karasu", "cloister", "r3", "Right"],
    5736: ["Fire Elemental", "gilead", "r4", "Left"],
    5737: ["Swamp Frogdrake", "mudluk", "r4", "Right"],
    6124: ["Wendigo", "cloister", "Boss", "Down"],
    6125: ["Tiger Leech", "mudluk", "Boss", "Down"],
    6126: ["Nessie", "natatorium", "r8", "Down"],
    6127: ["Mana Elemental", "gilead", "r8", "Down"],
    6128: ["Mafic Dragon", "mafic", "r12", "Left"]
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

// One quest wants a map item and a shop item: the potion is bought first,
// because the bough only counts while the quest is open.
function bough() {
    var id = 810;
    if (!bot.quest.active(id)) {
        if (bot.quest.done(id)) return;
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

        if (want.id == MANA_POTION) {
            if (!bot.travel(MANA_MAP)) return;
            bot.buy(MANA_SHOP, MANA_POTION, 1);
            return;
        }
        if (!bot.travel("cloister")) return;
        bot.mapItem(141, want.need, want.id);
        return;
    }
}

var chain = bot.quest.value(CHAIN);
if (chain == null) return;

// Arcangrove and the Cloister
if (chain < 1) return bot.quest.gather(805, 139, "arcangrove");
if (chain < 2) return bot.quest.gather(806, 142, "cloister");
if (chain < 3) return bot.quest.gather(807, 140, "cloister");
if (chain < 4) return bot.quest.farm(808, "Acornent", "cloister", "r2", "Right");
if (chain < 5) return bot.quest.farm(809, "Karasu", "cloister", "r3", "Right");
if (chain < 6) return bough();
if (chain < 7) return bot.quest.farm(811, "Wendigo", "cloister", "Boss", "Down");

// Mudluk
if (chain < 8) return bot.quest.gather(813, 143, "mudluk");
if (chain < 9) return bot.quest.farm(814, "Swamp Lurker", "mudluk", "Enter", "Spawn");
if (chain < 10) return bot.quest.farm(815, "Swamp Lurker", "mudluk", "Enter", "Spawn");
if (chain < 11) return bot.quest.farm(816, "Gorillaphant", "arcangrove", "Back", "Right");
if (chain < 12) return bot.quest.farm(817, "Swamp Frogdrake", "mudluk", "r4", "Right");
if (chain < 13) return bot.quest.farm(818, "Tiger Leech", "mudluk", "Boss", "Down");

// The Natatorium
if (chain < 14) return bot.quest.gather(825, 144, "natatorium");
if (chain < 15) return bot.quest.gather(826, 145, "natatorium");
if (chain < 16) return bot.quest.farm(827, "Anglerfish", "natatorium", "r2", "Down");
if (chain < 17) return bot.quest.farm(828, "Merdraconian", "natatorium", "r3", "Right");
if (chain < 18) return work(829, FIGHT);
if (chain < 19) return bot.quest.farm(830, "Nessie", "natatorium", "r8", "Down");

// Gilead
if (chain < 20) return bot.quest.gather(831, 146, "gilead");
if (chain < 21) return work(832, FIGHT);
if (chain < 22) return work(833, FIGHT);
if (chain < 23) return work(834, FIGHT);
if (chain < 24) return work(835, FIGHT);
if (chain < 25) return bot.quest.farm(836, "Mana Elemental", "gilead", "r8", "Down");

// Mount Mafic
if (chain < 26) return bot.quest.gather(838, 147, "mafic");
if (chain < 27) return bot.quest.farm(839, "Volcanic Maggot", "mafic", "r3", "Left");
if (chain < 28) return bot.quest.farm(840, "Scoria Serpent", "mafic", "r2", "Left");
if (chain < 29) return bot.quest.farm(841, "Living Fire", "mafic", "r7", "Left");
if (chain < 30) return bot.quest.farm(842, "Mafic Dragon", "mafic", "r12", "Left");

// The Plane of Magic
if (chain < 31) return bot.quest.farm(843, "Mana Imp", "elemental", "r2", "Right");
if (chain < 32) return bot.quest.farm(844, "Mana Falcon", "elemental", "r3", "Down");
if (chain < 33) return work(845, FIGHT);
if (chain < 34) return bot.quest.farm(846, "Mana Golem", "elemental", "r5", "Down");
if (chain < 35) return bot.quest.farm(847, "Ledgermayne", "ledgermayne", "Boss", "Right");

bot.log("chaos-6-ledgermayne: done");
return true;
