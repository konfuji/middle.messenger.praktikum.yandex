import Block from '../../../../utils/block';

const template = `
{{{ fields }}}
<div class="profile-edit__button-container">
    {{{ button }}}
</div>
`;

export default class ProfileEditBody extends Block {
  constructor(props: Record<string, unknown>) {
    super('form', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
