/// name: PoisonForest Story
/// desc: The PoisonForest chain, poison creation through Xavier Lionfang.
/// once: true
/// timeout: 180

// Where every item a quest turns in comes from. `spot` is the map-item id, and
// the key is the bag id; every pair below was read off a live packet, so 964
// pays Nightrage Weed and 965 Cyanidic Soil rather than the other way round.
var MAP = "poisonforest";
var SOURCE = {
    11799: { monster: "Traitor Knight", cell: "r12" },
    11800: { monster: "Marsh Lurker", cell: "Enter" },
    11801: { spot: 964 },
    11802: { spot: 965 },
    11803: { spot: 963 },
    11804: { spot: 971 },
    11806: { monster: "Traitor Knight", cell: "r12" },
    11807: { monster: "Treeant", cell: "r3" },
    11809: { spot: 966 },
    11812: { monster: "Burning Loyalist", cell: "r10" },
    11813: { spot: 967 },
    11819: { monster: "Burning Loyalist", cell: "r10" },
    11821: { monster: "Traitor Knight", cell: "r12" },
    11826: { spot: 968 },
    11827: { monster: "Traitor Knight", cell: "r12" },
    11828: { spot: 970 },
    11829: { spot: 969 },
    11830: { monster: "Xavier Lionfang", cell: "r15" }
};

// A quest item is temporary: it is gone after a relog, and four hand-ins are
// eaten by Termination Tonic long after the quest that paid them. A missing one
// is walked again from the quest that pays it rather than failing.
var PRODUCE = {
    11805: 1949,   // Combustible Krialo Moss
    11811: 1950,   // Sour Sap
    11815: 1951,   // Burning Ember
    11823: 1953    // Flakes of Rust
};

// The chain in order; its slot values run 6 to 13.
var ORDER = [1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955];

// Where that item comes from, one action per pass.
//
// With a bag id the count is the total to hold, not the shortfall: asking for
// `need - have` stops the step at that number and then answers done for ever,
// which is a stall on any partial stack. A kill step is the other way round,
// because it counts down from what is missing.
function source(want) {
    var from = SOURCE[want.id];
    if (from == null) {
        if (PRODUCE[want.id] != null) {
            act(PRODUCE[want.id]);
            return;
        }
        bot.fail("item " + want.id + " has no source in this run");
        return;
    }
    if (!bot.travel(MAP)) return;
    if (from.spot) {
        bot.mapItem(from.spot, want.need, want.id);
        return;
    }
    if (!bot.moveToCell(from.cell)) return;
    bot.kill(from.monster, want.need - want.have);
}

// Accept, hand in, or go and get the next thing the quest asks for.
function act(id) {
    if (!bot.quest.active(id)) {
        var tries = (bot.memory["try" + id] || 0) + 1;
        bot.memory["try" + id] = tries;
        if (tries > 900) {
            bot.fail("quest " + id + " never started");
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
            source(want);
            return;
        }
    }
}

// Done, not done, or the definition is still on its way. A hand-in this run
// sent leaves the tracker before its slot lands, so that is remembered too.
function status(id) {
    if (bot.memory["done" + id]) return "done";
    var done = bot.quest.done(id);
    if (done == null) return null;
    if (done) return "done";
    if (bot.memory["sent" + id] && !bot.quest.active(id)) {
        bot.memory["done" + id] = true;
        return "done";
    }
    return bot.quest.active(id) ? "active" : "todo";
}

for (var i = 0; i < ORDER.length; i++) {
    var id = ORDER[i];
    var state = status(id);
    if (state == null) return;
    if (state === "done") continue;

    if (bot.memory.at !== id) {
        bot.memory.at = id;
        bot.log("poisonforest: quest " + id);
    }
    act(id);
    return;
}

bot.log("poisonforest: done");
return true;
