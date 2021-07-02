FROM nginx:1.21.0-alpine

## Copy our default nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html
