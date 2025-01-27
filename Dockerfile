FROM node:16 as appbuild
ARG KAOTO_API_URL="/api"
WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn install --mode=skip-build

COPY . .

RUN KAOTO_API=${KAOTO_API_URL} yarn run build

FROM nginxinc/nginx-unprivileged

COPY --from=appbuild /app/dist/* /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

HEALTHCHECK --interval=3s --start-period=10s CMD curl --fail http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
