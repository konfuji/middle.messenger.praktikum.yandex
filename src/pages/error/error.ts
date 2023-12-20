import Block from '../../utils/block';
import './error.css';

import Link from '../../components/link/link';

const template = `
<h1 class="error__code">{{ code }}</h1>
<h2 class="error__title">{{ title }}</h2>
{{{ link }}}
`;

export default class Error extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      code: '500',
      title: 'Мы уже фиксим',
      link: new Link({ text: 'Назад к чатам', attr: { href: '/chats' } }),
      className: 'error__container',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
