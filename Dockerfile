FROM node:17.9.1-buster-slim AS base
WORKDIR /app
ENV PORT=80

FROM node:17.9.1-buster AS build
# Create app directory
WORKDIR /app

COPY *.json ./
COPY . .

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --legacy-peer-deps

RUN npm run build
WORKDIR /app

FROM base AS final


ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/package*.json ./

RUN npm install --production --legacy-peer-deps

EXPOSE 80

ENTRYPOINT [ "node", "dist/main" ]