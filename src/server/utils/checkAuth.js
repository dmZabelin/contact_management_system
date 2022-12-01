import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export default async (req, res, next) => {
	if (!req.cookies.token) {
		return next();
	}
	try {
		const { _id } = jwt.verify(req.cookies.token, 'secret_user', null, null);
		req.user = await UserModel.findOne({ _id });
		next();
	} catch (err) {
		console.log(err.message);
		return res.sendStatus(404);
	}
	next();
};
