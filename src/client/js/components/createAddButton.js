import { el } from 'redom';

export function createAddButton () {
	return el('button.add-button.main__btn', { 'data-action': 'add' }, 'Добавить клиента');
}
