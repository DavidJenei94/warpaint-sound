FROM node:12-alpine
WORKDIR /app/frontend
COPY /package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
