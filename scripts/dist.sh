#!/bin/bash

node make-product.js
./update-index-html.sh

cd ..

rm -Rf docs/
mkdir docs/
npm run ts-clean
npm run ts-build

cp .nojekyll docs/
cp CNAME docs/
cp -R source/* docs/

rm -R docs/editor/app/*.sh docs/app/*.json
rm -R docs/editor/app/plugins/**/src/
rm -R docs/editor/app/plugins/**/_out/*.ts*
