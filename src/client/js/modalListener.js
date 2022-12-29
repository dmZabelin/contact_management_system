import createContactInput from './components/modal/createContactInput.js';
import { selectActions } from './components/modal/createContactSelect.js';

let countContacts = 0;

function modalListener(event) {
	event.preventDefault();
	const modal = event.currentTarget;
	const addContactBtn = modal.querySelector('.add-contact__btn');
	const { target } = event;

	// Delete modal window
	target.hasAttribute('data-close') && deleteModal(modal); // eslint-disable-line no-use-before-define

	// Save form data
	if (target.dataset.action === 'save') {
		const token = JSON.parse(localStorage.getItem('token'));
		const form = document.forms.add;
		const formData = {};
		const contacts = [];

		[...form.elements].forEach((input) => {
			if (input.nodeName === 'INPUT') {
				if (input.classList.contains('form__field-input')) {
					formData[input.name] = input.value;
				} else {
					contacts.push({ socialName: input.name, socialLink: input.value });
				}
			}
		});

		formData.contacts = contacts;

		fetch('/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(formData)
		});
	}

	// Add client contacts field
	if (target.dataset.action === 'add-contact') {
		if (++countContacts === 10) {
			addContactBtn.disabled = true;
		}
		createContactInput(target);
	}

	// Delete client contacts field
	if (target.dataset.action === 'del-contact') {
		const select = target.closest('.contact-field').querySelector('.custom-select');
		--countContacts;
		addContactBtn.disabled = false;
		target.closest('.contact-field').remove();
		select.removeEventListener('click', selectActions);
	}

	if (event instanceof InputEvent) {
		if (target.name === 'contact-input') {
			target.nextElementSibling.hidden = !target.value.length;
		}
	}
}

function deleteModal(modal) {
	countContacts = 0;
	modal.remove();
	modal.removeEventListener('click', modalListener);
	modal.removeEventListener('input', modalListener);
	modal.removeEventListener('submit', modalListener);
}

export default modalListener;
