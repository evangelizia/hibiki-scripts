/// name: Brightoak Saga
/// desc: The Brightoak chain, Rivensylth through Gaiazor.
/// once: true
/// timeout: 180

// Rivensylth is walked in a spirit animal. The owl is a temp armor that the
// map item on the first screen hands out, and the o-cells below only open
// while it is on, so it goes back on after every join.
var SPIRIT = 3935;
var OWL = 32057;

// Where every item a quest turns in comes from. `spot` is the map item id the
// site's script sends to GetMapItem, and the bag id is the table's own key.
// The chain tokens are absent on purpose: the quest before them pays them.
var SOURCE = {
    // Rivensylth
    32045: { spot: 3944, map: "rivensylth" },
    32046: { monster: "Cave Creeper", map: "rivensylth", cell: "o2", pad: "Left" },
    32047: { spot: 3945, map: "rivensylth" },
    32048: { monster: "Mushroom", map: "rivensylth", cell: "o4", pad: "Left" },
    32049: { spot: 3948, map: "rivensylth" },
    32050: { monster: "Pine Grizzly", map: "pines", cell: "Mountain", pad: "Left" },
    32051: { monster: "Cave Creeper", map: "rivensylth", cell: "o2", pad: "Left" },
    32052: { spot: 3946, map: "rivensylth" },
    32053: { monster: "Avada", map: "rivensylth", cell: "Boss", pad: "Left" },

    // Brightoak Grove
    30814: { monster: "Bright Treeant", map: "brightoak", cell: "r2", pad: "Left" },
    30809: { monster: "Wolfwood", map: "brightoak", cell: "r2", pad: "Left" },
    30810: { monster: "Hootbear", map: "brightoak", cell: "r3", pad: "Left" },
    30817: { monster: "Twisted Goblin", map: "brightoak", cell: "r3", pad: "Left" },
    30815: { monster: "Grove Spore", map: "brightoak", cell: "r4", pad: "Left" },
    30816: { spot: 3666, map: "brightoak" },
    30819: { monster: "Brightpool Guardian", map: "brightoak", cell: "r5", pad: "Left" },
    30820: { spot: 3667, map: "brightoak" },
    30811: { monster: "Tainted Earth", map: "brightoak", cell: "r6", pad: "Left" },
    32200: { monster: "Bright Treeant", map: "brightoak", cell: "r2", pad: "Left" },
    32201: { monster: "Wolfwood", map: "brightoak", cell: "r2", pad: "Left" },
    32743: { monster: "Brightpool Guardian", map: "brightoak", cell: "r5", pad: "Left" },

    // Elfhame
    32198: { spot: 3983, map: "elfhame" },
    32199: { monster: "Ruin Stalker", map: "elfhame", cell: "r2", pad: "Left" },
    32210: { monster: "Ruin Stalker", map: "elfhame", cell: "r2", pad: "Left" },
    32203: { monster: "Blighted Deer", map: "elfhame", cell: "Enter", pad: "Spawn" },
    32205: { monster: "Ruin Dweller", map: "elfhame", cell: "r3", pad: "Left" },
    32209: { monster: "Ruin Dweller", map: "elfhame", cell: "r3", pad: "Left" },
    32206: { monster: "Wolfrider", map: "elfhame", cell: "r3", pad: "Left" },
    32207: { monster: "Ratawampus", map: "elfhame", cell: "r4", pad: "Bottom" },
    32208: { monster: "Ratawampus", map: "elfhame", cell: "r4", pad: "Bottom" },
    32211: { spot: 3984, map: "elfhame" },
    32212: { monster: "Guardian Spirit", map: "elfhame", cell: "r7", pad: "Bottom" },

    // The potion, the elixir, and the daily behind the second Lapis token
    6649: { shop: 245, map: "sandsea" },
    32202: { quest: 4660 },
    5669: { monster: "Acornent", map: "cloister", cell: "r2", pad: "Right" },
    5670: { monster: "Karasu", map: "cloister", cell: "r3", pad: "Right" },
    32204: { quest: 820 },
    5584: { quest: 803 },
    5592: { monster: "DOOM Dirt", map: "arcangrove", cell: "Back", pad: "Left" },
    5593: { monster: "Snapdrake", map: "arcangrove", cell: "RightBack", pad: "Left" },
    5594: { monster: "Blood Lily", map: "arcangrove", cell: "LeftBack", pad: "Left" },

    // Darkheart
    32736: { spot: 4052, map: "darkheart" },
    32737: { monster: "Mutated Leech", map: "darkheart", cell: "Enter", pad: "Spawn" },
    32738: { monster: "Mutated Leech", map: "darkheart", cell: "Enter", pad: "Spawn" },
    32752: { monster: "Mutated Leech", map: "darkheart", cell: "Enter", pad: "Spawn" },
    32744: { monster: "Tainted Earth", map: "darkheart", cell: "Enter", pad: "Spawn" },
    32739: { spot: 4053, map: "darkheart" },
    32740: { monster: "Wisterrora", map: "darkheart", cell: "r4", pad: "Top" },
    32741: { spot: 4054, map: "darkheart" },
    32742: { monster: "Toxic Grove Spider", map: "darkheart", cell: "r2", pad: "Left" },
    32745: { monster: "Toxic Grove Spider", map: "darkheart", cell: "r2", pad: "Left" },
    32751: { spot: 4055, map: "darkheart" },
    32746: { spot: 4056, map: "darkheart" },
    32747: { monster: "Gaiazor", map: "darkheart", cell: "r7", pad: "Left" },

    // Gaiazor, and the three maps its dares send the run through
    33466: { spot: 4204, map: "gaiazor" },
    33467: { monster: "Wolfwood", map: "gaiazor", cell: "r2", pad: "Left" },
    33468: { monster: "Wisterrora", map: "gaiazor", cell: "r2", pad: "Left" },
    33469: { monster: "Tree Golem", map: "gaiazor", cell: "r2", pad: "Left" },
    33470: { monster: "Tree Golem", map: "gaiazor", cell: "r2", pad: "Left" },
    33471: { monster: "Wolfwood", map: "gaiazor", cell: "r2", pad: "Left" },
    33472: { monster: "Wisterrora", map: "gaiazor", cell: "r2", pad: "Left" },
    33473: { monster: "Tree Golem", map: "gaiazor", cell: "r2", pad: "Left" },
    33474: { monster: "Wisterrora", map: "gaiazor", cell: "r2", pad: "Left" },
    33475: { spot: 4205, map: "gaiazor" },
    33476: { monster: "Toxic Grove Spider", map: "darkheart", cell: "r2", pad: "Left" },
    33477: { monster: "Trollola Plant", map: "bloodtusk", cell: "r4", pad: "Center" },
    33478: { monster: "Sulfur Imp", map: "firestorm", cell: "r2", pad: "Left" },
    33479: { spot: 4206, map: "gaiazor" },
    33486: { monster: "Wolfwood", map: "gaiazor", cell: "r2", pad: "Left" },
    33487: { monster: "Wisterrora", map: "gaiazor", cell: "r2", pad: "Left" },
    33490: { spot: 4207, map: "gaiazor" },
    33491: { spot: 4208, map: "gaiazor" },
    33492: { spot: 4209, map: "gaiazor" },
    33493: { spot: 4210, map: "gaiazor" },
    33494: { monster: "Nevanna", map: "gaiazor", cell: "r7", pad: "Left" },
    33495: { monster: "Gaiazor", map: "gaiazor", cell: "r8", pad: "Left" }
};

