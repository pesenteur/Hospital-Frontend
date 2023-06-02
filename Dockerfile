FROM node:lts AS build
COPY ./ /code
WORKDIR /code
RUN npm install && npm run build

FROM nginx AS serve
RUN mkdir /app
COPY --from=build /code/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80