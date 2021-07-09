# Helm Charts

Repository: <https://helm.dev.mhub.logikstudio.de>

## Usage

```shell
helm repo add mhub https://helm.dev.mhub.logikstudio.de
helm repo update
```

## Package charts

```shell
./package-charts.sh
```

## Generate Chart Readmes

See: <https://github.com/norwoodj/helm-docs>

```shell
docker run --rm --volume "$PWD/charts:/helm-docs" -u $(id -u) jnorwood/helm-docs:latest
```

## Generate HTML Docs

```
yarn # installs dependenciee
yarn build
```
