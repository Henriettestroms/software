# Step 1: Bygg appen
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Kjør appen
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
