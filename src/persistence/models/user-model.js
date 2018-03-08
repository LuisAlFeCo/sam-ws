
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';

import UserSchema from '../schemas/user-schema';
import Transaction from '../transaction';

/****************************************************************************************/

class UserModel {
	constructor(db, authConfig) {
		this.schema = new UserSchema(authConfig);
		this.model = db.connection.model('User', this.schema);
	}

	findAll(select) {
		return Transaction.execTimeout(4000, ()=>{
			let sel = select || 'userName displayName mail roles creationDate modifiedDate';
			return this.model.find({}, sel);
		});
	}

	insertOne(data) {
		let self = this;
		let transaction = new Transaction();

		return transaction.run(function*(){
			let encrypted = self.schema.encryptPassword(data.password);

			let inserted = yield transaction.insert(self.model, {
				userName: data.userName,
				displayName: data.displayName,
				mail: data.mail,
				password: encrypted,
				mailHistory: [{mail: data.mail}],
				passwordHistory: [{encrypted}],
				roles: data.roles
			});

			return inserted;
		});
	}
}

/****************************************************************************************/

export default UserModel;
