import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormConnector from '../../../components/Form/FormConnector';
import login_inputs from './FormConstantans';

const Login = ({
  logged_in,
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

  useEffect(() => {
    if(logged_in) {
      navigate('/control_panel');
    }
  }, [logged_in, navigate]);

  return (<div>
    <h2 className=' text-slate-700 text-4xl font-bold text-center bg-amber-500 py-6'>
        התחבר
    </h2>
    <FormConnector inputs={login_inputs} action={LoginSubmit} />
  </div>)
}

export default Login;