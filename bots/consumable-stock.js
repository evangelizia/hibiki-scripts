/// name: Consumable Stock
/// desc: Stocks Fate Tonics, Potent Honor Potions, Potent Battle Elixirs and Scrolls of Enrage for the whole army.
/// tags: consumable, alchemy, potion, scroll, army
/// timeout: 25

// What Champion Drakath drinks and burns. Ten of each potion is ten runs; the
// scroll quest pays forty a hand-in, so twenty scrolls cost one ink.
var FATE = 11683;
var HONOR = 11736;
var BATTLE = 11741;
var SCROLL = 12917;

var FATE_WANT = 10;
var HONOR_WANT = 10;
var BATTLE_WANT = 10;
var SCROLL_WANT = 20;

// Each leg of the run has its own map. The academy sells the vouchers, the
// runestones and the finished potent potions; the bench sells the reagent
// packs and runs the mix; the ink for the scroll quest is on its own map.
var ACADEMY = "alchemyacademy";
var BENCH = "alchemy";
var SPELL = "spellcraft";

var SHOP = 2036;        // Gold Vouchers, and the two potent potions
var RUNES = 395;        // Dragon Runestones, one 100k voucher each
var REAGENTS = 397;     // Arashtite Ore and Dried Slime, one runestone a pack
var INK_SHOP = 622;     // Zealous Ink

var VOUCHER_100K = 62749;
var VOUCHER_500K = 61043;
var STONE = 7132;
var ORE = 11473;
var SLIME = 11474;
var INK = 13286;
var SCROLL_QUEST = 2330;

// Gebo is rank 8 and covers the Fate tonic and both potent recipes. The trait
// is a bias, not a promise: the reagent pair picks the family and the recipe
// quest rolls the variant, so the loop below counts potions, not recipes.
var RUNE = "Gebo";
var TRAIT = "Luc";
var PER_MIX = 7;        // the leanest Fate hand-in seen is 7, sometimes 8

// The potent tier is bought, not brewed: its Chaoroot comes from Nulgath's
// merge shop at a Diamond a pack, which is a farm of its own. The academy's
// Fate tonic is 200k of vouchers apiece, and brewing one is about 40k, so Fate
// is the one that is worth the bench.
var HONOR_BUY = 5;              // five a purchase, one 500k voucher, Good rank 10
var BATTLE_BUY = 8;             // eight a purchase, four 500k vouchers
var BATTLE_VOUCHERS = 4;
var VOUCHER_GOLD = 500000;

// A shop refuses a send past the engine's own limit of eight, so a chunk stays
// under it: one slow answer inside a full chunk would end the run.
var CHUNK = 6;

/**
 * One shop step, stepped in chunks of eight. A shop answers a handful of sends
 * before it refuses one, so the ask climbs eight items at a time and the chunk
 * already reached is remembered across passes.
 */
function buyTo(shop, item, want) {
    if (want <= 0) return true;
    var key = "buy_" + shop + "_" + item;
    var goal = Math.min(want, (bot.memory[key] || 0) + CHUNK);
    if (!bot.buy(shop, item, goal)) return false;
    bot.memory[key] = goal;
    return goal >= want;
}

/** The same on every online follower. No followers reads exactly like solo. */
function armyBuyTo(shop, item, want) {
    if (bot.followers.count == 0 || want <= 0) return true;
    var key = "army_" + shop + "_" + item;
    var goal = Math.min(want, (bot.memory[key] || 0) + CHUNK);
    if (!bot.followers.buy(shop, item, goal)) return false;
    bot.memory[key] = goal;
    return goal >= want;
}

function have(id) {
    return bot.item(id) || 0;
}

/**
 * A faction this character never earned is not reported at all, and waiting
 * for it would hang the run. Give the client a few passes, then say what is
 * missing instead of letting a buy refuse with a bare item id.
 */
function repAtLeast(name, want) {
    var rep = bot.rep(name);
    if (rep != null) return rep.rep >= want;
    var key = "rep_" + name;
    var waited = (bot.memory[key] || 0) + 1;
    bot.memory[key] = waited;
    if (waited > 20) {
        bot.fail(name + " is not on this character; needs " + want + " rep");
    }
    return false;
}

