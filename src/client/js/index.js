import '../styles/main.scss';

import {
	createAddButton,
	createClientsList,
	createHeader,
	createLoginForm,
	createLogoutBtn,
	createModal,
	createSearchInput,
	createSignupForm,
	createTitle
} from './components/index.js';
import { inputFormHover, toggleForms } from './view.js';
import isFormValid from './validation.js';
import { userAuthorization } from './api/userAuthorization.js';

window.addEventListener('DOMContentLoaded', () => {
	const token = JSON.parse(localStorage.getItem('token'));
	const main = document.getElementById('main');
	const { header, themeSwitch } = createHeader();

	function createApp() {
		const searchInput = createSearchInput();
		const logoutBtn = createLogoutBtn();
		const title = createTitle();
		const clientsList = createClientsList();
		const addButton = createAddButton();

		addButton.addEventListener('click', createModal);

		main.innerHTML = '';
		header.classList.remove('no-auth');
		header.insertBefore(searchInput, themeSwitch);
		header.insertBefore(logoutBtn, themeSwitch);
		main.append(title, clientsList.table, addButton);
	}

	if (!token) {
		header.classList.add('no-auth');
		const loginForm = createLoginForm();
		const signupForm = createSignupForm();

		toggleForms([loginForm, signupForm]);

		[loginForm, signupForm].forEach((form) => {
			inputFormHover(form);
			const errorMessage = form.querySelector('.error-message');
			form.addEventListener('submit', async (e) => {
				e.preventDefault();
				const formData = isFormValid(e.target);
				if (formData) {
					try {
						const userData = await userAuthorization(formData, `/${e.target.name}`);
						localStorage.setItem('user', JSON.stringify(userData));
						createApp(userData);
					} catch (err) {
						errorMessage.textContent = err.message;
					}
				}
			});
		});

		main.append(loginForm, signupForm);
	} else {
		const userData = JSON.parse(localStorage.getItem('user'));
		createApp(userData);
	}

	document.body.prepend(header);
});
