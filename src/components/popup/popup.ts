import Block from '../../utils/block';
import './popup.css';

const template = `
<div class="popup">
    <div class="popup__header">
        <div class="popup__title">{{ title }}</div>
    </div>
    <div class="popup__body">
        {{{ body }}}
    </div>
</div>
`;

export default class Popup extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      title: 'Title',
      body: 'Body',
      classname: 'popup__container',
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
