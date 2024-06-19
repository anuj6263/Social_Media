FROM node


COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install

COPY . .
RUN npm install @prisma/client

RUN npx prisma generate

ENTRYPOINT ["npm", "run", "dev"]