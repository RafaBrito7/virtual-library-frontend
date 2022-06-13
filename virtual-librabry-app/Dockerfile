FROM node:16.14.2 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.21
COPY --from=node /app/dist/virtual-librabry-app /usr/share/nginx/html

EXPOSE 9090
