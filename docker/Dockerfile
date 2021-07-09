FROM node:14.16.1-alpine as builder

# --------------------------------------
# Prepare the app
# --------------------------------------
WORKDIR /app

## Copy package and package-lock to avoid dependency trouble
COPY package.json yarn.lock ./

## Install node modules
RUN yarn install --frozen-lockfile

## Copy all the files from dist folder containing packaged charts
COPY ./dist ./dist

## Copy all the files from scripts folder
COPY ./scripts ./scripts

## Copy all the files from charts folder
COPY ./charts ./charts

# --------------------------------------
# Build the docs
# --------------------------------------
RUN yarn build

# --------------------------------------
# Create final image
# --------------------------------------
FROM nginx:1.21.0-alpine

## Copy our default nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy over the artifacts to default nginx public folder
COPY /dist /usr/share/nginx/html
COPY --from=builder /app/docs /usr/share/nginx/html
