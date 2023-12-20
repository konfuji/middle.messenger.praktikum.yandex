import Block from '../../utils/block';
import './signin.css';

import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import getFilledFormFields from '../../utils/getFilledFormFields';
import validate from '../../utils/validate';

const template = `
<div class="popup">
    <div class="popup__header">
        <div class="popup__title">Регистрация</div>
    </div>
    <div class="popup__body">
        <form class="signin-form">
            {{{ inputEmail }}}
            {{#if emailError}}
                <span class="signin-form__error">Некорректный email</span>
            {{/if}}
            {{{ inputLogin }}}
            {{#if loginError}}
                <span class="signin-form__error">Некорректный логин</span>
            {{/if}}
            {{{ inputFirstName }}}
            {{#if firstNameError}}
                <span class="signin-form__error">Некорректное имя</span>
            {{/if}}
            {{{ inputSecondName }}}
            {{#if secondNameError}}
                <span class="signin-form__error">Некорректная фамилия</span>
            {{/if}}
            {{{ inputPhone }}}
            {{#if phoneError}}
                <span class="signin-form__error">Некорректный номер телефона</span>
            {{/if}}
            {{{ inputPassword }}}
            {{#if passwordError}}
                <span class="signin-form__error">Некорректный пароль</span>
            {{/if}}
            {{{ inputRepeatPassword }}}
            {{#if repeatPasswordError}}
                <span class="signin-form__error">Некорректный пароль</span>
            {{/if}}
            <div class="signin-form__button-container">
                {{{ buttonLogin }}}
            </div>
        </form>
        {{{ loginLink }}}
    </div>
</div>
`;

export default class SignIn extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const events = {
      blur: (e: Event) => {
        this.validateInput(e.target as HTMLFormElement);
      },
    };

    const inputEmail = new Input({
      attr: {
        type: 'text',
        id: 'email',
        name: 'email',
        placeholder: 'Email',
      },
      events,
    });

    const inputLogin = new Input({
      attr: {
        type: 'text',
        id: 'login',
        name: 'login',
        placeholder: 'Логин',
      },
      events,
    });

    const inputFirstName = new Input({
      attr: {
        type: 'text',
        id: 'firstName',
        name: 'first_name',
        placeholder: 'Имя',
      },
      events,
    });

    const inputSecondName = new Input({
      attr: {
        type: 'text',
        id: 'secondName',
        name: 'second_name',
        placeholder: 'Фамилия',
      },
      events,
    });

    const inputPhone = new Input({
      attr: {
        type: 'text',
        id: 'phone',
        name: 'phone',
        placeholder: 'Телефон',
      },
      events,
    });

    const inputPassword = new Input({
      attr: {
        type: 'password',
        id: 'password',
        name: 'password',
        placeholder: 'Пароль',
      },
      events,
    });

    const inputRepeatPassword = new Input({
      attr: {
        type: 'password',
        id: 'repeatPassword',
        name: 'repeat_password',
        placeholder: 'Пароль (ещё раз)',
      },
      events,
    });

    props = {
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputRepeatPassword,
      buttonLogin: new Button({ text: 'Зарегистрироваться', attr: { type: 'submit' } }),
      loginLink: new Link({ text: 'Войти', attr: { href: '/' } }),
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

  validateInput(input: HTMLFormElement) {
    this.setProps({
      [`${input.id}Error`]: !validate(input),
    });
  }

  validate() {
    [
      'inputEmail',
      'inputLogin',
      'inputFirstName',
      'inputSecondName',
      'inputPhone',
      'inputPassword',
      'inputRepeatPassword',
    ].forEach((inputName) => this.validateInput(this.children[inputName]._element as HTMLFormElement));
  }
}
