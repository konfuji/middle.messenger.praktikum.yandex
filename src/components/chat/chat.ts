import Handlebars from 'handlebars';
import Block from '../../utils/block';
import './chat.css';

Handlebars.registerHelper('breaklines', (text) => {
  text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
});

const template = `
<div class="chat__pic-container">
    <div class="chat__pic">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#EDEDED"/>
        </svg>
    </div>
</div>
<div class="chat__preview-container">
    <div class="chat__preview-row">
        <div class="chat__title">{{ title }}</div>
        <div class="chat__timestamp">{{ timestamp }}</div>
    </div>
    <div class="chat__preview-row">
        <div class="chat__lastMessage">{{ breaklines lastMessage }}</div>
        {{#if unreadCount}}
        <div class="chat__unreadCount">{{ unreadCount }}</div>
        {{/if}}
    </div>
</div>
`;

export default class Chat extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const defaultProps = {
      title: '',
      timestamp: 'recently',
      lastMessage: '',
      className: 'chat',
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
