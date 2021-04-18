#!/usr/bin/node
const child_process = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs");

const phaserHome = process.env["PHASER_PATH"];
const plugin = "../source/app/plugins/helpcenter.phaser/data";

child_process.execSync(`rm -Rf ${path.join(plugin, "phaser3-examples/")}`)
child_process.execSync(`mkdir -p ${path.join(plugin, "phaser3-examples/")}`)

child_process.execSync("cp -R "
    + path.join(phaserHome, "phaser3-examples/public/screenshots/") + " "
    + path.join(plugin, "phaser3-examples/"));

function resizeImage(dir) {

    const files = fs.readdirSync(dir);

    for (const file of files) {

        if (file.startsWith(".")) {

            continue;
        }

        const fullName = path.join(dir, file);


        if (fullName.endsWith(".png")) {

            console.log("processing " + fullName);

            const outputName = path.join(path.dirname(fullName), file.substring(0, file.length - 4) + ".jpg");

            child_process.execSync(`ffmpeg -loglevel panic -i "${fullName}" -vf scale=128:96 "${outputName}"`);

            child_process.execSync(`rm "${fullName}"`);

        } else {

            if (fs.statSync(fullName).isDirectory()) {

                resizeImage(fullName);
            }
        }
    }
}

function processScreenshots() {

    resizeImage(path.join(plugin, "phaser3-examples/screenshots"));

    child_process.execSync("mkdir -p " + path.join(plugin, "examples-screenshots-atlas/"));
    child_process.execSync("cd ..; npm run build-examples-atlas");
    child_process.execSync("rm -Rf " + path.join(plugin, "phaser3-examples/"));
}

function processCode() {

    const data = {};

    const root = path.join(phaserHome, "phaser3-examples/public/src");

    function processCode2(dir) {

        const files = fs.readdirSync(dir);

        for (const file of files) {

            if (file === "3.24") {

                continue;
            }

            if (file.startsWith(".") || file.startsWith("_")) {

                continue;
            }

            const fullName = path.join(dir, file);

            if (fullName.endsWith(".js")) {

                const relName = path.relative(root, fullName);

                console.log("processing " + relName);

                const content = fs.readFileSync(fullName);

                data[relName] = content.toString();

            } else {

                if (fs.statSync(fullName).isDirectory()) {

                    processCode2(fullName);
                }
            }
        }
    }

    processCode2(root);

    fs.writeFileSync(path.join(plugin, "phaser-examples-code.json"), JSON.stringify(data, null, 2));
}

processScreenshots();

processCode();

