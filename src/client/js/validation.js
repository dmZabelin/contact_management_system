const isRequired = (value) => value !== '';

const isBetween = (length, min, max) => !(length < min || length > max);

const isEmailCheck = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const isPasswordSecure = (password) => {
	const re = /^(?=.{8,})/;
	return re.test(password);
};

const showError = (input, message) => {
	const formField = input.parentElement;

	formField.classList.remove('success');
	formField.classList.add('error');

	const error = formField.querySelector('small');
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;

	formField.classList.remove('error');
	formField.classList.add('success');

	const error = formField.querySelector('small');
	error.textContent = '';
};

function checkUsername() {
	let valid = false;
	const min = 3;
	const max = 25;
	const username = this.value.trim();

	if (!isRequired(username)) {
		showError(this, 'Username cannot be blank.');
	} else if (!isBetween(username.length, min, max)) {
		showError(this, `Username must be between ${min} and ${max} characters.`);
	} else {
		showSuccess(this);
		valid = true;
	}
	return { valid, username };
}

function checkEmail() {
	let valid = false;
	const email = this.value.trim();
	if (!isRequired(email)) {
		showError(this, 'Email cannot be blank.');
	} else if (!isEmailCheck(email)) {
		showError(this, 'Email is not valid.');
	} else {
		showSuccess(this);
		valid = true;
	}
	return { valid, email };
}

function checkPassword() {
	let valid = false;

	const password = this.value.trim();

	if (!isRequired(password)) {
		showError(this, 'Password cannot be blank.');
	} else if (!isPasswordSecure(password)) {
		showError(this, 'The password must be eight characters or longer');
	} else {
		showSuccess(this);
		valid = true;
	}

	return { valid, password };
}

function checkConfirmPassword(passwordEl) {
	let valid = false;

	const confirmPassword = this.value.trim();
	const password = passwordEl.value.trim();

	if (!isRequired(confirmPassword)) {
		showError(this, 'Please enter the password again');
	} else if (password !== confirmPassword) {
		showError(this, 'Confirm password does not match');
	} else {
		showSuccess(this);
		valid = true;
	}

	return valid;
}

function isFormValid(form) {
	const isValid = [];
	let formData = {};

	const inputs = [...form.elements].filter((el) => el.nodeName === 'INPUT');
	const passwordEl = inputs.find((el) => el.name === 'password');

	inputs.forEach((input) => {
		switch (input.name) {
			case 'username': {
				input.removeEventListener('input', checkUsername);
				const { valid, username } = checkUsername.call(input);
				if (!valid) input.addEventListener('input', checkUsername);
				isValid.push(valid);
				formData = { ...formData, username };
				break;
			}
			case 'email': {
				input.removeEventListener('input', checkEmail);
				const { valid, email } = checkEmail.call(input);
				if (!valid) input.addEventListener('input', checkEmail);
				isValid.push(valid);
				formData = { ...formData, email };
				break;
			}
			case 'password': {
				input.removeEventListener('input', checkPassword);
				const { valid, password } = checkPassword.call(input);
				if (!valid) input.addEventListener('input', checkPassword);
				isValid.push(valid);
				formData = { ...formData, password };
				break;
			}
			case 'confirm-password':
				isValid.push(checkConfirmPassword.call(input, passwordEl));
				break;
			default:
				break;
		}
	});

	if (isValid.every((el) => el === true)) return formData;
}

export default isFormValid;
