################
# Build assets #
################
FROM node:24 AS build
WORKDIR /app

RUN npm install -g pnpm@12
ENV PNPM_ARGS="--frozen-lockfile --ignore-scripts"

COPY package.json pnpm-workspace.yaml ./
RUN pnpm install ${PNPM_ARGS}

COPY . .

RUN pnpm run build
RUN pnpm install --prod ${PNPM_ARGS}

####################
# Production image #
####################
FROM node:24-slim AS production
WORKDIR /app

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules

USER node
ENV NODE_ENV=production
EXPOSE 3000

CMD ["--enable-source-maps", "/app/dist/index.mjs"]
