#!/bin/bash

./make-sw-assets.js

cd ..

rm -Rf dist/
mkdir dist/
#npm run ts-clean
#npm run ts-build

cp -R source/app dist/

rm -R dist/app/node_modules dist/app/*.sh dist/app/*.json
