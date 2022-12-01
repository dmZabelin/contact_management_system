import { el } from 'redom';
import { userLogout } from '../../api/userAuthorization.js';

export default () => {
	const btn = el('button.logout-btn', { type: 'button' }, 'Выйти');

	btn.addEventListener('click', userLogout);

	return btn;
};
