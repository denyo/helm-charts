# nginx

Repository: <https://helm.dev.mhub.logikstudio.de>

## Changelog

### 3.0.0

- Upgrade to `networking.k8s.io/v1` ingress

### 2.0.1

- Stop deploying configmap if no values are set

## Usage

```shell
helm repo add mhub https://helm.dev.mhub.logikstudio.de
helm repo update

helm -n ${NAMESPACE} upgrade --install ${HELM_RELEASE} mhub/nginx --version=${CHART_VERSION} -f ./values.yaml
```
