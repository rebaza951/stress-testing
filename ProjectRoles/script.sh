#!/bin/bash

node setProjectData.js

projectData=$(cat projectData.json)
pages=$(echo "$projectData" | jq -r '.pages')
limit=$(echo "$projectData" | jq -r '.limit')
offset=0

for ((i=0; i<"$pages"; i++)); do
  echo offset: "$offset"
  OFF_SET="$offset" node get.js
  offset=`expr $offset + $limit`
done

# contar los elementos de un array dentro de un archivo JSON
array_length=$(jq 'length' users.json)

if [ "$array_length" == 0 ]
then
  exit
fi

# iterar en un loop usando el número del array
for ((i=0; i<$array_length; i++)); do
  node patch.js
done
