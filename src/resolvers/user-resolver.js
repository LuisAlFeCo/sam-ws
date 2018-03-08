
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

class UserResolver {
	constructor() {
	}

	async index(params, req) {
		let users = await req.db.users.findAll();
		return users;
	}

	async insertAdminUser(params, req) {

		let users = await req.db.users.findAll();

		if(users.length === 0) {
			let user = await req.db.users.insertOne({
				userName: params.userName,
				displayName: params.displayName,
				mail: params.mail,
				password: params.password,
				roles: [{name: 'Administrator'}] 
			});

			return {message: 'Usuario administrador insertado correctamente'};
		} else {
			throw 'Esta acción solo puede ejectarse si no existen usuarios en base de datos';
		}
	}

	resolvers() {
		return {
			users: this.index,
			insertAdminUser: this.insertAdminUser
		};
	}
}

/****************************************************************************************/

export default UserResolver;
