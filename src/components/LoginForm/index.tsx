import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Field from './Field';

import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logginCheck } from '../../store/reducers/user';

interface LoginFormProps {
  email: string;
  password: string;
  changeField: ActionCreatorWithPayload<
    { fieldName: 'email' | 'password'; value: string },
    'user/changeField'
  >;
  handleLogin: () => void;
  handleLogout: () => void;
  isLogged?: boolean;
  loggedMessage?: string;
  pseudo: string;
}

function LoginForm({
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
  pseudo,
}: LoginFormProps) {
  const dispatch = useAppDispatch();

  const emailValue = useAppSelector((state) => state.user.credentials.email);
  const passwordValue = useAppSelector(
    (state) => state.user.credentials.password
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      logginCheck({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  const handleChangeField = (
    fieldName: 'email' | 'password',
    newValue: string
  ) => {
    dispatch(changeField({ fieldName, value: newValue }));
  };

  const handleLogout1 = () => {
    dispatch(handleLogout());
  };

  return (
    <div className="login-form">
      {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">
            {loggedMessage}
            {pseudo}
          </p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout1}
          >
            Déconnexion
          </button>
        </div>
      )}
      {!isLogged && (
        <form
          autoComplete="off"
          className="login-form-element"
          onSubmit={handleSubmit}
        >
          <Field
            type="email"
            placeholder="Adresse Email"
            onChange={(newValue) => handleChangeField('email', newValue)}
            value={email}
          />
          <Field
            type="password"
            placeholder="Mot de passe"
            onChange={(newValue) => handleChangeField('password', newValue)}
            value={password}
          />
          <button type="submit" className="login-form-button">
            OK
          </button>
        </form>
      )}
    </div>
  );
}

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;
