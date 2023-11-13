#!/usr/bin/node
const fs = require("fs");
const path = require("path");
const process = require("process");

const phaserHome = process.env["PHASER_PATH"];

console.log("Phaser Home: " + phaserHome)


const data = {};

function readDir(folder) {

    const files = fs.readdirSync(folder);

    for (const file of files) {

        if (file.startsWith(".")) {

            continue;
        }

        const fullPath = path.join(folder, file);

        const stat = fs.statSync(fullPath);

        const relPath = path.relative(phaserHome, fullPath);

        if (stat.isFile()) {

            const source = fs.readFileSync(fullPath).toString();

            console.log("Store " + relPath);

            data[relPath] = source;

        } else {

            readDir(fullPath);
        }
    }
}

readDir(path.join(phaserHome, "phaser/src"));
readDir(path.join(phaserHome, "phaser/plugins/fbinstant/src"));

fs.writeFileSync(path.join("../source/editor/app/plugins/helpcenter.phaser/_res/phaser-code.json"), JSON.stringify(data, null, 2));
