import mongoose, { Schema } from 'mongoose';

const subSchema = mongoose.Schema({
	socialName: String,
	socialLink: String
}, {_id: false})

const ClientSchema = new Schema(
	{
		clientId: {
			type: String,
			require: true,
		},
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
		timestamps: true,
		toJSON: { virtuals: true }
	}
);

ClientSchema.virtual('fullName').get(function() {
	return `${this.surname  } ${  this.name  } ${  this.midname}`;
});

export default mongoose.model('Client', ClientSchema);
