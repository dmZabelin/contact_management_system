import mongoose, { Schema } from 'mongoose';

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
		contacts: [{ socialName: String, socialLink: String }],
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
