#!/bin/bash

cd ..

rm -Rf docs/
mkdir -p docs/editor
npm run ts-clean
npm run ts-build

cp .nojekyll docs/
cp CNAME docs/
cp -R source/* docs/

rm -R docs/editor/app/plugins/**/src/
rm -R docs/editor/app/plugins/**/_res/
rm -R docs/editor/app/plugins/**/_out/*.ts*

echo Packing plugins...

cp docs/editor/product.json docs/editor/app/
npx colibri-packer --pack-product docs/editor/app
rm docs/editor/app/product.json

cd scripts/
node make-product.js

php build-index.html.php ../docs/editor/app > ../docs/index.html