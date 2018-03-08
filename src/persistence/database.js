
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';

import ImageModel from './models/image-model';
import UserModel from './models/user-model';

/****************************************************************************************/

class Database {
	constructor(config) {
		let dbcfg = config.db;

		let cnnStr = 'mongodb://' + dbcfg.host + '/' + dbcfg.database;

		this.connection = mongoose.createConnection(cnnStr);

		this.connection.on('connected', ()=>{
			console.log('[DB] connected to:', dbcfg.database);
		});

		this.images = new ImageModel(this);
		this.users = new UserModel(this, config.auth);
	}
}

/****************************************************************************************/

export default Database;
