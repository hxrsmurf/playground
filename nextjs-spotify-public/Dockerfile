FROM node:18-alpine

COPY package.json .
RUN npm install
COPY . .
ARG CACHE=0
RUN npm run build
CMD npm run start