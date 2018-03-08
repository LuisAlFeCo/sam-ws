
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import crypto from 'crypto';

import SAM from '../../gears/date';

/****************************************************************************************/

class UserSchema extends mongoose.Schema {
	constructor(authConfig) {
		let mailSchema = new mongoose.Schema({
			mail: { type: String, required: true, unique: true },
			creationDate: { type: String, default: SAM.Date.now }
		});

		let passwordSchema = new mongoose.Schema({
			encrypted: { type: String, required: true },
			creationDate: { type: String, default: SAM.Date.now }
		});

		let profileImageSchema = new mongoose.Schema({
			image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
			creationDate: { type: String, default: SAM.Date.now }
		});

		let roleSchema = new mongoose.Schema({
			name: { type: String, required: true, default: 'guest' }
		});

		super({
			userName: { type: String },
			displayName: { type: String, required: true },
			mail: { type: String, required: true, unique: true },
			password: { type: String, required: true },

			mailHistory: [mailSchema],
			passwordHistory: [passwordSchema],
			profileImageHistory: [profileImageSchema],

			roles: [roleSchema],

			creationDate: { type: String, default: SAM.Date.now },
			modifiedDate: { type: String, default: SAM.Date.now }
		});

		this.path('mailHistory').validate((value) => {
			return value.length;
		}, 'El campo <mailHistory> no puede ser un array vacío');

		this.path('passwordHistory').validate((value) => {
			return value.length;
		}, 'El campo <passwordHistory> no puede ser un array vacío');

		this.path('roles').validate((value) => {
			return value.length;
		}, 'El campo <roles> no puede ser un array vacío');


		this.config = authConfig;
	}


	encryptPassword(text){
		let cfg = this.config.passwordCrypt,
			cipher = crypto.createCipheriv(cfg.algorithm, cfg.secret, Buffer.from(cfg.iv, 'hex')),
			crypted = cipher.update(text, 'utf8', 'hex');

		crypted += cipher.final('hex');
		return crypted;
	}

	decryptPassword(text){
		let cfg = this.config.passwordCrypt,
			decipher = crypto.createDecipheriv(cfg.algorithm, cfg.secret, Buffer.from(cfg.iv, 'hex')),
			dec = decipher.update(text, 'hex', 'utf8');

		dec += decipher.final('utf8');
		return dec;
	}
}

/****************************************************************************************/

export default UserSchema;
