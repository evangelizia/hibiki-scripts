/// name: Seavoice Vigil
/// desc: Voice in the Sea with Vigil on the slumber cue, party included.
/// once: false
/// timeout: 30

// God of the Depths / Voice in the Sea wipes on Nightmare Slumber unless the
// Vigil buff is up. The boss yells first ("You cannot resist"), so the buff
// is timed to the cue, not spammed.
//
// Fill these from the DUMPER: open the seavoice shop, copy its ShopID and the
// Vigil ItemID. Followers get the same pair via bot.followers.buy.
var VIGIL_SHOP = 0;
var VIGIL_ITEM = 0;
// How many Vigil each follower must hold before the fight starts.
var VIGIL_EACH = 5;

var BOSS = "Voice in the Sea";
var MAP = "seavoice";
var CELL = "r2";
var PAD = "Right";
var CUE = "you cannot resist";

if (VIGIL_SHOP <= 0 || VIGIL_ITEM <= 0) {
    bot.fail("set VIGIL_SHOP/VIGIL_ITEM from DUMPER shop (seavoice)");
    return;
}

if (!bot.travel(MAP)) return;
if (!bot.moveToCell(CELL, PAD)) return;

// Leader holds one; followers hold VIGIL_EACH. Skipped when no army.
if (!bot.buy(VIGIL_SHOP, VIGIL_ITEM)) return;
if (!bot.followers.buy(VIGIL_SHOP, VIGIL_ITEM, VIGIL_EACH)) return;

// Cue-timed buff: leader and party use on the same tick the yell lands.
// bot.cue is fresh (8s), so last fight's yell cannot fire this one.
if (bot.cue(CUE)) {
    bot.use(VIGIL_ITEM);
    bot.followers.use(VIGIL_ITEM);
}

if (!bot.kill(BOSS, 1)) return;
if (!bot.pickDrop()) return;
return true;
