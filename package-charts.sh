#!/bin/bash

chart_dirs=(./charts/*/)
dist=./dist/

for dir in ${chart_dirs[*]}; do
    echo "Packing chart at: $dir"
    helm package $dir -d $dist
done

helm repo index "${dist}" --url https://helm.dev.mhub.logikstudio.de
