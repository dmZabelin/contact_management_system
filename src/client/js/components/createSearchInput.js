import { el } from 'redom';

export function createSearchInput() {
	return el('input.header__input-search', { type: 'text', placeholder: 'Введите запрос' });
}
