import { el } from 'redom';

export function createThemeSwitch() {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		document.documentElement.setAttribute('data-theme', currentTheme);
	}

	function switchTheme(input) {
		if (currentTheme === 'dark') {
			// eslint-disable-next-line no-param-reassign
			input.checked = true;
		}

		input.addEventListener(
			'change',
			() => {
				if (input.checked) {
					document.documentElement.setAttribute('data-theme', 'dark');
					localStorage.setItem('theme', 'dark');
				} else {
					document.documentElement.setAttribute('data-theme', 'light');
					localStorage.setItem('theme', 'light');
				}
			},
			false
		);
	}

	return el(
		'.theme-switch-wrapper',
		el('label.theme-switch', { for: 'checkbox' }, [
			el('input#checkbox', switchTheme, { type: 'checkbox' }),
			el('span.round')
		])
	);
};
