import Block from '../../../../utils/block';

const template = `
<div class="profile__field-title">{{ title }}</div>
<div class="profile__field-value">{{ value }}</div>
`;

export default class ProfileField extends Block {
  constructor(props: Record<string, unknown>) {
    props.className = 'profile__field';
    super('li', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
