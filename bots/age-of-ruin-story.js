/// name: Age of Ruin Story
/// desc: The full Age of Ruin saga, Termina Temple to the Citrinitas Forge.
/// once: true
/// timeout: 300

// The saga is one chain per zone, walked in play order. A finished leg
// stays done and an unfinished one is simply walked again; progress is
// the tracker plus the slot, never memory alone.
var ORDER = [9213,9214,9225,9226,9227,9228,9229,9230,9231,9232,9233,9234,9242,9243,9244,9245,9246,9247,9248,9249,9250,9251,9258,9259,9260,9261,9262,9263,9264,9265,9266,9267,9268,9270,9271,9272,9273,9274,9292,9293,9294,9295,9296,9297,9298,9299,9300,9301,9306,9307,9308,9309,9310,9311,9312,9313,9314,9315,9329,9330,9331,9332,9333,9334,9335,9336,9337,9338,9348,9351,9719,9720,9721,9722,9723,9724,9725,9726,9727,9728,9729,9732,9733,9734,9735,9736,9737,9738,9739,9740,9741,9755,9756,9757,9758,9759,9760,9761,9762,9763,9764,9768,9769,9774,9770,9771,9772,9773,9775,9776,9777,9805,9806,9807,9808,9809,9810,9811,9812,9813,9814,9819,9820,9821,9822,9823,9824,9825,9826,9827,9828,9832,9833,9851,10347,10348,10349,10350,10351,10352,10353,10354,10355,10356,10359,10360,10361,10362,10363,10364,10365,10366,10367,10368,10375,10376,10377,10378,10379,10380,10381,10382,10383,10384,10413,10414,10415,10416,10417,10418,10419,10420,10421,10422,10609,10610,10611,10612,10613,10614,10615,10616,10617,10618,10678,10679,10680,10681,10682,10683,10684,10685,10686,10687,10703,10704,10714,10725,10726,10727,10728,10729,10730,10731,10732,10733,10734,10735,10736];

