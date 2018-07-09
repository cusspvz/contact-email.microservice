FROM node:10.6-alpine
WORKDIR /app
ADD package*.json /app/
RUN npm install --prod

ADD build/ /app/build
CMD [ "/usr/local/bin/npm", "start" ]