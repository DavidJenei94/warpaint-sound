FROM node:12-alpine
WORKDIR /app/backend
COPY /package*.json ./
RUN npm install
COPY . .
EXPOSE 8002
CMD ["npm", "run", "dev"]