// The run, in the order the saga hands it out. `side` is a quest with no chain
// slot of its own, so its hand-in is remembered instead of read back.
var ORDER = [
    // Rivensylth, in the owl
    { id: 4637 }, { id: 4638 }, { id: 4639 }, { id: 4640 },
    { id: 4641 }, { id: 4642 }, { id: 4643 }, { id: 4644 },

    // Aven Greywhorl's board, and the four runes of Elfhame
    { id: 4466, side: true },
    { id: 4659 }, { id: 4660 }, { id: 4661 }, { id: 4662 },
    { id: 4663 }, { id: 4664 }, { id: 4665 }, { id: 4666 },
    { id: 4667 }, { id: 4668 },

    // The grove's own errands
    { id: 4469, side: true }, { id: 4470, side: true },
    { id: 4467, side: true }, { id: 4468, side: true },
    { id: 4463, side: true },

    // Darkheart
    { id: 4692 }, { id: 4693 }, { id: 4694 }, { id: 4695 },
    { id: 4696 }, { id: 4697 }, { id: 4698 }, { id: 4699 },
    { id: 4700 },

    // Ravinos's tokens: each one pays the item the next one turns in, so a
    // token in the bag is a step already handed over.
    { id: 4799, side: true, pay: 33480 },
    { id: 4800, side: true, pay: 33481 },
    { id: 4801, side: true, pay: 33482 },
    { id: 4802 }, { id: 4803 }, { id: 4804 },

    // Lapis's
    { id: 4805, side: true, pay: 33485 },
    { id: 4806, side: true, pay: 33488 },
    { id: 4807, side: true, pay: 33489 },
    { id: 4808 },

    { id: 4809 }, { id: 4810 }
];

