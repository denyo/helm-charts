#!/bin/bash

all_dirs=(./*/)
chart_dirs=${all_dirs[*]}

dist=./dist/
delete=($dist "./docker/")
for del in ${delete[@]}
do
   chart_dirs=("${chart_dirs[@]/$del}")
done

for dir in $chart_dirs; do
    echo "Packing chart at: $dir"
    helm package $dir -d $dist
done

helm repo index "${dist}" --url https://denyo.github.io/helm-charts