// Bag id to the monster that pays it. Cells come from a live room dump;
// the pad is left off on purpose, the cell alone is the arrival.
var SOURCE = {
    77584: { monster: "Termina Defender", map: "terminatemple", cell: "r2" },
    77588: { monster: "Clandestine Guard", map: "terminatemple", cell: "r10" },
    77862: { monster: "Kitefin Shark Bait", map: "ashray", cell: "Enter" },
    77863: { monster: "Ashray Fisherman", map: "ashray", cell: "r2" },
    77866: { monster: "Ghostly Eel", map: "ashray", cell: "r5" },
    77867: { monster: "Stagnant Water", map: "ashray", cell: "r5" },
    77869: { monster: "Ashray Fisherman", map: "ashray", cell: "r2" },
    77871: { monster: "Kitefin Shark Bait", map: "ashray", cell: "Enter" },
    77872: { monster: "Ghostly Eel", map: "ashray", cell: "r5" },
    77874: { monster: "Stagnant Water", map: "ashray", cell: "r5" },
    77878: { monster: "Seafoam Elemental", map: "ashray", cell: "r9" },
    77966: { monster: "Blighted Water", map: "sunlightzone", cell: "r2" },
    77967: { monster: "Spectral Jellyfish", map: "sunlightzone", cell: "r3" },
    77968: { monster: "Blighted Water", map: "sunlightzone", cell: "r2" },
    77971: { monster: "Spectral Jellyfish", map: "sunlightzone", cell: "r3" },
    77973: { monster: "Spectral Jellyfish", map: "sunlightzone", cell: "r3" },
    77974: { monster: "Blighted Water", map: "sunlightzone", cell: "r2" },
    77978: { monster: "Astravian Illusion", map: "sunlightzone", cell: "r6" },
    77980: { monster: "Infernal Illusion", map: "sunlightzone", cell: "r7" },
    77983: { monster: "Seraphic Illusion", map: "sunlightzone", cell: "r9" },
    77984: { monster: "Marine Snow", map: "sunlightzone", cell: "r10" },
    78112: { monster: "Whale Louse", map: "twilightzone", cell: "r2" },
    78113: { monster: "Polymelia Lamprey", map: "twilightzone", cell: "r2" },
    78116: { monster: "Whale Louse", map: "twilightzone", cell: "r2" },
    78117: { monster: "Polymelia Lamprey", map: "twilightzone", cell: "r2" },
    78120: { monster: "Decay Spirit", map: "twilightzone", cell: "r6" },
    78121: { monster: "Ice Guardian", map: "twilightzone", cell: "r7" },
    78125: { monster: "Decay Spirit", map: "twilightzone", cell: "r6" },
    78126: { monster: "Ice Guardian", map: "twilightzone", cell: "r7" },
    78127: { monster: "Leviathan", map: "twilightzone", cell: "r10" },
    78261: { monster: "Polymelia Lamprey", map: "twilightzone", cell: "r2" },
    78262: { monster: "Blighted Water", map: "sunlightzone", cell: "r2" },
    78263: { monster: "Astravian Illusion", map: "sunlightzone", cell: "r6" },
    78264: { monster: "Infernal Illusion", map: "sunlightzone", cell: "r7" },
    78265: { monster: "Marine Snow", map: "sunlightzone", cell: "r10" },
    78266: { monster: "Leviathan", map: "twilightzone", cell: "r10" },
    78631: { monster: "Polymelia Lamprey", map: "midnightzone", cell: "r2" },
    78633: { monster: "Vowed Shadowslayer", map: "midnightzone", cell: "r3" },
    78634: { monster: "Vowed Shadowslayer", map: "midnightzone", cell: "r3" },
    78635: { monster: "Undead Prisoner", map: "midnightzone", cell: "r4" },
    78637: { monster: "Undead Prisoner", map: "midnightzone", cell: "r4" },
    78638: { monster: "Vowed Shadowslayer", map: "midnightzone", cell: "r3" },
    78641: { monster: "Shadow Viscera", map: "midnightzone", cell: "r7" },
    78642: { monster: "Venerated Wraith", map: "midnightzone", cell: "r6" },
    78643: { monster: "Venerated Wraith", map: "midnightzone", cell: "r6" },
    78644: { monster: "Shadow Viscera", map: "midnightzone", cell: "r7" },
    78647: { monster: "Sparagmos", map: "midnightzone", cell: "r9" },
    78810: { monster: "Kitefin Shark Bait", map: "abyssalzone", cell: "r2" },
    78814: { monster: "Blighted Water", map: "abyssalzone", cell: "r4" },
    78815: { monster: "Shadow Viscera", map: "abyssalzone", cell: "r5" },
    78817: { monster: "Shadow Viscera", map: "abyssalzone", cell: "r5" },
    78818: { monster: "Blighted Water", map: "abyssalzone", cell: "r4" },
    78819: { monster: "Foam Scavenger", map: "abyssalzone", cell: "r7" },
    78823: { monster: "Necro Adipocere", map: "abyssalzone", cell: "r10" },
    78824: { monster: "Necro Adipocere", map: "abyssalzone", cell: "r10" },
    78825: { monster: "Foam Scavenger", map: "abyssalzone", cell: "r7" },
    78827: { monster: "The Ashray", map: "abyssalzone", cell: "r13" },
    79028: { monster: "Venerated Wraith", map: "trenchobserve", cell: "r2" },
    79030: { monster: "Seabase Turret", map: "trenchobserve", cell: "r4" },
    79033: { monster: "Venerated Wraith", map: "trenchobserve", cell: "r2" },
    79034: { monster: "Seabase Turret", map: "trenchobserve", cell: "r4" },
    79039: { monster: "Sea Spirit", map: "trenchobserve", cell: "r6" },
    79040: { monster: "Necro Adipocere", map: "trenchobserve", cell: "r8" },
    79041: { monster: "Necro Adipocere", map: "trenchobserve", cell: "r8" },
    79042: { monster: "Sea Spirit", map: "trenchobserve", cell: "r6" },
    79044: { monster: "Lady Noelle", map: "trenchobserve", cell: "r9" },
    85854: { monster: "Lightguard Paladin", map: "balemorale", cell: "r10" },
    85855: { monster: "Noble's Knight", map: "balemorale", cell: "r10" },
    85858: { monster: "Chaos Spider", map: "balemorale", cell: "r12" },
    85861: { monster: "*", map: "balemorale", cell: "r13" },
    85864: { monster: "Chaos Spider", map: "balemorale", cell: "r12" },
    85865: { monster: "Chaos Crystal", map: "balemorale", cell: "r13" },
    85867: { monster: "Skye Warrior", map: "balemorale", cell: "r10" },
    85870: { monster: "Queen Victoria", map: "balemorale", cell: "r16" },
    85916: { monster: "Skye Warrior", map: "castleeblana", cell: "r2" },
    85919: { monster: "Skye Executor", map: "castleeblana", cell: "r3" },
    85920: { monster: "Skye Warrior", map: "castleeblana", cell: "r2" },
    85921: { monster: "Skye Executor", map: "castleeblana", cell: "r3" },
    85923: { monster: "Bananach Raven", map: "castleeblana", cell: "r5" },
    85924: { monster: "Fear Gorta", map: "castleeblana", cell: "r6" },
    85926: { monster: "Bananach Raven", map: "castleeblana", cell: "r5" },
    85927: { monster: "Fear Gorta", map: "castleeblana", cell: "r6" },
    85931: { monster: "Skye Warrior", map: "castleeblana", cell: "r2" },
    85932: { monster: "Warden Indradeep", map: "castleeblana", cell: "r10" },
    86258: { monster: "Skye Cailleach", map: "loughshine", cell: "r2" },
    86260: { monster: "Scorched Elder Yew", map: "loughshine", cell: "r3" },
    86263: { monster: "Scorched Elder Yew", map: "loughshine", cell: "r3" },
    86264: { monster: "Skye Cailleach", map: "loughshine", cell: "r2" },
    86266: { monster: "Skye Executor", map: "loughshine", cell: "r6" },
    86267: { monster: "Energy Elemental", map: "loughshine", cell: "r7" },
    86271: { monster: "Energy Elemental", map: "loughshine", cell: "r7" },
    86272: { monster: "Skye Executor", map: "loughshine", cell: "r6" },
    86274: { monster: "Warden Iseul", map: "loughshine", cell: "r10" },
    86471: { monster: "Bananach Raven", map: "naoisegrave", cell: "r2" },
    86473: { monster: "Energy Elemental", map: "naoisegrave", cell: "r3" },
    86477: { monster: "Energy Elemental", map: "naoisegrave", cell: "r3" },
    86478: { monster: "Bananach Raven", map: "naoisegrave", cell: "r2" },
    86480: { monster: "Ice Guardian", map: "naoisegrave", cell: "r4" },
    86481: { monster: "Bone Dragonling", map: "naoisegrave", cell: "r6" },
    86482: { monster: "Warden Iseul ", map: "naoisegrave", cell: "r7" },
    86484: { monster: "Ice Guardian", map: "naoisegrave", cell: "r4" },
    86485: { monster: "Bone Dragonling", map: "naoisegrave", cell: "r6" },
    86486: { monster: "Volgritian", map: "naoisegrave", cell: "r10" },
    86878: { monster: "Undead Garde", map: "liatarahill", cell: "r2" },
    86879: { monster: "Garde Wraith", map: "liatarahill", cell: "r3" },
    86880: { monster: "Undead Garde ", map: "liatarahill", cell: "r2" },
    86881: { monster: "Garde Wraith", map: "liatarahill", cell: "r3" },
    86884: { monster: "King Duncan", map: "liatarahill", cell: "r5" },
    86885: { monster: "Undead Garde ", map: "liatarahill", cell: "r2" },
    86886: { monster: "Garde Wraith", map: "liatarahill", cell: "r3" },
    86888: { monster: "Ice Guardian", map: "liatarahill", cell: "r8" },
    86890: { monster: "Skye Cailleach", map: "liatarahill", cell: "r9" },
    86891: { monster: "Ice Guardian", map: "liatarahill", cell: "r8" },
    86892: { monster: "Skye Cailleach", map: "liatarahill", cell: "r9" },
    86894: { monster: "Warden Illaria", map: "liatarahill", cell: "r10" },
    87156: { monster: "Energy Elemental ", map: "castlegaheris", cell: "r2" },
    87157: { monster: "Ice Guardian", map: "castlegaheris", cell: "r3" },
    87161: { monster: "Energy Elemental ", map: "castlegaheris", cell: "r2" },
    87162: { monster: "Ice Guardian", map: "castlegaheris", cell: "r3" },
    87163: { monster: "Dark Cage", map: "castlegaheris", cell: "r5" },
    87164: { monster: "Glacial Crystal", map: "castlegaheris", cell: "r6" },
    87165: { monster: "Elemental Hybrid", map: "castlegaheris", cell: "r7" },
    87166: { monster: "Glacial Crystal", map: "castlegaheris", cell: "r6" },
    87167: { monster: "Elemental Hybrid", map: "castlegaheris", cell: "r7" },
    87168: { monster: "Thundersnow Storm", map: "castlegaheris", cell: "r10" },
    94900: { monster: "Soul Raven", map: "mountmaleno", cell: "r2" },
    94910: { monster: "Maleno Elemental", map: "mountmaleno", cell: "r6" },
    94912: { monster: "Draconian Bandit", map: "mountmaleno", cell: "r7" },
    95170: { monster: "Dove", map: "sanctuaryaiwass", cell: "Enter" },
    95171: { monster: "Albedo Elemental", map: "sanctuaryaiwass", cell: "r2" },
    95172: { monster: "Albedo Match", map: "sanctuaryaiwass", cell: "r3" },
    95173: { monster: "Leonal", map: "sanctuaryaiwass", cell: "r4" },
    95177: { monster: "Crystal Prima", map: "sanctuaryaiwass", cell: "r5" },
    95179: { monster: "Albedo Elemental", map: "sanctuaryaiwass", cell: "r2" },
    95180: { monster: "Albedo Match", map: "sanctuaryaiwass", cell: "r3" },
    95181: { monster: "Mercury Prima", map: "sanctuaryaiwass", cell: "r9" },
    95182: { monster: "*", map: "sanctuaryaiwass", cell: "r9" },
    95185: { monster: "Anima Animus Aiwass", map: "sanctuaryaiwass", cell: "r11" },
    95869: { monster: "Defensive Turret", map: "forgealbedo", cell: "r3" },
    95871: { monster: "Runehawk Husk", map: "forgealbedo", cell: "r4" },
    95873: { monster: "Collapsed Husk", map: "forgealbedo", cell: "r5" },
    95877: { monster: "Defensive Turret", map: "forgealbedo", cell: "r3" },
    99483: { monster: "Lightguard Elite", map: "fortluma", cell: "r4" },
    99484: { monster: "Citrinitas Elemental", map: "fortluma", cell: "r2" },
    99486: { monster: "Citrinitas Match", map: "fortluma", cell: "r8" },
    99488: { monster: "*", map: "fortluma", cell: "r10" },
    100311: { monster: "*", map: "warwickforest", cell: "r8" },
    100315: { monster: "*", map: "warwickforest", cell: "r2" },
    100801: { monster: "Rubedo Match", map: "rubedopeak", cell: "Enter" },
};

