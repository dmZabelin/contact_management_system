import { el } from 'redom';

export default () =>
	el('form.form.form_clients', { name: 'add' }, [
		el('div.form__field', [
			el('input.surname', { type: 'text', name: 'surname', autoComplete: 'off' }),
			el('label', 'Фамилия'),
			el('small')
		]),
		el('div.form__field', [
			el('input.name', { type: 'text', name: 'name', autoComplete: 'off' }),
			el('label', 'Имя'),
			el('small')
		]),
		el('div.form__field', [
			el('input.midname', { type: 'text', name: 'midname', autoComplete: 'off' }),
			el('label.not-required', 'Отчество'),
			el('small')
		]),
		el('.add-contact', el('button.add-contact__btn', { 'data-action': 'add-contact' }, 'Добавить контакт')),
		el('button.btn.btn-clients', { type: 'submit' }, 'Сохранить'),
		el('button.btn-reset', { 'data-close': '' }, 'Отмена')
	]);
