#!/usr/bin/node
const fs = require("fs");
const path = require("path");
const process = require("process");

const phaserHome = process.env["PHASER_PATH"];

console.log("Phaser Home: " + phaserHome)

const root = path.join(phaserHome, "phaser/src");

const data = {};

function readDir(folder) {

    const files = fs.readdirSync(folder);

    for (const file of files) {

        if (file.startsWith(".")) {

            continue;
        }

        const fullPath = path.join(folder, file);

        const stat = fs.statSync(fullPath);

        const relPath = path.relative(root, fullPath);

        if (stat.isFile()) {

            const source = fs.readFileSync(fullPath).toString();

            data[relPath] = source;

        } else {

            readDir(fullPath);
        }
    }
}

readDir(root);

fs.writeFileSync(path.join("../source/app/plugins/helpcenter.phaser/data/phaser-code.json"), JSON.stringify(data, null, 2));