// Quests whose items sit in the map rather than on a monster. One request
// per pass, rotating the spots; the quest wants decide when the leg ends.
var GROUND = {
    9213: { map: "terminatemple", spots: [11625,11626,11627] },
    9214: { map: "terminatemple", spots: [11628,11629,11630] },
    9226: { map: "ashray", spots: [11663,11664] },
    9228: { map: "ashray", spots: [11665] },
    9229: { map: "ashray", spots: [11666] },
    9231: { map: "ashray", spots: [11667] },
    9232: { map: "ashray", spots: [11668] },
    9233: { map: "ashray", spots: [11669,11670] },
    9244: { map: "sunlightzone", spots: [11705,11706] },
    9245: { map: "sunlightzone", spots: [11707] },
    9247: { map: "sunlightzone", spots: [11708,11709,11710] },
    9248: { map: "sunlightzone", spots: [11711] },
    9249: { map: "sunlightzone", spots: [11712] },
    9250: { map: "sunlightzone", spots: [11713] },
    9260: { map: "twilightzone", spots: [11749,11750] },
    9262: { map: "twilightzone", spots: [11751,11752] },
    9265: { map: "twilightzone", spots: [11753,11754,11755] },
    9268: { map: "twilightzone", spots: [11756] },
    9292: { map: "midnightzone", spots: [11842,11843,11844] },
    9293: { map: "midnightzone", spots: [11845] },
    9295: { map: "midnightzone", spots: [11846] },
    9296: { map: "midnightzone", spots: [11847] },
    9297: { map: "midnightzone", spots: [11848] },
    9300: { map: "midnightzone", spots: [11849,11850] },
    9306: { map: "abyssalzone", spots: [11914] },
    9307: { map: "abyssalzone", spots: [11893,11894] },
    9309: { map: "abyssalzone", spots: [11895] },
    9311: { map: "abyssalzone", spots: [11896] },
    9312: { map: "abyssalzone", spots: [11897,11898] },
    9314: { map: "abyssalzone", spots: [11899] },
    9329: { map: "trenchobserve", spots: [11975] },
    9330: { map: "trenchobserve", spots: [11976] },
    9331: { map: "trenchobserve", spots: [11977] },
    9333: { map: "trenchobserve", spots: [11978] },
    9334: { map: "trenchobserve", spots: [11979,11981,11980] },
    9337: { map: "trenchobserve", spots: [11982] },
    9351: { map: "terminatemple", spots: [12050,12051] },
    9719: { map: "balemorale", spots: [12933] },
    9722: { map: "balemorale", spots: [13177,13178] },
    9723: { map: "balemorale", spots: [13179,13180] },
    9725: { map: "balemorale", spots: [13181,13182] },
    9726: { map: "balemorale", spots: [13183] },
    9728: { map: "balemorale", spots: [13184,13185] },
    9733: { map: "castleeblana", spots: [13202,13203] },
    9735: { map: "castleeblana", spots: [13204] },
    9737: { map: "castleeblana", spots: [13205] },
    9738: { map: "castleeblana", spots: [13206] },
    9739: { map: "castleeblana", spots: [13207,13208] },
    9755: { map: "loughshine", spots: [13273] },
    9757: { map: "loughshine", spots: [13274,13275] },
    9759: { map: "loughshine", spots: [13276] },
    9761: { map: "loughshine", spots: [13277] },
    9762: { map: "loughshine", spots: [13278,13279] },
    9763: { map: "loughshine", spots: [13280] },
    9768: { map: "naoisegrave", spots: [13296] },
    9769: { map: "naoisegrave", spots: [13297] },
    9770: { map: "naoisegrave", spots: [13300] },
    9773: { map: "naoisegrave", spots: [13301] },
    9774: { map: "naoisegrave", spots: [13298,13299] },
    9808: { map: "liatarahill", spots: [13364,13365] },
    9810: { map: "liatarahill", spots: [13368] },
    9811: { map: "liatarahill", spots: [13366] },
    9813: { map: "liatarahill", spots: [13367] },
    9819: { map: "castlegaheris", spots: [13378] },
    9821: { map: "castlegaheris", spots: [13379,13380,13381] },
    9826: { map: "castlegaheris", spots: [13382,13383] },
    9832: { map: "coldthunder", spots: [13403] },
    9851: { map: "terminatemple", spots: [13541,13542] },
    10347: { map: "thelimacity", spots: [14770,14771] },
    10349: { map: "thelimacity", spots: [14772,14773] },
    10351: { map: "thelimacity", spots: [14774] },
    10352: { map: "thelimacity", spots: [14775] },
    10359: { map: "mountmaleno", spots: [14805] },
    10361: { map: "mountmaleno", spots: [14807] },
    10363: { map: "mountmaleno", spots: [14808,14809] },
    10364: { map: "mountmaleno", spots: [14810] },
    10365: { map: "mountmaleno", spots: [14811] },
    10366: { map: "mountmaleno", spots: [14812] },
    10378: { map: "sanctuaryaiwass", spots: [14865,14866] },
    10379: { map: "sanctuaryaiwass", spots: [14867] },
    10380: { map: "sanctuaryaiwass", spots: [14868] },
    10383: { map: "sanctuaryaiwass", spots: [14869,14870] },
    10414: { map: "forgealbedo", spots: [14959,14960,14961] },
    10415: { map: "forgealbedo", spots: [14962] },
    10416: { map: "forgealbedo", spots: [14963] },
    10417: { map: "forgealbedo", spots: [14964] },
    10420: { map: "forgealbedo", spots: [14965] },
    10609: { map: "fortluma", spots: [15542] },
    10610: { map: "fortluma", spots: [15543] },
    10611: { map: "fortluma", spots: [15544,15545] },
    10614: { map: "fortluma", spots: [15546] },
    10615: { map: "fortluma", spots: [15547] },
    10617: { map: "fortluma", spots: [15548] },
    10678: { map: "warwickforest", spots: [15656] },
    10679: { map: "warwickforest", spots: [15657] },
    10681: { map: "warwickforest", spots: [15658] },
    10682: { map: "warwickforest", spots: [15659] },
    10683: { map: "warwickforest", spots: [15660] },
    10684: { map: "warwickforest", spots: [15661] },
    10685: { map: "warwickforest", spots: [15662] },
    10703: { map: "magnumopus", spots: [15703] },
    10726: { map: "forgecitrinitas", spots: [15820,15821] },
    10729: { map: "forgecitrinitas", spots: [15822] },
    10733: { map: "forgecitrinitas", spots: [15823,15824,15825] },
};

