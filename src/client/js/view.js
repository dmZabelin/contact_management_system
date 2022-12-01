// Authorization form Toggle
function toggleForms(forms) {
	forms
		.map((form) => form.querySelector('.btn_toggle'))
		.forEach((btn) => {
			btn.addEventListener('click', () => {
				forms.forEach((form) => {
					// eslint-disable-next-line no-param-reassign
					form.hidden = !form.hidden;
				});
			});
		});
}

// Input hover effects
function inputFormHover(form) {
	for (let i = 0; i < form.length; i++) {
		if (form[i].nodeName === 'INPUT') {
			form[i].addEventListener('input', () => {
				form[i].value.trim() !== '' ? form[i].classList.add('not-empty') : form[i].classList.remove('not-empty');
			});
		}
	}
}

export { toggleForms, inputFormHover };
