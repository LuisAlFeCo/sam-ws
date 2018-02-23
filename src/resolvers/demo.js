
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

class Demo {
	constructor() {
	}

	index() {
		return { message: 'SAM demo message' };
	}

	resolvers() {
		return {
			getDemo: this.index
		};
	}
}

/****************************************************************************************/

export default Demo;
