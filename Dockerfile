FROM node:12.20.1-alpine3.10

RUN apk update && apk add build-base git python

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 4000
ENV PORT 4000
ENV DB_HOST host.docker.internal
ENV DB_NAME TodoApiNode
ENV SECRET_KEY wXYwROj1yvRscOPBqBqfkg==
ENV QUERY_PARAMS sort,paginate,pagesize,page,relation

CMD ["yarn", "start:prod"]