// The academy leg: every currency the rest of the run spends is bought here,
// on the leader and on the army, before anything leaves this map.
if ((bot.memory.leg || "academy") == "academy") {
    bot.followers.together();

    var fateShort = Math.max(0, FATE_WANT - have(FATE));
    var mixes = Math.ceil(fateShort / PER_MIX);
    var packs = Math.ceil(mixes / 2);
    var stones = fateShort > 0 ? mixes + packs * 2 : 0;

    var honorShort = Math.max(0, HONOR_WANT - have(HONOR));
    var battleShort = Math.max(0, BATTLE_WANT - have(BATTLE));
    // A purchase is what the row sells, not what the bag is short of, so the
    // vouchers are counted in whole purchases.
    var vouchers = Math.ceil(honorShort / HONOR_BUY)
        + Math.ceil(battleShort / BATTLE_BUY) * BATTLE_VOUCHERS;
    var bill = Math.ceil(honorShort / HONOR_BUY) * VOUCHER_GOLD
        + Math.ceil(battleShort / BATTLE_BUY) * BATTLE_VOUCHERS * VOUCHER_GOLD
        + stones * 100000;

    if (honorShort > 0 && !repAtLeast("Good", 302500)) return;
    // The army spends its own purses, so this is the leader's share only. It
    // is here to say what the run costs before a shop starts refusing.
    if (bot.gold != null && bot.gold < bill) {
        bot.fail("this run costs about " + bill + " gold, the purse holds " + bot.gold);
        return;
    }
    if (!bot.travel(ACADEMY)) return;

    if (!buyTo(SHOP, VOUCHER_500K, vouchers)) return;
    if (!armyBuyTo(SHOP, VOUCHER_500K, vouchers)) return;

    if (!buyTo(SHOP, HONOR, HONOR_WANT)) return;
    if (!armyBuyTo(SHOP, HONOR, HONOR_WANT)) return;

    // The row sells eight at a time, so ten lands on sixteen. That is the
    // smallest purchase it will take, not a miscount.
    if (!buyTo(SHOP, BATTLE, BATTLE_WANT)) return;
    if (!armyBuyTo(SHOP, BATTLE, BATTLE_WANT)) return;

    if (stones > 0) {
        // A mix spends one ore, one slime and one runestone; a reagent pack is
        // two reagents for one runestone, and every voucher is one runestone.
        if (!buyTo(SHOP, VOUCHER_100K, stones)) return;
        if (!armyBuyTo(SHOP, VOUCHER_100K, stones)) return;
        if (!buyTo(RUNES, STONE, stones)) return;
        if (!armyBuyTo(RUNES, STONE, stones)) return;
    }

    bot.memory.leg = "bench";
    return;
}

// The bench leg: the reagent packs are sold here, and so is the time.
if (bot.memory.leg == "bench") {
    bot.followers.together();

    if (have(FATE) < FATE_WANT) {
        var left = FATE_WANT - have(FATE);
        var needed = Math.ceil(left / PER_MIX);

        if (!bot.travel(BENCH)) return;

        if (needed > 0) {
            if (!repAtLeast("Alchemy", 129600)) return;
            if (!buyTo(REAGENTS, ORE, needed)) return;
            if (!armyBuyTo(REAGENTS, ORE, needed)) return;
            if (!buyTo(REAGENTS, SLIME, needed)) return;
            if (!armyBuyTo(REAGENTS, SLIME, needed)) return;
        }

        // One mix a pass. The engine takes the potion off the floor on every
        // account before it answers, so the bag is the count on the next pass.
        if (!bot.craft.alchemy(ORE, SLIME, RUNE, 1, TRAIT)) return;
        return;
    }

    bot.memory.leg = "scroll";
    return;
}

// The scroll leg is the leader's alone: SpellCrafting rep is per account, and
// an account without it cannot buy the ink or take the hand-in. Everyone else
// carries the potions; the taunt is the leader's job anyway.
if (bot.memory.leg == "scroll") {
    bot.followers.apart();

    if (have(SCROLL) < SCROLL_WANT) {
        if (!bot.travel(SPELL)) return;
        if (!repAtLeast("SpellCrafting", 22500)) return;
        if (!buyTo(INK_SHOP, INK, 1)) return;

        if (!bot.quest.active(SCROLL_QUEST)
            && !bot.quest.accept(SCROLL_QUEST)) return;
        if (!bot.quest.ready(SCROLL_QUEST)) return;
        if (!bot.quest.turnIn(SCROLL_QUEST)) return;
        return;
    }

    bot.finish("stocked " + have(FATE) + " Fate, " + have(HONOR) + " Honor, "
        + have(BATTLE) + " Battle, " + have(SCROLL) + " Scroll of Enrage");
    return;
}