// Legs whose monsters cannot be paired to bags by name. The run
// rotates the monsters instead of guessing which one pays which bag.
var MULTI = {
    10348: [{ monster: "Noelle Knight", map: "thelimacity", cell: "r2" }],
    10350: [{ monster: "Dwarven Aegis", map: "thelimacity", cell: "r5" }, { monster: "Drow Soldier", map: "thelimacity", cell: "r3" }],
    10353: [{ monster: "Maleno Elemental", map: "thelimacity", cell: "r10" }],
    10354: [{ monster: "Maleno Match", map: "thelimacity", cell: "r16" }],
    10355: [{ monster: "Maleno Elemental", map: "thelimacity", cell: "r10" }, { monster: "Maleno Match", map: "thelimacity", cell: "r16" }],
    10356: [{ monster: "Flame of Maleno", map: "thelimacity", cell: "r11" }],
    10360: [{ monster: "Maleno Match", map: "mountmaleno", cell: "r3" }],
    10362: [{ monster: "Soul Raven", map: "mountmaleno", cell: "r2" }, { monster: "Maleno Match", map: "mountmaleno", cell: "r3" }],
    10367: [{ monster: "Draconian Bandit", map: "mountmaleno", cell: "r7" }, { monster: "Maleno Elemental", map: "mountmaleno", cell: "r6" }],
    10368: [{ monster: "Idalion", map: "mountmaleno", cell: "r10" }],
    10413: [{ monster: "Albedo Elemental", map: "forgealbedo", cell: "r2" }],
    10418: [{ monster: "Albedo Match", map: "forgealbedo", cell: "r6" }],
    10419: [{ monster: "Defense Droid", map: "forgealbedo", cell: "r7" }],
    10421: [{ monster: "Defensive Turret", map: "forgealbedo", cell: "r3" }, { monster: "Defense Droid", map: "forgealbedo", cell: "r7" }],
    10422: [{ monster: "Flame of Albedo", map: "forgealbedo", cell: "r10" }],
    10609: [{ monster: "Citrinitas Elemental", map: "fortluma", cell: "r2" }],
    10610: [{ monster: "Luma Lifeform", map: "fortluma", cell: "r10" }],
    10612: [{ monster: "Lightguard Elite", map: "fortluma", cell: "r4" }],
    10613: [{ monster: "Rigaud & Cassie", map: "fortluma", cell: "r5" }],
    10616: [{ monster: "Luma Dragon Twins", map: "fortluma", cell: "r9" }],
    10618: [{ monster: "Flame of Citrinitas", map: "fortluma", cell: "r11" }],
    10678: [{ monster: "Black Phoenix", map: "warwickforest", cell: "r2" }],
    10679: [{ monster: "Rubedo Elemental", map: "warwickforest", cell: "r3" }],
    10680: [{ monster: "Charred Remnant", map: "warwickforest", cell: "r6" }],
    10681: [{ monster: "Rubedo Elemental", map: "warwickforest", cell: "r3" }],
    10683: [{ monster: "Rubedo Match", map: "warwickforest", cell: "r4" }],
    10686: [{ monster: "Idea of a Champion", map: "warwickforest", cell: "r9" }],
    10687: [{ monster: "Flame of Rubedo", map: "warwickforest", cell: "r10" }],
    10725: [{ monster: "Citrinitas Elemental", map: "forgecitrinitas", cell: "r2" }],
    10727: [{ monster: "Defensive Turret", map: "forgecitrinitas", cell: "r3" }],
    10728: [{ monster: "Luma Lifeform", map: "forgecitrinitas", cell: "r5" }],
    10730: [{ monster: "Defense Droid", map: "forgecitrinitas", cell: "r6" }],
    10731: [{ monster: "Citrinitas Match", map: "forgecitrinitas", cell: "r4" }],
    10732: [{ monster: "Luma Lifeform", map: "forgecitrinitas", cell: "r5" }],
    10734: [{ monster: "Clematis", map: "forgecitrinitas", cell: "r8" }],
    10735: [{ monster: "Clematis", map: "forgecitrinitas", cell: "r8" }, { monster: "Luma Lifeform", map: "forgecitrinitas", cell: "r5" }, { monster: "Defense Droid", map: "forgecitrinitas", cell: "r6" }],
    10736: [{ monster: "Clematis", map: "forgecitrinitas", cell: "r8" }, { monster: "Luma Lifeform", map: "forgecitrinitas", cell: "r5" }, { monster: "Defense Droid", map: "forgecitrinitas", cell: "r6" }],
};

