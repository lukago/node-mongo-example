# node-rest

## Node.js job postings REST API 

Uses Typescript, Node.js, Express and MongoDB.

## Run deployed app
Latest deploy: [https://hidden-citadel-59030.herokuapp.com](https://hidden-citadel-59030.herokuapp.com)

## Run locally

Make sure you have Node.js, npm, gulp and MongoDB installed.
Configure MongoURI and ports in .env file.

Run:

<code>$ npm install</code>

<code>$ npm start</code>


Go to localhost:8180 to check if app is running.

## Run Test.

Run tests using
<code>npm test</code> command.

## Docker build
Docker files are included. Build with docker using
<code>docker-compose up --build</code> command.

## API

Api is under {host-url}/api/v1/*. Example request path: localhost:8180/api/v1/postings

* GET /postings - returs list of all job postings
* GET /postings/:postingId - returns specific posting 
* POST /postings - adds new posting. Example request body is:
```javascript
{ 
      "title": "string",
        "category": "FoodAndDrinks",
        "dateStart": "2012-12-12",
        "dateEnd": "2012-12-15",
        "companyName": "string"
}
```