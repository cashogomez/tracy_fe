### STAGE 1: Build ###
FROM --platform=linux/amd64 node:latest AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod
### STAGE 2: Run ###
FROM --platform=linux/amd64 nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/tracy_fe/browser /usr/share/nginx/html
