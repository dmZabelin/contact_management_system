import { el } from 'redom';

export default () =>
	el('form.form.form_auth', { name: 'login', hidden: false }, [
		el('h2.form__title', 'Форма входа'),
		el('button.btn_toggle', { type: 'button' }, 'Зарегистрироваться'),
		el('div.form__field', [
			el('input.email', { type: 'text', name: 'email', autoComplete: 'off' }),
			el('label', 'Введите E-mail'),
			el('small')
		]),
		el('div.form__field', [
			el('input.password', { type: 'password', name: 'password', autoComplete: 'off' }),
			el('label', 'Введите пароль'),
			el('small')
		]),
		el('button.btn.btn_auth', { type: 'submit' }, 'Отправить'),
		el('p.error-message')
	]);
