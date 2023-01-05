import mongoose, { Schema } from 'mongoose';

const subSchema = mongoose.Schema({
	socialName: String,
	socialLink: String
}, {_id: false})

const ClientSchema = new Schema(
	{
		name: {
			type: String,
			require: true
		},
		surname: {
			type: String,
			require: true
		},
		midname: String,
		contacts: [subSchema],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Client', ClientSchema);
