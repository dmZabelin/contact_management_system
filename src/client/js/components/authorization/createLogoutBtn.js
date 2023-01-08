import { el } from 'redom';
import { userLogout } from '../../api/userAuthorization.js';

export function createLogoutBtn() {
	const btn = el('button.logout-btn', { type: 'button' }, 'Выйти');

	btn.addEventListener('click', userLogout);

	return btn;
};
