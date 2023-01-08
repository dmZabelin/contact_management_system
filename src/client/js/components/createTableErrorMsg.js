import {el} from "redom";

export function createTableErrorMsg(msg) {
	return el('p.table-error-msg', `${msg}`)
}
