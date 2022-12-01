import { el, setChildren } from 'redom';
import logoImg from '../../assets/images/dm_logo.svg';
import createThemeSwitch from './createThemeSwitch.js';

export default () => {
	const themeSwitch = createThemeSwitch();
	const header = el('header.header');

	const logo = el('img.header__logo', { src: logoImg, alt: 'Logo' });

	setChildren(header, [logo, themeSwitch]);

	return { header, themeSwitch };
};
