import './app.css';

// Import pages
import Login from './pages/login/login';
import SignIn from './pages/signin/signIn';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profileEdit/profileEdit';
import Chats from './pages/chats/chats';
import Error from './pages/error/error';

document.addEventListener('DOMContentLoaded', (): void => {
  const root = document.querySelector('#app');
  if (!root) {
    throw new Error({ text: 'Root element not found' });
  }

  let page;
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      page = new Login();
      break;

    case '/signin':
      page = new SignIn();
      break;

    case '/profile':
      page = new Profile();
      break;

    case '/profile-edit':
      page = new ProfileEdit();
      break;

    case '/chats':
      page = new Chats();
      break;

    case '/500':
      page = new Error();
      break;

    default:
      page = new Error({ code: 404, title: 'Такой страницы не существует' });
  }

  root.appendChild(page.getContent() as HTMLElement);
});
