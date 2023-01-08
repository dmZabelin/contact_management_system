import ClientModel from '../models/client.js';

// eslint-disable-next-line import/prefer-default-export
export const addClient = async (req, res) => {
	try {
		const doc = new ClientModel({
			clientId: Date.now().toString(),
			name: req.body.name,
			surname: req.body.surname,
			midname: req.body.midname,
			contacts: req.body.contacts,
			user: req.user
		});

		const client = await doc.save();
		res.json(client);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to create client.' });
	}
};

export const getAllClients = async (req, res) => {
	console.log(req.user);
	try {
		const data = await ClientModel.find({ user: req.user._id }).exec();
		res.status(201).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error.' });
	}
};
