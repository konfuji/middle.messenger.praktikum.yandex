import Block from '../../../../utils/block';
import Link from '../../../../components/link/link';

const template = `
{{{ link }}}
`;

export default class ListLink extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      linkClassName: 'link',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    props.link = new Link({
      text: props.linkText,
      attr: { href: props.linkHref },
      className: props.linkClassName,
    });
    super('li', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
