FROM node:14-alpine
WORKDIR /app/
COPY dist/apps/foodlist-api .
RUN npm install --production

ENV JWT_SECRET=JWTSECRET
ENV API_PORT=3000
ENV DBS_HOST=localhost
ENV DBS_PORT=5432
ENV DBS_USERNAME=postgres
ENV DBS_PASSWORD=mysecretpassword
ENV DBS_DATABASE=postgres
ENV DBS_CA_LOCATION=LOCATION_TO_CA_CRT

ENTRYPOINT [ "node", "main.js" ]
