import React, { useCallback } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Alert, Snackbar } from '@mui/material';
import { getErrors, getFailed, getMessage, getSuccessful } from "../redux/selectors/ApiHandlerSelector"
import { InitApiHandlerAction } from "../redux/actions/ApiHandlerActions";

const ApiMessageDisplay = ({
  successful,
  failed,
  message,
  errors,
  InitApiHandlerAction
}) => {

  const handle_successful = useCallback(() => {
    InitApiHandlerAction();
  }, [InitApiHandlerAction])

  return <div dir="rtl"
    className="fixed top-28 left-[44%] mx-auto w-fit z-50">
    <Snackbar open={successful} autoHideDuration={3000} onClose={handle_successful}>
      <Alert severity="success">
        {message}
      </Alert>
    </Snackbar>
    <Snackbar open={failed}>
      <Alert severity="error">
        {message}
      </Alert>
    </Snackbar>
  </div>;
};


const mapStateToProps = (state, ownProps) => {
  const successful = getSuccessful(state);
  const failed = getFailed(state);
  const message = getMessage(state);
  const errors = getErrors(state);
  return {
    ...ownProps,
    successful,
    failed,
    message,
    errors
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    InitApiHandlerAction
  }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(ApiMessageDisplay);