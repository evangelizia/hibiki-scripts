/// name: Mogloween Story
/// desc: The complete Mogloween saga, Candy Craze to the Crossroads.
/// once: true
/// timeout: 300

// The Mogloween chain lives on one quest slot per era, and most legs are
// repeatable, so a finished leg stays done and an unfinished one is simply
// walked again. Progress is the tracker plus the slot, never memory alone.
var ORDER = [95,96,93,94,97,98,99,391,392,393,394,395,396,397,398,399,400,401,871,872,873,874,875,876,877,878,1355,1356,1357,1358,1359,1360,1361,1362,1363,2454,2455,2456,2457,2458,2459,2460,2461,2462,2463,2464,2465,2466,3833,3834,3835,3836,3837,3838,3839,3840,3841,3842,3843,3844,3845,4570,4571,5418,5419,5420,5421,5422,5423,5424,5425,5426,5427,6531,6532,6533,6534,6535,6536,6537,6538,6568,6569,6570,6571,6572,6573,6574,6575,6576,6577,6578,6579,7139,7140,7141,7142,7143,7144,7145,7146,7147,7148,7149,7150,7151,7152,7153,7154,7167,7168,7169,7170,7171,7172,7173,7174,7175,7176,7177,7178,7179,8363,8364,8365,8366,8367,8368,8369,8370,8371,8372,8373,8374,8926,8927,8928,8929,8930,8931,8932,8933,8934,8935,9445,9446,9447,9448,9449,9450,9451,9452,9453,9454,10444,10445,10446,10447,10448,10449,10450,10451,10452,10453,10465,10466,10467,10469,10470,10471,10472,10473,10474,10475,10476,10477,10478,10896,10897,10898,10899,10900,10901,10902,10903,10904,10905,10908,10909,10910,10911,10912,10913,10914,10915,10916,10921,10922,10923,10924,10925,10926,10927,10928,10929,10930];

