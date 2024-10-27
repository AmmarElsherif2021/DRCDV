FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV DATABASE_URL=mongodb+srv://ammar:Q=Ds*(T1-T2)@cluster0.i96cv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV JWT_SECRET=4331077
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]
