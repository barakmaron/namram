import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Form/Form';
import login_inputs from './FormConstantans';

const Login = ({
  logout,
  LoginAction,
  LogoutAction
}) => {
  const navigate = useNavigate();

  const LoginSubmit = useCallback((event, form) => {
    event.preventDefault();
    LoginAction(form);
  }, [LoginAction]);

  useEffect(() => {
    if(logout) {
      LogoutAction();
      navigate('/');
    }
  },  [logout, LogoutAction, navigate]);

  return (<div>
    <h2 className=' text-slate-700 text-4xl font-bold text-center bg-amber-500 py-6'>
        התחבר
    </h2>
    <Form inputs={login_inputs} action={LoginSubmit} />
  </div>)
}

export default Login;