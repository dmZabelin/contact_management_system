import { el } from 'redom';

export default () =>
	el('form.form.form_clients#testForm', { name: 'add' }, [
		el('div.form__field', [
			el('input.form__field-input', { type: 'text', name: 'surname', autoComplete: 'off' }),
			el('label', 'Фамилия'),
			el('small')
		]),
		el('div.form__field', [
			el('input.form__field-input', { type: 'text', name: 'name', autoComplete: 'off' }),
			el('label', 'Имя'),
			el('small')
		]),
		el('div.form__field', [
			el('input.form__field-input', { type: 'text', name: 'midname', autoComplete: 'off' }),
			el('label.not-required', 'Отчество'),
			el('small')
		]),
		el(
			'.add-contact',
			el('button.add-contact__btn', { 'data-action': 'add-contact', type: 'button' }, 'Добавить контакт')
		),
		el('button.btn.btn-clients', { type: 'submit', 'data-action': 'save' }, 'Сохранить'),
		el('button.btn-reset', { 'data-close': '' }, 'Отмена')
	]);
