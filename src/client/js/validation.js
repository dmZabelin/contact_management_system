const showError = (input, errMsg) => {
	const formField = input.closest('div.form__field');
	formField.classList.add('error');
	const errField = formField.querySelector('small');
	errField.textContent = errMsg;
};

const removeError = (input) => {
	const formField = input.closest('div.form__field');
	formField.classList.remove('error');
	const errField = formField.querySelector('small');
	errField.textContent = '';
};

const validationParams = {
	username: {
		reg: /^(?=[a-zA-Z._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
		msg: 'Ваше имя не корректно'
	},
	email: {
		reg: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
		msg: 'E-mail введен не корректно'
	},
	password: {
		reg: /^(?=.{6})/,
		msg: 'Введено не достаточное количество символов'
	},
	'confirm-password': {
		reg: /^(?=.{6})/,
		msg: 'Введен не верный пароль'
	}
};

function isFormValid(form) {
	let isValid = true;
	let formData = {};

	const inputs = [...form.elements].filter((el) => el.nodeName === 'INPUT');
	const password = inputs.find((el) => el.name === 'password').value.trim();

	form.addEventListener('input', (e) => {
		if (validationParams[e.target.name].reg.test(e.target.value.trim())) {
			removeError(e.target);
		}
	});

	inputs.forEach((input) => {
		const value = input.value.trim();
		const { name } = input;
		const errMsg = !value ? 'Поле обязательно для заполнения' : validationParams[name].msg;

		if (value === '' || !validationParams[name].reg.test(value)) {
			showError(input, errMsg);
			isValid = false;
		} else {
			formData = { ...formData, [name]: value };
		}

		if (name === 'confirm-password' && value !== password) {
			showError(input, errMsg);
			isValid = false;
		}
	});

	if (isValid) return formData;
}

export default isFormValid;
