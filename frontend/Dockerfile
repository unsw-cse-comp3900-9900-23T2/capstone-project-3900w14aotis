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
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install --silent
# add app
COPY . /app/

# Build production
# RUN npm run build
# RUN npm install -g serve

## Start the app on port 3900
# CMD serve -s build -l 3900
CMD ["npm", "start"]