// Bag id to the monster that pays it. Cells come from a live room dump;
// the pad is left off on purpose, the cell alone is the arrival.
var SOURCE = {
    454: { monster: "Pumpkinhead Fred", map: "mogloween", cell: "House1" },
    459: { monster: "Ghostly Sheet", map: "mogloween", cell: "House1" },
    460: { monster: "Pumpkinhead Fred", map: "mogloween", cell: "House1" },
    461: { monster: "Pumpkinhead Fred", map: "mogloween", cell: "House1" },
    462: { monster: "Jack-O-Doom", map: "mogloween", cell: "Pit2" },
    463: { monster: "Blister", map: "mogloween", cell: "Pit1" },
    2112: { monster: "Great Pumpkin King", map: "mogloween", cell: "mogEnd" },
    2113: { monster: "Graveyard Soldier", map: "mogloweengrave", cell: "Enter" },
    2114: { monster: "Graveyard Werewolf", map: "mogloweengrave", cell: "r1" },
    2115: { monster: "Thriller", map: "mogloweengrave", cell: "r3" },
    2170: { monster: "Dark Moglinster", map: "candyshop", cell: "r2" },
    2171: { monster: "Sugarrush Ghoul", map: "candyshop", cell: "Enter" },
    2172: { monster: "Super Moglinster", map: "candyshop", cell: "r4" },
    2194: { monster: "Dark Moglinster", map: "candyshop", cell: "r2" },
    2195: { monster: "Moglinsterbot", map: "voltabolt", cell: "Enter" },
    2196: { monster: "Moglinsterbot", map: "voltabolt", cell: "Enter" },
    2197: { monster: "Nightmare Dentist Chair", map: "voltabolt", cell: "r1" },
    2198: { monster: "Nightmare Dentist Chair", map: "voltabolt", cell: "r1" },
    2200: { monster: "Dental Driller", map: "voltabolt", cell: "r3" },
    6178: { monster: "Candy Kid", map: "candycorn", cell: "r2" },
    6179: { monster: "Candy Kid", map: "candycorn", cell: "r2" },
    6181: { monster: "Malik-EYE", map: "candycorn", cell: "r5" },
    6182: { monster: "Field Guardian", map: "candycorn", cell: "r6" },
    6183: { monster: "EYE-Sac", map: "candycorn", cell: "r8" },
    6184: { monster: "Stalkwalker", map: "candycorn", cell: "r9" },
    9736: { monster: "Gourdo", map: "pie", cell: "r4" },
    9739: { monster: "Gourdo", map: "pie", cell: "r4" },
    9741: { monster: "Gourdo", map: "pie", cell: "r4" },
    9742: { monster: "Gourdo", map: "pie", cell: "r4" },
    9747: { monster: "Myst Imp", map: "pie", cell: "r4" },
    14490: { monster: "Insane Ghoul", map: "mirrormaze", cell: "f6" },
    14493: { monster: "Insane Ghoul", map: "mirrormaze", cell: "f6" },
    14501: { monster: "Scorpion Cultist", map: "catacombs", cell: "Frame1" },
    14503: { monster: "Scorpion Cultist", map: "catacombs", cell: "Frame1" },
    14506: { monster: "Dr. De'Sawed", map: "catacombs", cell: "Frame6" },
    14507: { monster: "Dr. De'Sawed", map: "catacombs", cell: "Boss2" },
    26341: { monster: "Bookcase", map: "poehub", cell: "Enter" },
    26349: { monster: "Bookcase", map: "crusher", cell: "r6" },
    26350: { monster: "Gothic Chest", map: "crusher", cell: "r3" },
    26351: { monster: "Gothic Chest", map: "crusher", cell: "r3" },
    26352: { monster: "Gothic Chest", map: "crusher", cell: "r3" },
    26353: { monster: "Gothic Chest", map: "crusher", cell: "r3" },
    26354: { monster: "Apparition", map: "crusher", cell: "r2" },
    26356: { monster: "Bookcase", map: "crusher", cell: "r6" },
    26357: { monster: "Moglinberry Vines", map: "cask", cell: "r1" },
    26358: { monster: "Fire Performer", map: "cask", cell: "r1" },
    26359: { monster: "Cellar Spider", map: "cask", cell: "r6" },
    26360: { monster: "Nitre Golem", map: "cask", cell: "r5" },
    31462: { monster: "Bone Terror", map: "cask", cell: "Boss" },
    31463: { monster: "Macabre Sepulchure", map: "wyvern", cell: "Enter" },
    36846: { monster: "Eerie Apparition", map: "mystcroftforest", cell: "r2" },
    36847: { monster: "Eerie Apparition", map: "mystcroftforest", cell: "r2" },
    36849: { monster: "Eerie Apparition", map: "mystcroftforest", cell: "r2" },
    36852: { monster: "Grim Goblin", map: "mystcroftforest", cell: "r2" },
    36853: { monster: "Void Phoenix", map: "timevoid", cell: "Frame3" },
    36854: { monster: "Moonstone", map: "skytower", cell: "r3" },
    36855: { monster: "Sunstone", map: "skytower", cell: "r3" },
    36856: { monster: "Star Sapphire", map: "skytower", cell: "r3" },
    36858: { monster: "Barghest", map: "mystcroftforest", cell: "r5a" },
    36914: { monster: "Grim Goblin", map: "mystcroftforest", cell: "r2" },
    36915: { monster: "Eerie Apparition", map: "mystcroftforest", cell: "r2" },
    36916: { monster: "Grim Goblin", map: "mystcroftforest", cell: "r2" },
    45184: { monster: "Colorless Drone", map: "chromafection", cell: "r10" },
    45186: { monster: "Free Samples", map: "chromafection", cell: "r10" },
    45189: { monster: "Chromafection", map: "chromafection", cell: "r13" },
    45190: { monster: "Chromafection", map: "chromafection", cell: "r13" },
    45473: { monster: "SCOTTY SNEEVIL", map: "twigsarcade", cell: "r2" },
    45476: { monster: "SCOTTY SNEEVIL", map: "twigsarcade", cell: "r2" },
    45477: { monster: "SCOTTY SNEEVIL", map: "twigsarcade", cell: "r2" },
    45478: { monster: "Scotty Sneevil", map: "twigsarcade", cell: "r2" },
    45479: { monster: "Ectoplasm", map: "twigsarcade", cell: "r2" },
    45481: { monster: "SCOTTY SNEEVIL", map: "twigsarcade", cell: "r2" },
    45482: { monster: "Cweepy Twig", map: "twigsarcade", cell: "r5" },
    45483: { monster: "Spirit Residue", map: "twigsarcade", cell: "r5" },
    45484: { monster: "Swarmer", map: "twigsarcade", cell: "r2" },
    45485: { monster: "Cweepy Twilly", map: "twigsarcade", cell: "r6" },
    45487: { monster: "Baby", map: "twigsarcade", cell: "r8" },
    50608: { monster: "Harried Waiter", map: "masquerade", cell: "Ballroom" },
    50609: { monster: "Garden Sprite", map: "masquerade", cell: "r12" },
    50610: { monster: "Kitchen Brownie", map: "masquerade", cell: "r6" },
    50617: { monster: "Glowshroom", map: "masquerade", cell: "r13" },
    50618: { monster: "Garden Sprite", map: "masquerade", cell: "r12" },
    50619: { monster: "Fae Treeant", map: "masquerade", cell: "r12" },
    50621: { monster: "Glass Spitter", map: "masquerade", cell: "r12" },
    50623: { monster: "Garden Sprite", map: "masquerade", cell: "r12" },
    50624: { monster: "Fae Treeant", map: "masquerade", cell: "r12" },
    50625: { monster: "Wandering Guest", map: "masquerade", cell: "Ballroom" },
    50626: { monster: "Scriptkeeper", map: "masquerade", cell: "r10a" },
    50628: { monster: "Aermhar", map: "masquerade", cell: "r11a" },
    50778: { monster: "Candy Goblin", map: "that", cell: "Enter" },
    50780: { monster: "Moglinster", map: "that", cell: "r2a" },
    50781: { monster: "Mystcroft Ghost", map: "that", cell: "Enter" },
    50782: { monster: "Will o' The Wisp", map: "that", cell: "r2a" },
    50784: { monster: "Well Spider", map: "that", cell: "r5" },
    50785: { monster: "Congealed Fear", map: "that", cell: "r5" },
    50788: { monster: "Congealed Fear", map: "that", cell: "r5" },
    50790: { monster: "Echo of That", map: "that", cell: "r10" },
    50791: { monster: "Shattered Hope", map: "that", cell: "r10" },
    50792: { monster: "Blacklights", map: "that", cell: "r12a" },
    50793: { monster: "That", map: "that", cell: "r13" },
    65128: { monster: "Gummy Tapeworm", map: "necrocarnival", cell: "Enter" },
    65130: { monster: "Skeleclown", map: "necrocarnival", cell: "r10" },
    65131: { monster: "Mooch Treeant", map: "necrocarnival", cell: "Enter" },
    65132: { monster: "Gummy Tapeworm", map: "necrocarnival", cell: "Enter" },
    65134: { monster: "Skeleclown", map: "necrocarnival", cell: "r10" },
    65136: { monster: "Mooch Treeant", map: "necrocarnival", cell: "Enter" },
    65138: { monster: "Cotton Tick", map: "necrocarnival", cell: "r5" },
    65140: { monster: "Gummy Tapeworm", map: "necrocarnival", cell: "Enter" },
    65142: { monster: "Mooch Treeant", map: "necrocarnival", cell: "Enter" },
    65143: { monster: "Gummy Tapeworm", map: "necrocarnival", cell: "Enter" },
    65144: { monster: "Mooch Treeant", map: "necrocarnival", cell: "Enter" },
    65145: { monster: "Skeleclown", map: "necrocarnival", cell: "r10" },
    65147: { monster: "Cotton Tick", map: "necrocarnival", cell: "r5" },
    65150: { monster: "Skeleclown", map: "necrocarnival", cell: "r10" },
    65151: { monster: "Deva", map: "necrocarnival", cell: "r11" },
    73459: { monster: "Playful Ghost", map: "tricktown", cell: "r2" },
    73462: { monster: "Decay Spirit", map: "tricktown", cell: "r3" },
    73464: { monster: "Playful Ghost", map: "tricktown", cell: "r2" },
    73465: { monster: "Trick or Treater", map: "trickortreat", cell: "Enter" },
    73466: { monster: "Rotting Pumpkin", map: "tricktown", cell: "r2" },
    73469: { monster: "Decay Spirit", map: "tricktown", cell: "r3" },
    73470: { monster: "Decay Spirit", map: "tricktown", cell: "r3" },
    73471: { monster: "Playful Ghost", map: "tricktown", cell: "r2" },
    73473: { monster: "Rotting Mound", map: "tricktown", cell: "r7" },
    73474: { monster: "Rotting Mound", map: "tricktown", cell: "r7" },
    73476: { monster: "Madam Ester", map: "tricktown", cell: "r10" },
    81164: { monster: "Luminous Fungus", map: "cursedcastle", cell: "r2" },
    81166: { monster: "Noble Gargoyle", map: "cursedcastle", cell: "r9" },
    81170: { monster: "Noble Ghost", map: "cursedcastle", cell: "r3" },
    81175: { monster: "Bone Dragonling", map: "cursedcastle", cell: "r6" },
    81177: { monster: "Noble Ghost", map: "cursedcastle", cell: "r3" },
    81179: { monster: "Dragonlord Coledale", map: "cursedcastle", cell: "r8" },
    81181: { monster: "Noble Gargoyle", map: "cursedcastle", cell: "r9" },
    81183: { monster: "Unborn Brood", map: "cursedcastle", cell: "r10" },
    96239: { monster: "Living Pumpkin", map: "eldritchbattletown", cell: "Enter" },
    96241: { monster: "Dzeza Sapling", map: "eldritchbattletown", cell: "r2" },
    96243: { monster: "Nudibranch", map: "eldritchbattletown", cell: "r3" },
    96248: { monster: "Kathool Kultist", map: "eldritchbattletown", cell: "r4" },
    96250: { monster: "Dzeza Cultist", map: "eldritchbattletown", cell: "r5" },
    96256: { monster: "Harvest Acromegalia", map: "eldritchbattletown", cell: "r10" },
    96418: { monster: "Nudibranch", map: "eldritchworld", cell: "r2" },
    96419: { monster: "Infested Fisherman", map: "eldritchworld", cell: "r3" },
    96420: { monster: "Kathool Cultist", map: "eldritchworld", cell: "r4" },
    96421: { monster: "Dzeza Cultist", map: "eldritchworld", cell: "r5" },
    96422: { monster: "Dzeza Sapling", map: "eldritchworld", cell: "r6" },
    96423: { monster: "Infested Mummy", map: "eldritchworld", cell: "r7" },
    96424: { monster: "Mass of Hair", map: "eldritchworld", cell: "r12" },
    96425: { monster: "Mass of Teeth", map: "eldritchworld", cell: "r10" },
    96428: { monster: "Dzeza the Boundless", map: "eldritchworld", cell: "r13" },
    96541: { monster: "Nudibranch", map: "elodeatemple", cell: "r2" },
    96543: { monster: "Kathool Cultist", map: "elodeatemple", cell: "r3" },
    96545: { monster: "Merdrathoolian", map: "elodeatemple", cell: "r5" },
    96546: { monster: "Riptide Adept", map: "elodeatemple", cell: "r6" },
    96552: { monster: "Sarasa Maiden", map: "elodeatemple", cell: "r8" },
    96553: { monster: "Necroadipocere", map: "elodeatemple", cell: "r9" },
    96554: { monster: "Child of the Depths", map: "elodeatemple", cell: "r10" },
    104234: { monster: "ShadowSlayer", map: "birgittamogloween", cell: "r7" },
    104237: { monster: "Nazarene Artist", map: "birgittamogloween", cell: "r2" },
    104241: { monster: "Lycan Guest", map: "birgittamogloween", cell: "r4" },
    104244: { monster: "Vampiric Guest", map: "birgittamogloween", cell: "r5" },
    104246: { monster: "Nazarene Artist", map: "birgittamogloween", cell: "r2" },
    104247: { monster: "Vampiric Guest", map: "birgittamogloween", cell: "r5" },
    104248: { monster: "Lycan Guest", map: "birgittamogloween", cell: "r4" },
    104249: { monster: "Champion Ensis", map: "birgittamogloween", cell: "r6" },
    104250: { monster: "Alpha Grigor", map: "birgittamogloween", cell: "r6" },
    104518: { monster: "Vampiric Ancestor", map: "shadowslayerwar", cell: "r7" },
    104519: { monster: "Vampiric Ancestor", map: "shadowslayerwar", cell: "r7" },
    104520: { monster: "Darkovia Hunter", map: "shadowslayerwar", cell: "r4" },
    104521: { monster: "Sublime Hunter", map: "shadowslayerwar", cell: "r5" },
    104522: { monster: "Vampiric Ancestor", map: "shadowslayerwar", cell: "r7" },
    104523: { monster: "Werepyre Ancestor", map: "shadowslayerwar", cell: "r10" },
    104524: { monster: "Forest Cultist", map: "shadowslayerwar", cell: "r11" },
    104525: { monster: "Awakened Hunter", map: "shadowslayerwar", cell: "r12" },
    104526: { monster: "ShadowSlayer Z", map: "shadowslayerwar", cell: "r13" },
    104716: { monster: "Druid Revenant", map: "walpurgisnacht", cell: "r2" },
    104717: { monster: "Forest Cultist", map: "walpurgisnacht", cell: "r3" },
    104719: { monster: "Druid Revenant", map: "walpurgisnacht", cell: "r2" },
    104720: { monster: "Forest Cultist", map: "walpurgisnacht", cell: "r3" },
    104722: { monster: "Awakened Hunter", map: "walpurgisnacht", cell: "r5" },
    104725: { monster: "ShadowSlayer G", map: "walpurgisnacht", cell: "r6" },
    104727: { monster: "Bloodlust", map: "walpurgisnacht", cell: "r11" },
    104728: { monster: "Beastly Hunger", map: "walpurgisnacht", cell: "r12" },
    104729: { monster: "Moon's Firstborn", map: "walpurgisnacht", cell: "r10" },
    104730: { monster: "The Gentleman", map: "walpurgisnacht", cell: "r13" },
};

