from node:20

WORKDIR /app

COPY package* .
RUN npm install
RUN npx prisma generate

copy . .
RUN npx tsc -b

EXPOSE 3000
EXPOSE 8080

CMD ["node" , "dist/index.js"]
CMD ["node" , "dist/Ws/index.js"]