// The o-cells below Rivensylth's first screen only open while the owl is worn,
// and a temp armor does not survive a join.
function spirit() {
    var owl = bot.item(OWL);
    if (owl == null) return false;
    if (owl > 0) return bot.equip(OWL);
    bot.mapItem(SPIRIT, 1, OWL);
    return false;
}

// Where that item comes from, one action per pass.
function source(id, qty) {
    var from = SOURCE[id];
    if (from == null) {
        bot.fail("item " + id + " has no source in this run");
        return;
    }
    if (from.quest) {
        act({ id: from.quest });
        return;
    }
    if (!bot.travel(from.map)) return;
    if (from.map == "rivensylth" && !spirit()) return;
    if (from.shop) {
        bot.buy(from.shop, id, qty);
        return;
    }
    if (from.spot) {
        bot.mapItem(from.spot, qty, id);
        return;
    }
    if (!bot.moveToCell(from.cell, from.pad)) return;
    bot.kill(from.monster, qty);
}

// Accept, hand in, or go and get the next thing the quest asks for.
function act(step) {
    var id = step.id;
    if (!bot.quest.active(id)) {
        var tries = (bot.memory["try" + id] || 0) + 1;
        bot.memory["try" + id] = tries;
        if (tries > 900) {
            bot.fail("quest " + id + " never started"
                + (id == 803 ? "; Sparrow's Blood is a daily, so it waits for the next one" : ""));
            return;
        }
        bot.quest.accept(id);
        return;
    }

    if (bot.quest.ready(id)) {
        bot.memory["sent" + id] = true;
        bot.quest.turnIn(id);
        return;
    }

    var wants = bot.quest.wants(id);
    if (wants == null) return;

    for (var i = 0; i < wants.length; i++) {
        var want = wants[i];
        if (want.have < want.need) {
            source(want.id, want.need - want.have);
            return;
        }
    }
}

// Done, not done, or the definition is still on its way.
function status(step) {
    if (step.pay) {
        var paid = bot.item(step.pay);
        if (paid == null) return null;
        if (paid > 0) return "done";
    }
    if (step.side) {
        if (bot.memory["done" + step.id]) return "done";
    } else {
        var done = bot.quest.done(step.id);
        if (done == null) return null;
        if (done) return "done";
    }
    // A hand-in this run sent leaves the tracker before its reward lands, so
    // the tracker is the finish, not the bag.
    if (bot.memory["sent" + step.id] && !bot.quest.active(step.id)) {
        bot.memory["done" + step.id] = true;
        return "done";
    }
    return bot.quest.active(step.id) ? "active" : "todo";
}

for (var i = 0; i < ORDER.length; i++) {
    var step = ORDER[i];
    var state = status(step);
    if (state == null) return;
    if (state === "done") continue;

    if (bot.memory.at !== step.id) {
        bot.memory.at = step.id;
        bot.log("brightoak-story: quest " + step.id);
    }
    act(step);
    return;
}

bot.log("brightoak-story: done");
return true;
