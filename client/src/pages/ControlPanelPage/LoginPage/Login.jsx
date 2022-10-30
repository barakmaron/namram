import React from 'react';
import Form from '../../../components/Form/Form';
import Constants from '../../../Constants';

const Login = () => {
  return (<div>
    <h2 className=' text-slate-700 text-xl font-bold text-center bg-amber-500'>
        התחבר
    </h2>
    <Form inputs={Constants.login_inputs} action={() => {}} />
  </div>)
}

export default Login;