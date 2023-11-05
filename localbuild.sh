# Build & test libraries
npm i --legacy-peer-deps
cd projects/petri-svg || exit
npm i
cd ../..
npm run petrisvg:build
npm run petrisvg:test:full
npm i ./dist/petri-svg --save-optional --legacy-peer-deps
npm run petriflowsvg:build
npm run petriflowsvg:test:full
npm i ./dist/petriflow-svg --save-optional --legacy-peer-deps
npm run example:build:prod
npm i --legacy-peer-deps
cd projects/petri-svg || exit
npm i
cd ../..
# Build petri.svg
npm run petrisvg:build
npm i ./dist/petri-svg --save-optional --legacy-peer-deps
cd dist/petri-svg || exit
npm publish --registry http://localhost:4873
cd ../..
# Build petriflow.svg
npm run petriflowsvg:build
cd dist/petriflow-svg || exit
npm publish --registry http://localhost:4873
