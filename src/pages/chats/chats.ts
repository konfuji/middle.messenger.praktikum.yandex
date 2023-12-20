import Block from '../../utils/block';
import './chats.css';

import Chat from '../../components/chat/chat';
import Input from '../../components/input/input';
import getFilledFormFields from '../../utils/getFilledFormFields';
import validate from '../../utils/validate';

const template = `
<div class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-header__title">Yamb Messenger</div>
        <a href="/profile" class="sidebar-header__profile-link">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5992 9.19265L18.7724 8.73065C18.6069 8.16343 18.3807 7.61822 18.0975 7.10217L19.7477 
              4.75057C19.8811 4.5607 19.8582 4.30196 19.6941 4.13743L17.834 2.27843C17.668 2.11296 17.4069 2.09143 
              17.2165 2.2287L14.9001 3.89352C14.3792 3.60561 13.8292 3.377 13.2585 3.21104L12.7654 0.396C12.7252 
              0.167391 12.5267 0 12.2943 0H9.66362C9.42925 0 9.22932 0.169783 9.19154 0.401261L8.73428 3.201C8.16032 
              3.366 7.60931 3.59222 7.09036 3.8763L4.78015 2.2263C4.58931 2.09 4.32959 2.112 4.16362 2.277L2.30446 
              4.136C2.1404 4.30004 2.11745 4.5583 2.25089 4.74817L3.87664 7.07396C3.58727 7.59765 3.35673 8.15196 
              3.18884 8.72874L0.399861 9.19313C0.169319 9.23139 0 9.4313 0 9.6647V12.2951C0 12.5271 0.166449 12.7256 
              0.394599 12.7662L3.18358 13.2607C3.35051 13.8361 3.58105 14.3904 3.87138 14.9155L2.22554 17.2174C2.0897 
              17.4073 2.11123 17.6679 2.27624 17.8339L4.13588 19.6948C4.29994 19.8588 4.5587 19.8818 4.74859 
              19.7483L7.07792 18.117C7.6007 18.4044 8.15314 18.6326 8.72567 18.798L9.19249 21.6011C9.23028 21.8312 
              9.42973 22 9.66362 22H12.2943C12.5263 22 12.7248 21.8336 12.7649 21.6054L13.2648 18.7885C13.8382 
              18.6197 14.3878 18.3901 14.9053 18.1022L17.2514 19.7479C17.4418 19.8823 17.7001 19.8588 17.8646 
              19.6948L19.7242 17.8339C19.8897 17.6679 19.9113 17.4063 19.774 17.216L18.1009 14.893C18.3845 14.3765 
              18.6098 13.8303 18.7738 13.2631L21.6044 12.7662C21.8335 12.726 22 12.5271 22 12.2951V9.6647C22.0005 
              9.43035 21.8307 9.23043 21.5992 9.19265ZM11 14.3478C9.15088 14.3478 7.65188 12.849 7.65188 11C7.65188 
              9.15104 9.15088 7.65217 11 7.65217C12.8491 7.65217 14.3481 9.15104 14.3481 11C14.3481 12.849 12.8491 
              14.3478 11 14.3478Z" fill="black"/>
            </svg>
        </a>
    </div>
    <div class="sidebar-search">
        {{{ inputSearch }}}
    </div>
    <ul class="chats">
        {{{ chats }}}
    </ul>
</div>
<div class="conversation__container">
    <div class="conversation">
        <div class="conversation-header">
            <div class="conversation-header__description">
                <div class="conversation-header__pic-container">
                    <div class="conversation-header__pic">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="16" r="16" fill="#EDEDED"/>
                        </svg>
                    </div>
                </div>
                <div class="conversation-header__title-container">
                    <div class="conversation-header__title">Яндекс Директ</div>
                    <div class="conversation-header__status">Online</div>
                </div>
            </div>
            <div class="conversation-header__misc">
                <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 
                  0C2.32843 0 3 0.671573 3 1.5Z" fill="black"/>
                  <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 
                  6C2.32843 6 3 6.67157 3 7.5Z" fill="black"/>
                  <path d="M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 
                  12C2.32843 12 3 12.6716 3 13.5Z" fill="black"/>
                </svg>
            </div>
        </div>
        <div class="conversation__messages"></div>
        <form class="conversation__compose">
            <div class="conversation__compose-attach">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92386L15.7056 
                  6.86667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70068 16.0141L17.2768 8.43792L18.2196 
                  9.38073L10.6435 16.9569L9.70068 16.0141Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 
                  14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 
                  17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708C14.9423 26.4859 10.7118 
                  26.4954 8.10831 23.8919C5.50482 21.2884 5.51431 17.0579 8.12943 14.4428L7.18662 13.5C4.04848 
                  16.6381 4.0371 21.7147 7.16129 24.8389C10.2855 27.9631 15.362 27.9517 18.5002 24.8136L17.5574 
                  23.8708Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 
                  12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48308 14.7628 5.92386L15.7056 
                  6.86667C17.6233 4.94892 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 
                  13.7806Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70068 16.0141C7.95726 17.7575 7.95123 20.5782 
                  9.68689 22.3138C11.4226 24.0495 14.2427 24.0429 15.9861 22.2995L15.0433 21.3567C13.8229 22.5771 
                  11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.4231 18.1773 10.6435 16.9569L9.70068 
                  16.0141Z" fill="#999999"/>
                </svg>
            </div>
            <div class="conversation__compose-message">
                <textarea name="message" id="message" rows="1" class="conversation__compose-textarea" 
                placeholder="Сообщение..."></textarea>
            </div>
            <button class="conversation__compose-send">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Pasted-20231101-221452-svg 1">
                        <path id="Layer" fill-rule="evenodd" clip-rule="evenodd" d="M33 17C33 19.1 32.5 21.2 
                        31.7 23.1C30.9 25 29.8 26.8 28.3 28.3C26.8 29.8 25 30.9 23.1 31.7C21.2 32.5 19.1 33 
                        17 33C14.9 33 12.8 32.5 10.9 31.7C9 30.9 7.2 29.8 5.7 28.3C4.2 26.8 3.1 25 2.3 23.1C1.5 
                        21.2 1 19.1 1 17C1 14.9 1.5 12.8 2.3 10.9C3.1 9 4.2 7.2 5.7 5.7C7.2 4.2 9 3.1 10.9 2.3C12.8 
                        1.5 14.9 1 17 1C19.1 1 21.2 1.5 23.1 2.3C25 3.1 26.8 4.2 28.3 5.7C29.8 7.2 30.9 9 31.7 
                        10.9C32.5 12.8 33 14.9 33 17ZM20 17.2L13.6 17.9C12.2667 18.0333 11.4333 18.7333 11.1 
                        20L10.2 23.1C9.8 24.5 10.2667 24.9 11.6 24.3L25.5 17.6C25.6333 17.5333 25.7333 17.4667 
                        25.8 17.4C25.8667 17.2667 25.9 17.1333 25.9 17C25.9 16.8667 25.8667 16.7333 25.8 
                        16.6C25.7333 16.5333 25.6333 16.4667 25.5 16.4L11.2 9.6C11.0667 9.53333 10.9333 9.5 
                        10.8 9.5C10.6 9.5 10.4333 9.56667 10.3 9.7C10.2333 9.83333 10.1667 9.96667 10.1 
                        10.1C10.0333 10.2333 10.0333 10.4 10.1 10.6L11.3 14.6C11.5667 15.4 12.1333 15.8667 
                        13 16L20 16.8C20.0667 16.8 20.1 16.8333 20.1 16.9C20.1667 16.9 20.2 16.9333 20.2 
                        17C20.2 17.0667 20.1667 17.1 20.1 17.1C20.1 17.1667 20.0667 17.2 20 17.2Z" fill="#2ABCBC"/>
                        <path id="Layer_2" d="M20 16.8L12.9 16C12.1 15.8667 11.5667 15.4 11.3 14.6L10.1 
                        10.6C10.0334 10.4 10.0334 10.2333 10.1 10.1C10.1667 9.96667 10.2334 9.83333 
                        10.3 9.7C10.4334 9.56667 10.6 9.5 10.8 9.5C10.9334 9.5 11.0667 9.53333 11.2 9.6L25.5 
                        16.4C25.6334 16.4667 25.7334 16.5333 25.8 16.6C25.8667 16.7333 25.9 16.8667 25.9 
                        17C25.9 17.1333 25.8667 17.2667 25.8 17.4C25.7334 17.4667 25.6334 17.5333 25.5 
                        17.6L11.6 24.3C10.2667 24.9 9.80005 24.5 10.2 23.1L11.1 20C11.4334 18.7333 12.2334 
                        18.0333 13.5 17.9L20 17.2C20.0667 17.2 20.1 17.1667 20.1 17.1C20.1667 17.1 20.2 
                        17.0667 20.2 17C20.2 16.9333 20.1667 16.9 20.1 16.9C20.1 16.8333 20.0667 
                        16.8 20 16.8Z" fill="white"/>
                    </g>
                </svg>
            </button>
        </form>
    </div>
</div>
`;

