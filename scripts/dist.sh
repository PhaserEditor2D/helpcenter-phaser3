#!/bin/bash

./make-sw-assets.js

cd ..

rm -Rf dist/
mkdir dist/
npm run ts-clean
npm run ts-build

cp -R source/* dist/

rm -R dist/app/node_modules dist/app/*.sh dist/app/*.json
rm -R dist/app/plugins/**/src/
rm -R dist/app/plugins/**/_out/*.ts*
