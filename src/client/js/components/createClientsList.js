import { el, setAttr } from 'redom';

export default () => {
	const table = el('table.clients-list');
	const thead = el('thead.clients-list__head');
	const tBody = el('tBody.clients-list__body.isLoading');
	const headRow = el('tr.clients-list__row');

	const dataTitle = [
		'ID',
		'Фамилия Имя Отчество',
		'Дата и время создания',
		'Последние изменения',
		'Контакты',
		'Действия'
	];

	dataTitle.forEach((title, index) => {
		const headData = el('th.clients-list__data-head');
		let filterBtn = null;
		index <= 3 ? (filterBtn = el('button')) : (filterBtn = el('span'));
		filterBtn.textContent = title;
		if (index === 0) {
			setAttr(filterBtn, { className: 'active' });
		}
		headData.append(filterBtn);
		headRow.append(headData);
	});

	table.addEventListener('click', (e) => {
		const { target } = e;
		if (target.nodeName !== 'BUTTON') return;
		thead.querySelectorAll('button').forEach((btn) => {
			btn.classList.remove('active');
		});
		target.classList.add('active');
	});
	thead.append(headRow);
	table.append(thead, tBody);
	return { table, tBody };
};
