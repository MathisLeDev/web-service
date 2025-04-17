FROM node:23-alpine3.20

WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4000

# Command to start the application
CMD ["yarn", "dev"]