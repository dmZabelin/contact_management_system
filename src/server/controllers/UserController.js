import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

// eslint-disable-next-line import/prefer-default-export
export const signup = async (req, res) => {
	try {
		const isUserAuth = await UserModel.findOne({ email: req.body.email });

		if (isUserAuth) {
			return res.status(403).json({ message: 'Пользователь с таким e-mail уже зарегистрирован.' });
		}

		const { password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			username: req.body.username,
			passwordHash: hash
		});

		const user = await doc.save();

		const token = jwt.sign({ _id: user._id }, 'secret_user', { expiresIn: '30d' }, null);

		const { passwordHash, ...userData } = user._doc;

		res.status(201).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({ message: 'Ошибка Авторизации.' });
		}

		const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

		if (!isValidPass) {
			return res.status(404).json({ message: 'Ошибка Авторизации.' });
		}

		const token = jwt.sign({ _id: user._id }, 'secret_user', { expiresIn: '30d' }, null);

		const { passwordHash, ...userData } = user._doc;

		res.status(201).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

export const logout = (req, res) => {
	res.status(201).json({ message: 'success' });
};
