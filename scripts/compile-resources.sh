#!/bin/bash
cd ../source/editor/app/plugins/helpcenter.phaser/
npx colibri-packer --folder-to-json _res
mv _res.json res.json