// Quests whose items sit in the map rather than on a monster. One request
// per pass, rotating the spots; the quest wants decide when the leg ends.
var GROUND = {
    395: { map: "candyshop", spots: [69] },
    871: { map: "candycorn", spots: [193] },
    874: { map: "candycorn", spots: [194] },
    1356: { map: "pie", spots: [654] },
    1358: { map: "pie", spots: [655] },
    1360: { map: "pie", spots: [656] },
    1361: { map: "pie", spots: [658] },
    1363: { map: "willowcreek", spots: [657] },
    2455: { map: "mirrormaze", spots: [1522] },
    2456: { map: "mirrormaze", spots: [1523] },
    2458: { map: "mirrormaze", spots: [1524] },
    2459: { map: "catacombs", spots: [1525,1526,1527,1528,1529,1530] },
    2461: { map: "catacombs", spots: [1531] },
    2463: { map: "catacombs", spots: [1532] },
    2464: { map: "catacombs", spots: [1533] },
    3835: { map: "crusher", spots: [2941,2942,2943] },
    3837: { map: "crusher", spots: [2944] },
    3841: { map: "cask", spots: [2945] },
    3843: { map: "cask", spots: [2952] },
    3844: { map: "cask", spots: [2946] },
    3845: { map: "cask", spots: [2953] },
    5421: { map: "mystcroftforest", spots: [4801] },
    5422: { map: "mystcroftforest", spots: [4802] },
    5426: { map: "mystcroftforest", spots: [4800] },
    6531: { map: "chromafection", spots: [6004] },
    6533: { map: "chromafection", spots: [6006] },
    6535: { map: "chromafection", spots: [6007] },
    6536: { map: "chromafection", spots: [6005] },
    6569: { map: "twigsarcade", spots: [6069,6070] },
    6572: { map: "twigsarcade", spots: [6071] },
    6578: { map: "twigsarcade", spots: [6072] },
    7142: { map: "masquerade", spots: [6779,6780,6781,6782,6783] },
    7143: { map: "masquerade", spots: [6784] },
    7147: { map: "masquerade", spots: [6785] },
    7148: { map: "masquerade", spots: [6786] },
    7152: { map: "masquerade", spots: [6789] },
    7153: { map: "masquerade", spots: [6787] },
    7167: { map: "that", spots: [6790] },
    7171: { map: "that", spots: [6791] },
    7174: { map: "that", spots: [6792,6793] },
    7175: { map: "that", spots: [6794] },
    8363: { map: "necrocarnival", spots: [9249] },
    8364: { map: "necrocarnival", spots: [9250] },
    8365: { map: "necrocarnival", spots: [9251] },
    8366: { map: "necrocarnival", spots: [9252] },
    8367: { map: "necrocarnival", spots: [9253] },
    8368: { map: "necrocarnival", spots: [9254] },
    8369: { map: "necrocarnival", spots: [9255] },
    8371: { map: "necrocarnival", spots: [9256] },
    8372: { map: "necrocarnival", spots: [9257] },
    8373: { map: "necrocarnival", spots: [9258] },
    8926: { map: "tricktown", spots: [10813] },
    8927: { map: "tricktown", spots: [10804] },
    8928: { map: "tricktown", spots: [10805] },
    8930: { map: "tricktown", spots: [10806] },
    8931: { map: "tricktown", spots: [10807] },
    8933: { map: "tricktown", spots: [10808] },
    8934: { map: "tricktown", spots: [10809] },
    9445: { map: "cursedcastle", spots: [12272] },
    9446: { map: "cursedcastle", spots: [12273] },
    9447: { map: "cursedcastle", spots: [12274,12275] },
    9448: { map: "cursedcastle", spots: [12276] },
    9449: { map: "cursedcastle", spots: [12277,12278,12279] },
    9450: { map: "cursedcastle", spots: [12280] },
    9451: { map: "cursedcastle", spots: [12281] },
    9452: { map: "cursedcastle", spots: [12282] },
    9453: { map: "cursedcastle", spots: [12283] },
    10444: { map: "eldritchbattletown", spots: [15040] },
    10445: { map: "eldritchbattletown", spots: [15041] },
    10446: { map: "eldritchbattletown", spots: [15042] },
    10447: { map: "eldritchbattletown", spots: [15047] },
    10449: { map: "eldritchbattletown", spots: [15043] },
    10451: { map: "eldritchbattletown", spots: [15044,15045,15046] },
    10470: { map: "elodeatemple", spots: [15090] },
    10473: { map: "elodeatemple", spots: [15091] },
    10475: { map: "elodeatemple", spots: [15092,15093] },
    10897: { map: "birgittamogloween", spots: [16281,16282] },
    10899: { map: "birgittamogloween", spots: [16283,16284,16285] },
    10901: { map: "birgittamogloween", spots: [16286,16287] },
    10903: { map: "birgittamogloween", spots: [16288] },
    10921: { map: "walpurgisnacht", spots: [16340] },
    10922: { map: "walpurgisnacht", spots: [16341] },
    10923: { map: "walpurgisnacht", spots: [16342] },
    10924: { map: "walpurgisnacht", spots: [16343] },
    10926: { map: "walpurgisnacht", spots: [16344] },
};

