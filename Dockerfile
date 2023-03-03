FROM node:16.13.0-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80