export default class Chats extends Block {
  constructor(props: Record<string, unknown> = {}) {
    const inputSearch = new Input({ attr: { name: 'search', placeholder: 'Поиск' } });

    const chats = [
      new Chat({
        title: 'Яндекс Плюс',
        timestamp: '16:52',
        lastMessage: 'Баллы Плюса — это кешбэк баллами, который вы получаете в сервисах '
          + 'Яндекса за поездки, покупки, заказы и развлечения',
        unreadCount: 2,
      }),
      new Chat({
        title: 'Яндекс Директ',
        timestamp: '14:30',
        lastMessage: 'Здравствуйте! \nЗдесь вы можете задать свой вопрос по Директу.',
      }),
      new Chat({ title: 'Андрей', timestamp: '09:21', lastMessage: 'Изображение' }),
      new Chat({
        title: 'Илья',
        timestamp: 'Вт',
        lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!',
        unreadCount: 4,
      }),
      new Chat({ title: 'Вадим', timestamp: 'Сб', lastMessage: 'Круто!' }),
      new Chat({
        title: '1. 2. 3',
        timestamp: '24.10.23',
        lastMessage: 'Миллионы россиян ежедневно проводят десятки часов свое...',
      }),
      new Chat({
        title: 'Design Destroyer',
        timestamp: '19.10.23',
        lastMessage: 'В 2008 году художник Jon Rafman начал собирать...',
      }),
      new Chat({
        title: 'Day.',
        timestamp: '13.10.23',
        lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
      }),
      new Chat({
        title: 'Стас Рогозин',
        timestamp: '01.10.23',
        lastMessage: 'Можно или сегодня или завтра вечером.',
      }),
    ];

    const events = {
      submit: (e: Event) => {
        e.preventDefault();
        console.log(getFilledFormFields(e.target as HTMLFormElement));
        if (!validate(this._element!.querySelector('#message') as HTMLFormElement)) {
          alert('Сообщение не должно быть пустым');
        }
      },
    };

    props = {
      inputSearch,
      chats,
      className: 'messenger',
      events,
    };

    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
