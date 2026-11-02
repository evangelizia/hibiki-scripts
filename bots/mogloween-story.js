/// name: Mogloween Story
/// desc: The complete Mogloween saga, Candy Craze to the Crossroads.
/// once: true
/// timeout: 300

// The Mogloween chain lives on one quest slot per era, and most legs are
// repeatable, so a finished leg stays done and an unfinished one is simply
// walked again. Progress is the tracker plus the slot, never memory alone.
var ORDER = [95,96,93,94,97,98,99,391,392,393,394,395,396,397,398,399,400,401,871,872,873,874,875,876,877,878,1355,1356,1357,1358,1359,1360,1361,1362,1363,2454,2455,2456,2457,2458,2459,2460,2461,2462,2463,2464,2465,2466,3833,3834,3835,3836,3837,3838,3839,3840,3841,3842,3843,3844,3845,4570,4571,5418,5419,5420,5421,5422,5423,5424,5425,5426,5427,6531,6532,6533,6534,6535,6536,6537,6538,6568,6569,6570,6571,6572,6573,6574,6575,6576,6577,6578,6579,7139,7140,7141,7142,7143,7144,7145,7146,7147,7148,7149,7150,7151,7152,7153,7154,7167,7168,7169,7170,7171,7172,7173,7174,7175,7176,7177,7178,7179,8363,8364,8365,8366,8367,8368,8369,8370,8371,8372,8373,8374,8926,8927,8928,8929,8930,8931,8932,8933,8934,8935,9445,9446,9447,9448,9449,9450,9451,9452,9453,9454,10444,10445,10446,10447,10448,10449,10450,10451,10452,10453,10465,10466,10467,10469,10470,10471,10472,10473,10474,10475,10476,10477,10478,10896,10897,10898,10899,10900,10901,10902,10903,10904,10905,10908,10909,10910,10911,10912,10913,10914,10915,10916,10921,10922,10923,10924,10925,10926,10927,10928,10929,10930];

