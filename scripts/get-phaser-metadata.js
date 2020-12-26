#!/usr/bin/node
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const process = require("process");

const phaserHome = process.env["PHASER_PATH"];

console.log("Phaser Home: " + phaserHome)

const inputData = JSON.parse(fs.readFileSync(path.join(phaserHome, "phaser3-docs", "json", "phaser.json")));

const outputData = { docs: [] };


for (const entry of inputData.docs) {

    const meta = entry.meta;

    if (meta) {

        meta.path = meta.path.split("\\").join("/");
        const i = meta.path.indexOf("/src");
        meta.path = meta.path.substring(i + 5);

        if (meta.path.trim() === "") {

            meta.path = meta.filename;
        }

        outputData.docs.push(entry);
    }
}

fs.writeFileSync(path.join("../source/app/plugins/helpcenter.phaser/data/phaser.json"), JSON.stringify(outputData, null, 2));