import { el } from 'redom';
// eslint-disable-next-line import/no-cycle
import modalListener from '../../modalListener.js';

const ADD_FORM_TITLE = 'Новый клиент';
const DEL_FORM_TITLE = 'Удалить клиента';
const CHANGE_FORM_TITLE = 'Изменить данные';

export function deleteModal(modal) {
	modal.remove();
	modal.removeEventListener('click', modalListener);
	modal.removeEventListener('input', modalListener);
	modal.removeEventListener('submit', modalListener);
}

export default (e) => {
	const { target } = e;
	if (document.body.querySelector('.modal')) return;

	const dataAction = target.dataset.action;

	function checkTitle(title) {
		const titles = {
			add: ADD_FORM_TITLE,
			change: `${CHANGE_FORM_TITLE}<span> ID: 1111</span>`,
			delete: DEL_FORM_TITLE
		};

		// eslint-disable-next-line no-param-reassign
		title.textContent = titles[dataAction];
		return title;
	}

	const modalOverlay = el(
		'.modal',
		{ 'data-close': '' },
		el('.modal__content', [el('span.modal__close', { 'data-close': '' }), el('h3.modal__title', checkTitle)])
	);

	document.body.append(modalOverlay);

	modalOverlay.addEventListener('click', modalListener);
	modalOverlay.addEventListener('input', modalListener);
	modalOverlay.addEventListener('submit', modalListener);
};
