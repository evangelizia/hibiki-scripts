/// name: Seavoice Vigil
/// desc: Voice in the Sea with Vigil on the slumber cue, party included.
/// once: false
/// timeout: 30

// God of the Depths / Voice in the Sea wipes on Nightmare Slumber unless the
// Vigil buff is up. The boss yells "You will not resist!" first, so the buff
// is timed to the cue, not spammed. Shop 2320 ("SeaVoice Merge"), item 78994,
// equipped to the potion slot then fired as skill 5 until the Vigil aura
// lands - the same shape as CoreAOR.FightVoiceInTheSea (buy, equip,
// UseSkill(5)).
var VIGIL_SHOP = 2320;
var VIGIL_ITEM = 78994;
// How many Vigil each follower must hold before the fight starts.
var VIGIL_EACH = 5;

var BOSS = "Voice in the Sea";
var MAP = "seavoice";
var CELL = "r2";
var PAD = "Right";
var CUE = "you will not resist";

if (!bot.travel(MAP)) return;
if (!bot.moveToCell(CELL, PAD)) return;

// Leader holds one; followers hold VIGIL_EACH. Skipped when no army.
if (!bot.buy(VIGIL_SHOP, VIGIL_ITEM)) return;
if (!bot.followers.buy(VIGIL_SHOP, VIGIL_ITEM, VIGIL_EACH)) return;
// Seat it in the potion slot; use() casts slot 5 and refuses otherwise.
if (!bot.equip(VIGIL_ITEM)) return;
if (!bot.followers.equip(VIGIL_ITEM)) return;

// Cue-timed buff: leader and party use on the same tick the yell lands.
// bot.cue is fresh (8s), so last fight's yell cannot fire this one.
if (bot.cue(CUE)) {
    bot.use(VIGIL_ITEM);
    bot.followers.use(VIGIL_ITEM);
}

if (!bot.kill(BOSS, 1)) return;
if (!bot.pickDrop()) return;
return true;
