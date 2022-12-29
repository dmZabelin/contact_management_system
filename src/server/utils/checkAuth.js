import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export default async (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
	if (token) {
		try {
			const { _id } = jwt.verify(token, 'secret_user', null, null);
			req.user = await UserModel.findOne({ _id });
			next();
		} catch (err) {
			return res.status(403).json({
				message: 'No access'
			});
		}
	} else {
		return res.status(403).json({
			message: 'No access'
		});
	}
};
