import Block from '../../utils/block';
import './profile.css';

import Link from '../../components/link/link';
import Popup from '../../components/popup/popup';
import ProfileBody from './components/profileBody/profileBody';
import ListLink from './components/listLink/listLink';
import ProfileField from './components/profileField/profileField';

const template = `
{{{ popup }}}
`;

export default class Profile extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const profileBody = new ProfileBody({
      changePicLink: new Link({ text: 'Сменить фото', attr: { href: '#' } }),
      fields: [
        new ProfileField({ title: 'Почта', value: 'konfuji@yandex.ru' }),
        new ProfileField({ title: 'Логин', value: 'konfuji' }),
        new ProfileField({ title: 'Имя', value: 'Александр' }),
        new ProfileField({ title: 'Фамилия', value: 'Привалов' }),
        new ProfileField({ title: 'Имя в чате', value: 'Александр П.' }),
        new ProfileField({ title: 'Телефон', value: '03' }),
      ],
      links: [
        new ListLink({
          linkText: 'Изменить данные',
          linkHref: '/profile-edit',
          className: 'profile__link',
        }),
        new ListLink({
          linkText: 'Изменить пароль',
          linkHref: '#',
          className: 'profile__link',
        }),
        new ListLink({
          linkText: 'Выйти',
          linkHref: '/',
          linkClassName: 'link link_red',
          className: 'profile__link',
        }),
      ],
      className: 'profile',
    });

    props = {
      popup: new Popup({ title: 'Профиль', body: profileBody }),
      className: 'popup__container',
    };

    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
