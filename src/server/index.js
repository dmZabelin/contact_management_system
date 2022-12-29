import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import * as UserController from './controllers/UserController.js';
import checkAuth from './utils/checkAuth.js';

import ClientModel from './models/client.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
// const URI_PREFIX = '/api/clients';

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(`DB error: ${err}`));

const app = express();

app.use(express.static('public'));
app.use(express.json());

/* app.get('/', checkAuth, async (req, res) => {
	// console.log(req);
	// res.status(201).json({ ...req.user });
}); */

app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.get('/logout', checkAuth, UserController.logout);

app.post('/clients', checkAuth, async (req, res) => {
	try {
		const doc = new ClientModel({
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
});

app.listen(PORT, () => {
	console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
});
