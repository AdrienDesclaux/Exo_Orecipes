import { useAppSelector } from '../../hooks/redux';
import {
  changeField,
  handleLogin,
  handleLogout,
} from '../../store/reducers/user';
import LoginForm from '../LoginForm';
import './styles.scss';

function AppHeader() {
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const isLogged = useAppSelector((state) => state.user.logged);
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const loggedMessage = 'Bonjour';

  return (
    <header className="header">
      <img src="/logo.png" className="header-logo" alt="Logo oRecipes" />
      <LoginForm
        email={email}
        password={password}
        isLogged={isLogged}
        loggedMessage={loggedMessage}
        changeField={changeField}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        pseudo={pseudo}
      />
    </header>
  );
}

export default AppHeader;
