const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingsSchema = new Schema(
	{
		event: {
			type: {
				type: Schema.Types.ObjectId,
				ref: 'Event'
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Booking', bookingsSchema);
