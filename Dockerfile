FROM node:18.15.0

WORKDIR /app

COPY package.json yarn.lock ./

# RUN yarn install --production
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