// Items no monster drops: the reward of another quest. 10465 is the case,
// its eight reagents come from eight repeatable quests in the same map.
var PRODUCE = {
    96429: 10458,
    96430: 10459,
    96431: 10460,
    96432: 10461,
    96433: 10462,
    96434: 10463,
    96435: 10468,
    96436: 10464,
};

// Legs with several monsters and no item names to pair them by. The run
// rotates the monsters instead of guessing which one pays which bag.
var MULTI = {
    10448: [{ monster: "Nudibranch", map: "eldritchbattletown", cell: "r3" }, { monster: "Dzeza Sapling", map: "eldritchbattletown", cell: "r2" }],
    10452: [{ monster: "Kathool Kultist", map: "eldritchbattletown", cell: "r4" }, { monster: "Dzeza Cultist", map: "eldritchbattletown", cell: "r5" }],
    10466: [{ monster: "Mass of Teeth", map: "eldritchworld", cell: "r10" }, { monster: "Mass of Hair", map: "eldritchworld", cell: "r12" }],
    10471: [{ monster: "Nudibranch", map: "elodeatemple", cell: "r2" }, { monster: "Kathool Cultist", map: "elodeatemple", cell: "r3" }],
    10474: [{ monster: "Riptide Adept", map: "elodeatemple", cell: "r6" }, { monster: "Merdrathoolian", map: "elodeatemple", cell: "r5" }],
};

