#!node
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const data = JSON.parse(readFileSync("../package.json"));
const version = data.version;
const phaserVersion = data.phaserVersion;

writeFileSync(path.join(__dirname, "..", "source", "editor", "product.json"), JSON.stringify({
    "title": "Unofficial Phaser Help Center",
    "version": version,
    "phaserVersion": phaserVersion
}, undefined, 4));

const lines = readFileSync("../source/sw.js").toString().split("\n");

lines[0] = `const VER = "${version}";`;

writeFileSync("../source/sw.js", lines.join("\n"));