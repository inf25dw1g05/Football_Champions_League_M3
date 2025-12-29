FROM node

WORKDIR /app

COPY package*.json ./

RUN npm i react-admin react-admin-lb4 prop-types

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]