// One map-item request per pass, two seconds apart. The rotation is the
// queue: the pass after a request moves to the next spot, and the quest
// wants are the only thing that ends the leg.
var PACE = 2000;
var SWEEPS = 600;

function ground(id) {
    var g = GROUND[id];
    if (g == null) { bot.fail("quest " + id + " wants an item no step gives"); return false; }
    var key = "ground" + id;
    var wants = bot.quest.wants(id);
    var counts = "";
    var open = false;
    for (var i = 0; wants != null && i < wants.length; i++) {
        counts += wants[i].have + "/" + wants[i].need + " ";
        if (wants[i].have < wants[i].need) open = true;
    }
    if (bot.memory[key + "have"] != counts) { bot.memory[key + "have"] = counts; bot.memory[key] = 0; }
    if (!open) return true;
    var sweeps = (bot.memory[key] || 0) + 1;
    bot.memory[key] = sweeps;
    if (sweeps > SWEEPS) { bot.fail("quest " + id + " took nothing from " + g.map); return false; }
    var now = Date.now();
    if (now - (bot.memory[key + "at"] || 0) < PACE) return false;
    bot.memory[key + "at"] = now;
    var at = bot.memory[key + "n"] || 0;
    bot.memory[key + "n"] = at + 1;
    for (var j = 0; j < g.spots.length; j++) {
        var spot = g.spots[(at + j) % g.spots.length];
        if (!bot.travel(g.map)) return false;
        bot.mapItem(spot, 1);
        return false;
    }
    return false;
}

