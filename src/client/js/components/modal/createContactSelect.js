import { el } from 'redom';

const selectOptions = {
	phone: 'Телефон',
	extPhone: 'Доп. телефон',
	email: 'Email',
	facebook: 'Facebook',
	vk: 'Vk'
};

export function selectActions(e) {
	const btn = this.querySelector('.custom-select__button');
	const list = this.querySelector('.custom-select__list');
	const items = this.querySelectorAll('.custom-select__list-item');
	const input = this.querySelector('input[name=select-category]');

	btn.classList.toggle('active');
	list.classList.toggle('visible');

	if (e.target.classList.contains('custom-select__list-item')) {
		items.forEach((item) => {
			item.classList.remove('selected');
		});
		e.target.classList.add('selected');
		btn.textContent = e.target.textContent;

		input.value = e.target.dataset.value;
		list.classList.remove('visible');
	}

	document.addEventListener('click', (ev) => {
		if (ev.target !== btn) {
			btn.classList.remove('active');
			list.classList.remove('visible');
		}
	});

	document.addEventListener('keydown', (ev) => {
		if (ev.key === 'Tab' || ev.key === 'Escape') {
			btn.classList.remove('active');
			list.classList.remove('visible');
		}
	});
}

export default () => {
	const select = el('div.custom-select', [
		el('button.custom-select__button', { type: 'button', 'data-select': '' }, 'Телефон'),
		el('ul.custom-select__list', [
			Object.entries(selectOptions).map(([val, text], index) =>
				el(
					index === 0 ? 'li.custom-select__list-item.selected' : 'li.custom-select__list-item',
					{ 'data-value': val },
					text
				)
			)
		]),
		el('input', { type: 'text', name: 'select-category', value: '', hidden: true })
	]);

	select.addEventListener('click', selectActions);

	return select;
};
