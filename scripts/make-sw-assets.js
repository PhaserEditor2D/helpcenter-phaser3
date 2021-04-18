#!/usr/bin/node

const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const version = JSON.parse(readFileSync("../package.json")).version;

writeFileSync("../source/ver", version);

const pluginResources = execSync("cd ../source;find app").toString()
    .split("\n")
    .filter(l => l.startsWith("app/plugins"))
    .filter(l => l.indexOf("/src/") < 0)
    .filter(l => l.endsWith(".js")
        || l.endsWith(".png")
        || l.endsWith(".jpg")
        || l.endsWith(".css")
        || l.endsWith(".json"));


const staticResources = [
    "/",
    "/ver",
    "/manifest.json",
    "/icons/icon-72.png",
    "/icons/icon-96.png",
    "/icons/icon-128.png",
    "/icons/icon-144.png",
    "/icons/icon-152.png",
    "/icons/icon-192.png",
    "/icons/icon-384.png",
    "/icons/icon-512.png",
    "/app/favicon.png",
    "/app/splash.svg",
];

const lines = [
    ...staticResources.map(l => `"${l}"`),
    ...pluginResources.map(l => `"${l}?v=${version}"`)];

const resStr = "\n\t" + lines.join(",\n\t");


let template = readFileSync("sw.js.template").toString();

template = template.replace("$assets$", "[" + resStr + "]");

template = template.replace("$ver$", version);

writeFileSync("../source/sw.js", template);