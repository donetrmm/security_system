FROM node:20.12.1

WORKDIR /app

COPY ./api-security-system ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
