FROM node:18-alpine
copy . .
RUN npm install
RUN npm run build
CMD npm run start