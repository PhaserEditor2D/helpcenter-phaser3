#!/usr/bin/node

const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const version = JSON.parse(readFileSync("../package.json")).version;

writeFileSync("../source/ver", version);

const lines = readFileSync("../source/sw.js").toString().split("\n");

lines[0] = `const VER = "${version}";`;

writeFileSync("../source/sw.js", lines.join("\n"));