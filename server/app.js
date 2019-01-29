const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
});

app.use(
	'/graphql',
	graphqlHttp({
		schema: graphQlSchema,
		rootValue: graphQlResolver,
		graphiql: true
	})
);

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@atcoster-vwnyc.mongodb.net/${
			process.env.MONGO_DB
		}?retryWrites=true`,
		{ useNewUrlParser: true }
	)
	.then(() => {
		app.listen(3001, () => {
			console.log('Server is running on port 3001!');
		});
	})
	.catch(err => {
		console.log(err);
	});
