import { el } from 'redom';
import modalListener from '../../modalListener.js';
import createModalForm from './createModalForm.js';
import { inputFormHover } from '../../view.js';

const ADD_FORM_TITLE = 'Новый клиент';
const DEL_FORM_TITLE = 'Удалить клиента';
const CHANGE_FORM_TITLE = 'Изменить данные';

export default (e) => {
	const { target } = e;
	if (document.body.querySelector('.modal')) return;

	window.__contactCount = 0;
	const dataAction = target.dataset.action;

	function checkTitle(title) {
		const titles = {
			add: ADD_FORM_TITLE,
			change: `${CHANGE_FORM_TITLE}<span> ID: 1111</span>`,
			delete: DEL_FORM_TITLE
		};

		title.textContent = titles[dataAction]; // eslint-disable-line no-param-reassign
		return title;
	}

	const form = createModalForm();
	inputFormHover(form);
	const modalOverlay = el(
		'.modal',
		{ 'data-close': '' },
		el('.modal__content', [el('span.modal__close', { 'data-close': '' }), el('h3.modal__title', checkTitle), form])
	);

	document.body.append(modalOverlay);

	modalOverlay.addEventListener('click', modalListener);
	modalOverlay.addEventListener('input', modalListener);
	modalOverlay.addEventListener('submit', modalListener);
};
