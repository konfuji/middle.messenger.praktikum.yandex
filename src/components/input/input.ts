import Block from '../../utils/block';
import './input.css';

const template = '';

export default class Input extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      className: 'input',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