// The slot each quest counts on and the value that marks it done. Done
// is exactly slot >= value, so a watched slot answers whole eras at
// once instead of one quest definition at a time.
var SLOTV = {95:[13,1],96:[13,2],93:[13,3],94:[13,4],97:[13,5],98:[13,6],99:[13,7],391:[13,8],392:[13,9],393:[13,10],394:[13,11],395:[13,12],396:[13,13],397:[13,14],398:[13,15],399:[13,16],400:[13,17],401:[13,18],871:[13,19],872:[13,20],873:[13,21],874:[13,22],875:[13,23],876:[13,24],877:[13,25],878:[13,26],1355:[13,27],1356:[13,28],1357:[13,29],1358:[13,30],1359:[13,31],1360:[13,32],1361:[13,33],1362:[13,34],1363:[13,35],2454:[95,1],2455:[95,2],2456:[95,3],2457:[95,4],2458:[95,5],2459:[95,6],2460:[95,7],2461:[95,8],2462:[95,9],2463:[95,10],2464:[95,11],2465:[95,12],2466:[95,13],3833:[178,1],3834:[178,2],3835:[178,3],3836:[178,4],3837:[178,5],3838:[178,6],3839:[178,7],3840:[178,8],3841:[178,9],3842:[178,10],3843:[178,11],3844:[178,12],3845:[178,13],4570:[178,14],4571:[178,15],5418:[216,1],5419:[216,2],5420:[216,3],5421:[216,4],5422:[216,5],5423:[216,6],5424:[216,7],5425:[216,8],5426:[216,9],5427:[216,10],6531:[282,1],6532:[282,2],6533:[282,3],6534:[282,4],6535:[282,5],6536:[282,6],6537:[282,7],6538:[282,8],6568:[284,1],6569:[284,2],6570:[284,3],6571:[284,4],6572:[284,5],6573:[284,6],6574:[284,7],6575:[284,8],6576:[284,9],6577:[284,10],6578:[284,11],6579:[284,12],7139:[326,1],7140:[326,2],7141:[326,3],7142:[326,4],7143:[326,5],7144:[326,6],7145:[326,7],7146:[326,8],7147:[326,9],7148:[326,10],7149:[326,11],7150:[326,12],7151:[326,13],7152:[326,14],7153:[326,15],7154:[326,16],7167:[328,1],7168:[328,2],7169:[328,3],7170:[328,4],7171:[328,5],7172:[328,6],7173:[328,7],7174:[328,8],7175:[328,9],7176:[328,10],7177:[328,11],7178:[328,12],7179:[328,13],8363:[428,1],8364:[428,2],8365:[428,3],8366:[428,4],8367:[428,5],8368:[428,6],8369:[428,7],8370:[428,8],8371:[428,9],8372:[428,10],8373:[428,11],8374:[428,12],8926:[485,1],8927:[485,2],8928:[485,3],8929:[485,4],8930:[485,5],8931:[485,6],8932:[485,7],8933:[485,8],8934:[485,9],8935:[485,10],9445:[528,1],9446:[528,2],9447:[528,3],9448:[528,4],9449:[528,5],9450:[528,6],9451:[528,7],9452:[528,8],9453:[528,9],9454:[528,10],10444:[621,1],10445:[621,2],10446:[621,3],10447:[621,4],10448:[621,5],10449:[621,6],10450:[621,7],10451:[621,8],10452:[621,9],10453:[621,10],10465:[621,11],10466:[621,12],10467:[621,13],10469:[621,14],10470:[621,15],10471:[621,16],10472:[621,17],10473:[621,18],10474:[621,19],10475:[621,20],10476:[621,21],10477:[621,22],10478:[621,23],10896:[656,1],10897:[656,2],10898:[656,3],10899:[656,4],10900:[656,5],10901:[656,6],10902:[656,7],10903:[656,8],10904:[656,9],10905:[656,10],10908:[656,11],10909:[656,11],10910:[656,12],10911:[656,13],10912:[656,14],10913:[656,15],10914:[656,16],10915:[656,17],10916:[656,18],10921:[656,19],10922:[656,20],10923:[656,21],10924:[656,22],10925:[656,23],10926:[656,24],10927:[656,25],10928:[656,26],10929:[656,27],10930:[656,28]};

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
    counts += "e" + (bot.memory["each" + id] || 0);
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
// A leg whose monsters cannot be paired to bags by name. The kill side
// sticks to one cell until it proves dry, then tries the next cell or
// monster on the list. Progress on any want resets the drought count.
function hunt(id) {
    var list = MULTI[id];
    if (list == null || list.length === 0) { bot.fail("quest " + id + " has no monsters in this run"); return; }
    var wants = bot.quest.wants(id);
    if (wants == null) return;
    var have = 0;
    for (var i = 0; i < wants.length; i++) have += wants[i].have;
    var key = "dry" + id;
    if (have !== bot.memory[key + "have"]) { bot.memory[key + "have"] = have; bot.memory[key] = 0; }
    else {
        var dry = (bot.memory[key] || 0) + 1;
        bot.memory[key] = dry;
        if (dry >= 6 && list.length > 1) {
            bot.memory[key] = 0;
            bot.memory["cell" + id] = (bot.memory["cell" + id] || 0) + 1;
        }
    }
    var n = bot.memory["each" + id] || 0;
    bot.memory["each" + id] = n + 1;
    var ci = bot.memory["cell" + id] || 0;
    var from = list[ci % list.length];
    if (!bot.travel(from.map)) return;
    if (!bot.moveToCell(from.cell)) return;
    if (!bot.kill(from.monster, 1)) return;
    if (!bot.pickDrop()) return;
}

// A leg that needs both kills and map items. Alternate the sticky kill
// side with the spot rotation; either side finishing ends the leg.
function mix(id) {
    var n = bot.memory["mix" + id] || 0;
    bot.memory["mix" + id] = n + 1;
    if (n % 2 === 0) { hunt(id); }
    else { ground(id); }
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
    if (MULTI[id] != null && GROUND[id] != null) { mix(id); return; }
    if (MULTI[id] != null) { hunt(id); return; }
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
    var sv = SLOTV[id];
    if (sv != null) {
        var v = bot.quest.value(sv[0]);
        if (v == null) return null;
        if (sv[1] > 0 && v >= sv[1]) return "done";
    }
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
