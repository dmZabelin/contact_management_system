// eslint-disable-next-line import/no-cycle
import { deleteModal } from './components/modal/createModal.js';

export default (event) => {
	const modal = event.currentTarget;
	const { target } = event;
	target.hasAttribute('data-close') && deleteModal(modal);
};
