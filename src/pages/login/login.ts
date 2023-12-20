import Block from '../../utils/block';
import './login.css';

import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import getFilledFormFields from '../../utils/getFilledFormFields';
import validate from '../../utils/validate';

const template = `
<div class="popup">
    <div class="popup__header">
        <div class="popup__title">Вход</div>
    </div>
    <div class="popup__body">
        <form class="login-form">
            {{{ inputLogin }}}
            {{#if loginError}}
                <span class="login-form__error">Некорректный логин</span>
            {{/if}}
            {{{ inputPassword }}}
            {{#if passwordError}}
                <span class="login-form__error">Некорректный пароль</span>
            {{/if}}
            <div class="login-form__button-container">
                {{{ buttonLogin }}}
            </div>
        </form>
        {{{ registrationLink }}}
    </div>
</div>
`;

export default class Login extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const events = {
      blur: (e: Event) => {
        this.validateInput(e.target as HTMLFormElement);
      },
    };

    const inputLogin = new Input({
      attr: {
        type: 'text',
        id: 'login',
        name: 'login',
        placeholder: 'Логин',
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

    props = {
      inputLogin,
      inputPassword,
      buttonLogin: new Button({ text: 'Войти', attr: { type: 'submit' } }),
      registrationLink: new Link({ text: 'Зарегистрироваться', attr: { href: '/signin' } }),
      loginError: false,
      passwordError: false,
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
      [`${input.name}Error`]: !validate(input),
    });
  }

  validate() {
    this.validateInput(this.children.inputLogin._element as HTMLFormElement);
    this.validateInput(this.children.inputPassword._element as HTMLFormElement);
  }
}