// Solo bosses with mechanics around the fight. 10704 names the safe side
// in the zone event; the engine already walks it, and the script steps
// there too, so the kill resumes from safety every pass.
var SPECIAL = {
    9348: { monster: "Voice in the Sea", map: "seavoice", cell: "r2" },
    9833: { monster: "Cold Thunder Avatar", map: "coldthunder", cell: "r3" },
    10704: { monster: "Flame of the Beyond", map: "magnumopus", cell: "r2", dodge: true },
};

// Member-only variant of the Silica Spring leg. A run that cannot start
// it skips ahead instead of failing.
var SKIP = { 10735: true };

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

// A solo boss at the end of a chain. The Flame names its safe side in
// the zone event; the step goes there first, then the fight resumes.
function special(id) {
    var sp = SPECIAL[id];
    if (sp == null) { bot.fail("quest " + id + " has no fight in this run"); return; }
    if (!bot.travel(sp.map)) return;
    if (!bot.moveToCell(sp.cell)) return;
    if (sp.dodge) {
        var zone = bot.zone();
        if (zone === "a") { bot.walkTo(614, 402); }
        else if (zone === "b") { bot.walkTo(318, 402); }
    }
    if (!bot.kill(sp.monster || "*", 1)) return;
    if (!bot.pickDrop()) return;
}

function act(id) {
    if (!bot.quest.active(id)) {
        var tries = (bot.memory["try" + id] || 0) + 1;
        bot.memory["try" + id] = tries;
        if (SKIP[id] && tries > 30) { bot.memory["done" + id] = true; return; }
        if (tries > 900) { bot.fail("quest " + id + " never started"); return; }
        bot.quest.accept(id);
        return;
    }
    if (bot.quest.ready(id)) {
        bot.memory["sent" + id] = true;
        bot.quest.turnIn(id);
        return;
    }
    if (SPECIAL[id] != null) { special(id); return; }
    var wants = bot.quest.wants(id);
    if (wants == null) return;
    if (MULTI[id] != null) { each(id); return; }
    var spotOpen = false;
    for (var i = 0; i < wants.length; i++) {
        if (wants[i].have >= wants[i].need) continue;
        if (SOURCE[wants[i].id] != null) { source(id, wants[i]); return; }
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
    if (bot.memory.at !== id) { bot.memory.at = id; bot.log("ruin: quest " + id); }
    act(id);
    return;
}

bot.log("ruin: done");
return true;
