FROM node:21-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["npm", "start"]
