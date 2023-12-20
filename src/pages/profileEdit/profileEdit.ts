import Block from '../../utils/block';
import './profileEdit.css';

import Popup from '../../components/popup/popup';
import ProfileEditBody from './components/profileEditBody/profileEditBody';
import Button from '../../components/button/button';
import ProfileEditField from './components/profileEditField/profileEditField';
import getFilledFormFields from '../../utils/getFilledFormFields';

const template = `
{{{ popup }}}
`;

export default class ProfileEdit extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const events = () => ({
      focusout(this: ProfileEditField, e: Event) {
        this.validate(e);
      },
    });

    const profileEditBody = new ProfileEditBody({
      fields: [
        new ProfileEditField({
          label: 'Почта',
          name: 'email',
          value: 'konfuji@ya.ru',
          errorMessage: 'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, '
            + 'обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
          events: events(),
        }),
        new ProfileEditField({
          label: 'Логин',
          name: 'login',
          value: 'konfuji',
          errorMessage: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов '
            + 'и спецсимволов (допустимы дефис и нижнее подчёркивание)',
          events: events(),
        }),
        new ProfileEditField({
          label: 'Имя',
          name: 'first_name',
          value: 'Александр',
          errorMessage: 'Латиница или кириллица, первая буква заглавная, без пробелов, '
            + 'цифр и спецсимволов (дефис — можно)',
          events: events(),
        }),
        new ProfileEditField({
          label: 'Фамилия',
          name: 'second_name',
          value: 'Привалов',
          errorMessage: 'Латиница или кириллица, первая буква заглавная, без пробелов, '
            + 'цифр и спецсимволов (дефис — можно)',
          events: events(),
        }),
        new ProfileEditField({
          label: 'Имя в чате', name: 'display_name', value: 'Александр П.', events: events(),
        }),
        new ProfileEditField({
          label: 'Телефон',
          name: 'phone',
          value: '03',
          errorMessage: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
          events: events(),
        }),
      ],
      button: new Button({ text: 'Сохранить', attr: { type: 'submit' } }),
      className: 'profile-edit__form',
    });

    props = {
      popup: new Popup({ title: 'Изменить данные', body: profileEditBody }),
      className: 'popup__container',
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log(getFilledFormFields(e.target as HTMLFormElement));
          this.validate();
        },
      },
    };

    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }

  validate() {
    const formFields: ProfileEditField[] = this.children.popup.children.body.lists.fields;
    formFields.forEach((field) => field.validate());
  }
}
