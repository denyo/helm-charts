#!/bin/bash

all_dirs=(./*/)

remove=./docs/
dirs=${all_dirs[@]/$remove/}

for dir in $dirs; do
    echo "Packing chart at: $dir"
    helm package $dir -d ./docs
done

helm repo index ./docs --url https://denyo.github.io/helm-charts
