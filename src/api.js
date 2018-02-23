
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import path from 'path';
import {buildSchema} from 'graphql';
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

import Demo from './resolvers/demo';

/****************************************************************************************/

class Api {
	constructor() {
		this.schema = this.__buildSchema();
		this.resolvers = this.__buildResolvers();
	}

	__buildSchema() {
		let typesArray = fileLoader(path.join(__dirname, 'api'), { recursive: true }),
			typeDefs = mergeTypes(typesArray);

		return buildSchema(typeDefs);
	}

	__buildResolvers() {
		this.demo = new Demo;
		
		let resolvers = [
			this.demo.resolvers()
		];

		return mergeResolvers(resolvers);
	}
}

/****************************************************************************************/

export default Api;
