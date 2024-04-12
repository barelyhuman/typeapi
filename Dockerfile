FROM node:lts AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm@8.15.5

FROM base AS build
RUN pnpm i
COPY . .
RUN pnpm build

FROM base AS runtime
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Create the data directory for the database
RUN mkdir -p /data
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
EXPOSE 4321
CMD ["./dist/server/entry.mjs"]