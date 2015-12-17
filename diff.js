var w3c = require("node-w3capi");
w3c.apiKey = require("./w3capikey.json");

var group1Id = process.argv[2];
var group2Id = process.argv[3];

function usage(error) {
    error = error || 0;
    console.log("Usage: " + process.argv[1] + " <group1 id> <group2 id>");
    process.exit(error);
}

function die(error) {
    console.error("[ERROR]", error);
    process.exit(64);
}

if (!group1Id || !group2Id) {
    usage(1);
}

w3c.group(group1Id).participations().fetch(function(err, group1) {
    if (err) die(error);
    group1 = group1.map(x => x.title);
    w3c.group(group2Id).participations().fetch(function(err, group2) {
        if (err) die(error);
        group2 = group2.map(x => x.title);
        var difference = group1.filter(x => group2.indexOf(x) == -1);
        console.log(difference.sort().join("\n* "));

    });
});;
