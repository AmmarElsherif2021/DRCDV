FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV DATABASE_URL=mongodb://localhost:27018/drcdv
ENV JWT_SECRET=4331077
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]
