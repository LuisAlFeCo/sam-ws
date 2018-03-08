
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import moment from 'moment';
moment.locale('es');

/****************************************************************************************/

class Date {
	constructor(connection) {
	}

	static now() {
		return moment().format('L LTS');
	}
}

/****************************************************************************************/

export default {Date};
