import {el} from "redom";

export function createTableMessage () {
	return el('p.table-message', 'Клиентов не найдено! Самое время добавить нового клиента.', [
		el('span'),
		el('span'),
		el('span'),
	]);
}
