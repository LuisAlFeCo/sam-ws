
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';

import SAM from '../../gears/date';

/****************************************************************************************/

class ImageSchema extends mongoose.Schema {
	constructor() {
		super({
			data: { type: Buffer, required: true },
			mimetype: { type: String, required: true },
			creationDate: { type: String, default: SAM.Date.now }
		});
	}
}

/****************************************************************************************/

export default ImageSchema;
