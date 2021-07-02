#!/bin/bash

all_dirs=(./*/)

dist=./dist/
dirs=${all_dirs[@]/$dist/}

for dir in $dirs; do
    echo "Packing chart at: $dir"
    helm package $dir -d ./docs
done

helm repo index "${dist}" --url https://denyo.github.io/helm-charts
