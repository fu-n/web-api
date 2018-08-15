FROM node:9.3.0-alpine
WORKDIR /app
ADD . /app
RUN apk --no-cache add bash git python make g++
RUN mkdir -p /node_modules && ln -fs /node_modules /app/node_modules
RUN npm install
RUN npm run build
CMD node index.js
