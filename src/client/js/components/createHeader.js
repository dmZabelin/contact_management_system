import { el, setChildren } from 'redom';
import {svgLogo} from "./svgLogo.js";
import {createThemeSwitch} from "./createThemeSwitch.js";

export function createHeader () {
	const themeSwitch = createThemeSwitch();
	const header = el('header.header');

	const logo = el('.header__logo');
	logo.innerHTML = svgLogo();

	setChildren(header, [logo, themeSwitch]);

	return { header, themeSwitch };
}
