#!/bin/sh

cd /my-directory/$COMMIT_BRANCH

npm install 

chmod -R +x ./node_modules

npm run build 

