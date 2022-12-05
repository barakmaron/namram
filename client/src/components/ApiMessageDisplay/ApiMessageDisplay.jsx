import React, { useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';

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

export default ApiMessageDisplay;