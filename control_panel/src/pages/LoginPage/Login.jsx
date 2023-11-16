import React, { useCallback, useEffect } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from 'react-router-dom';

import { LoginAction, LogoutAction } from '../../redux/actions/UserActions';
import { getLoggedIn } from "../../redux/selectors/userSelector";

import Form from '../../components/Form/Form';
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
    if (logout) {
      LogoutAction();
      navigate('/');
    }
  }, [logout, LogoutAction, navigate]);

  useEffect(() => {
    if (logged_in && !logout) {
      navigate('/control_panel');
    }
  }, [logged_in, navigate, logout]);

  return (<div>
    <h2 className=' text-slate-700 text-4xl font-bold text-center bg-amber-500 py-6'>
      התחבר
    </h2>
    <Form inputs={login_inputs} action={LoginSubmit} />
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  const logged_in = getLoggedIn(state);
  return {
      ...ownProps,
      logged_in
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
      LoginAction,
      LogoutAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);