#!/usr/bin/node
const fs = require("fs");
const path = require("path");
const process = require("process");

const phaserHome = process.env["PHASER_PATH"];

console.log("Phaser Home: " + phaserHome)

const inputData = JSON.parse(fs.readFileSync(path.join(phaserHome, "phaser3-docs", "json", "phaser.json")));

const outputData = { docs: [] };

for (const entry of inputData.docs) {

    if (!entry.meta) {

        continue;
    }

    const meta = entry.meta;

    if (meta.range) {

        continue;
    }

    const comment = entry.comment || "";
    const countCommentLines = comment.split("\n").length;

    delete entry.comment;
    delete entry.copyright;
    delete entry.license;
    delete entry.author;
    delete entry.tags;
    delete entry.___id;
    delete entry.___s;

    delete meta.code;

    meta.path = meta.path.split("\\").join("/");
    const i = meta.path.indexOf("/src");
    meta.path = meta.path.substring(i + 5);

    if (meta.path.trim() === "") {

        meta.path = meta.filename;
    }

    entry.description = entry.description || entry.classdesc;

    meta.commentLines = countCommentLines;

    outputData.docs.push(entry);
}

fs.writeFileSync(path.join("../source/app/plugins/helpcenter.phaser/data/phaser-docs.json"), JSON.stringify(outputData, null, 2));