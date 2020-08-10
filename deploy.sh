echo "------------------------------------------------------"
echo "-------------------自動push專案開始-------------------"
echo "------------------------------------------------------"

dateToday="$(date +'%Y.%m.%d')"

set -e

npm run build

git add .

git commit -m "${dateToday}_updated"

git push -u origin master

npm run dev