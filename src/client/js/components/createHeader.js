import { el, setChildren } from 'redom';
import createThemeSwitch from './createThemeSwitch.js';
import { svgLogo } from './index.js';

export default () => {
	const themeSwitch = createThemeSwitch();
	const header = el('header.header');

	const logo = el('.header__logo');
	logo.innerHTML = svgLogo();

	setChildren(header, [logo, themeSwitch]);

	return { header, themeSwitch };
};
