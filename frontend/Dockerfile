# pull official base image
FROM node:latest as build
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# Silent clean install of npm
RUN npm ci --silent
# add app
COPY . /app/

CMD ["npm", "start"]