// Where one wanted item comes from, one action per pass. The kill is one
// at a time so a floor drop is picked up before the next swing; a quest
// item needs no pickup and the extra call answers at once.
function source(id, want) {
    var from = SOURCE[want.id];
    if (from == null) {
        if (PRODUCE[want.id] != null) { act(PRODUCE[want.id]); return; }
        if (GROUND[id] != null) { ground(id); return; }
        bot.fail("item " + want.id + " has no source in this run");
        return;
    }
    if (!bot.travel(from.map)) return;
    if (!bot.moveToCell(from.cell)) return;
    if (!bot.kill(from.monster, 1)) return;
    if (!bot.pickDrop()) return;
}

// A leg whose monsters cannot be paired to bags by name. Rotate them, one
// kill per pass; the quest wants are the only thing that ends the leg.
function each(id) {
    var list = MULTI[id];
    if (list == null || list.length === 0) { bot.fail("quest " + id + " has no monsters in this run"); return; }
    var n = bot.memory["each" + id] || 0;
    var from = list[n % list.length];
    if (!bot.travel(from.map)) return;
    if (!bot.moveToCell(from.cell)) return;
    if (!bot.kill(from.monster, 1)) return;
    if (!bot.pickDrop()) return;
    bot.memory["each" + id] = n + 1;
}

