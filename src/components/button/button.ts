import Block from '../../utils/block';
import './button.css';

const template = `
{{ text }}
`;

export default class Button extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      className: 'button',
      text: 'Button',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
