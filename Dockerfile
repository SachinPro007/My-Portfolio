# 1. BUILD STAGE
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
COPY . .

# Build the React.js application
RUN npm run build

# 2. RUN STAGE
FROM nginx:alpine as runner

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80