function act(id) {
    if (!bot.quest.active(id)) {
        var tries = (bot.memory["try" + id] || 0) + 1;
        bot.memory["try" + id] = tries;
        if (tries > 900) { bot.fail("quest " + id + " never started"); return; }
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
    if (MULTI[id] != null) { each(id); return; }
    var spotOpen = false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have >= wants[i].need) continue;
        if (SOURCE[wants[i].id] != null || PRODUCE[wants[i].id] != null) { source(id, wants[i]); return; }
        spotOpen = true;
    }
    if (spotOpen && GROUND[id] != null) { ground(id); return; }
    for (var k = 0; k < wants.length; k++) {
        if (wants[k].have < wants[k].need) { source(id, wants[k]); return; }
    }
}

function status(id) {
    if (bot.memory["done" + id]) return "done";
    var done = bot.quest.done(id);
    if (done == null) return null;
    if (done) return "done";
    if (bot.memory["sent" + id] && !bot.quest.active(id)) { bot.memory["done" + id] = true; return "done"; }
    return bot.quest.active(id) ? "active" : "todo";
}

for (var i = 0; i < ORDER.length; i++) {
    var id = ORDER[i];
    var state = status(id);
    if (state == null) return;
    if (state === "done") continue;
    if (bot.memory.at !== id) { bot.memory.at = id; bot.log("mogloween: quest " + id); }
    act(id);
    return;
}

bot.log("mogloween: done");
return true;
