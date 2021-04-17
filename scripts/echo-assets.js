#!/usr/bin/node

const { execSync } = require("child_process");

const result = execSync("cd ../source;find app");

const lines = result.toString()
    .split("\n")
    .filter(l => l.startsWith("app/plugins"))
    .filter(l => l.indexOf("/src/") < 0)
    .filter(l => l.endsWith(".js")
        || l.endsWith(".png") 
        || l.endsWith(".jpg") 
        || l.endsWith(".css") 
        || l.endsWith(".json"))
    .map(l => `"${l}?v=" + VER`);

console.log(lines.join(",\n"));