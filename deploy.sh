#!/usr/bin/bash

dateToday="$(date +'%Y.%m.%d')"

set -e

npm run build

git add .

git commit -m "${dateToday}_updated"

git push -u origin master

echo "${dateNow}_updated"

npm run dev
