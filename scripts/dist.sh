#!/bin/bash

node make-sw-assets.js
./update-index-html.sh

cd ..

rm -Rf docs/
mkdir docs/
npm run ts-clean
npm run ts-build

cp -R source/* docs/

rm -R docs/app/*.sh docs/app/*.json
rm -R docs/app/plugins/**/src/
rm -R docs/app/plugins/**/_out/*.ts*
