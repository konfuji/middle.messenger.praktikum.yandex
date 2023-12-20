import Block from '../../../../utils/block';
import './profileEditField.css';
import Input from '../../../../components/input/input';
import validate from '../../../../utils/validate';

const template = `
<label for="{{ for }}" class="profile-edit__field-label">{{ label }}</label>
{{{ input }}}
{{#if error}}
    <span class="profile-edit__field-error">{{ errorMessage }}</span>
{{/if}}
`;

export default class ProfileEditField extends Block {
  constructor(props: Record<string, unknown>) {
    const defaultProps = {
      className: 'profile-edit__field',
      for: props.name,
      error: false,
      errorMessage: 'Ошибка',
    };
    props = {
      ...defaultProps,
      ...props,
    };

    props.input = new Input({
      attr: {
        id: props.name,
        name: props.name,
        type: props.type ? props.type : 'text',
        value: props.value ? props.value : '',
      },
    });
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }

  validate(event: Event | null = null) {
    const input = event ? event.target : this._element!.querySelector('input');

    const error = !validate(input as HTMLFormElement);
    this.setProps({
      error,
    });
    return error;
  }
}
