# syntax = docker/dockerfile:1

# Adjust BUN as desired
FROM imbios/bun-node as base

# Install bun
RUN curl https://bun.sh/install | bash

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Copy application code
COPY --link . .

# Install node modules
COPY --link bun.lock package.json ./
RUN bun install

# Final stage for app image
FROM base

RUN apt-get update && \
    apt-get install --no-install-recommends -y openssl tzdata && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
    
ENV TZ=America/Sao_Paulo

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

RUN bun run build

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
