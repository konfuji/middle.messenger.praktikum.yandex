import Block from '../../utils/block';
import './link.css';

const template = `
{{ text }}
`;

export default class Link extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      className: 'link',
      text: 'Link',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    super('a', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
