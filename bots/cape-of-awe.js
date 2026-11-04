/// name: Cape of Awe
/// desc: Rank 10 Awe, Binky in the DoomVault, and the museum merge.
/// once: true
/// timeout: 30

// The cape is the cheapest Awe relic: one shard, one fragment, one merge. The
// work is the gate around it - the pass, the reputation, and the DoomVault
// cells, whose r4 and r5 want chain 126 at 3.
var CAPE = 29375;
var RELIC = 29401;
var FRAGMENT = 29394;
var MERGE = 1129;
var CHAIN = 126;

// One leg per account, with the numbers the quest data holds: the member quest
// wants no reputation, the Guardian one 44,100, and the free one 302,500.
var LEG = {
    guardian: { quest: 4179, rep: 44100, level: 35, pass: 29403,
                map: "tower", shop: 53 },
    member:   { quest: 4178, rep: 0, level: 1, pass: 29402,
                map: "museum", shop: 1130 },
    free:     { quest: 4180, rep: 302500, level: 55, pass: 29404,
                map: "museum", shop: 1130 }
};

// DoomVault, in the order its chain opens. Each leg fights in the cell its own
// value unlocks: value 1 is r1, 2 is r2, 3 is r3.
var STORY = [
    { id: 2952, cell: "r1", monster: "Grim Soldier" },
    { id: 2953, cell: "r2", monster: "Grim Fighter" },
    { id: 2954, cell: "r3", monster: "Grim Fire Mage" }
];

var BINKY = ["r5", "Left"];
var OPEN = 3;

function mergeRelic() {
    if (!bot.travel("museum")) return;
    bot.buy(MERGE, RELIC);
}

// The relic is in the bag: one merge left, then the run is over.
function mergeCape() {
    if (!bot.travel("museum")) return;
    if (!bot.buy(MERGE, CAPE)) return;
    bot.finish("cape-of-awe: merged");
}

var cape = bot.item(CAPE);
if (cape == null) return;
if (cape > 0) {
    bot.finish("cape-of-awe: already held");
    return true;
}

// A fragment or a relic already in the bag is a finished fight; only the
// merges are left.
var relic = bot.item(RELIC);
if (relic == null) return;
if (relic > 0) {
    mergeCape();
    return;
}

var fragment = bot.item(FRAGMENT);
if (fragment == null) return;
if (fragment > 0) {
    mergeRelic();
    return;
}

// The game picks the leg from the account, so the script does the same.
if (bot.guardian == null || bot.member == null || bot.level == null) return;

var leg = bot.guardian ? LEG.guardian : (bot.member ? LEG.member : LEG.free);

if (bot.level < leg.level) {
    bot.fail("cape-of-awe: the " + (bot.guardian ? "Guardian" : (bot.member ? "member" : "free"))
        + " leg wants level " + leg.level + "; this hero is " + bot.level);
    return;
}

var faction = bot.rep("Blade of Awe");
if (faction == null) return;
if (faction.rep < leg.rep) {
    bot.fail("cape-of-awe: quest " + leg.quest + " wants " + leg.rep
        + " Blade of Awe reputation; this hero has " + faction.rep);
    return;
}

var pass = bot.item(leg.pass);
if (pass == null) return;
if (pass < 1) {
    if (!bot.travel(leg.map)) return;
    if (!bot.buy(leg.shop, leg.pass)) return;
}

// The cape fight is behind the DoomVault cells, and they open in the order the
// chain is written, so a short chain is finished first rather than bounced.
var chain = bot.quest.value(CHAIN);
if (chain == null) return;

for (var i = 0; i < STORY.length; i++) {
    if (chain >= i + 1) continue;
    if (!bot.quest.farm(STORY[i].id, STORY[i].monster, "doomvault", STORY[i].cell, "Left")) return;
    return;
}

if (!bot.quest.farm(leg.quest, "Binky", "doomvault", BINKY[0], BINKY[1])) return;
