const { readFileSync, writeFileSync } = require("fs");

const data = JSON.parse(readFileSync("../package.json"));
const version = data.version;
const phaserVersion = data.phaserVersion;

writeFileSync("../source/ver", version);
writeFileSync("../source/phaserVersion", phaserVersion);

const lines = readFileSync("../source/sw.js").toString().split("\n");

lines[0] = `const VER = "${version}";`;

writeFileSync("../source/sw.js", lines.join("\n"));