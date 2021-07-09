#!/bin/sh

SCRIPT_DIR="$(cd $(dirname ${0}) && pwd)"
NAMESPACE=${1:-helm-repository}
HELM_RELEASE=${2:-helm-repository}

kubectl create ns $NAMESPACE || true
helm -n ${NAMESPACE} upgrade --install ${HELM_RELEASE} ${SCRIPT_DIR}/../nginx -f ${SCRIPT_DIR}/values.yaml --set image.tag=$CI_COMMIT_SHA
