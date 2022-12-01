import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import * as UserController from './controllers/UserController.js';
import checkAuth from './utils/checkAuth.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
// const URI_PREFIX = '/api/clients';

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(`DB error: ${err}`));

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

app.get('/', checkAuth, async (req, res) => {
	console.log(req);
	// res.status(201).json({ ...req.user });
});

app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.get('/logout', checkAuth, UserController.logout);

app.listen(PORT, () => {
	console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
});
