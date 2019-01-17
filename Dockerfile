FROM node:alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm ci && npm cache clean --force

# Bundle app source
COPY . .

RUN npm run build

# Remove packages specified in your devDependencies
RUN npm prune --production

CMD npm start