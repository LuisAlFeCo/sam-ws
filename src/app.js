
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import http from 'http';
import path from 'path';

import express from 'express';
import jsonfile from 'jsonfile';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import Api from './api';

/****************************************************************************************/

class App {
	constructor() {
		this.config = jsonfile.readFileSync(path.join(__dirname, 'config.json'));

		this.express = express();

		this.init();
	}

	init() {
		this.api = new Api();

		this.express.use(this.onRequest.bind(this));
		this.express.use(cors());
		this.express.use('/graphql', graphqlHTTP({
			schema: this.api.schema,
			rootValue: this.api.resolvers,
			graphiql: false,
		}));

		this.server = http.createServer(this.express);
		this.server.listen(this.config.port, this.onStart.bind(this));
	}

	onStart() {
		console.log('INFORMACIÓN: El servidor está listo y escuchando por el puerto:', this.config.port);
	}

	onRequest(req, res, next) {
		next();
	}
}

/****************************************************************************************/

export default App;
