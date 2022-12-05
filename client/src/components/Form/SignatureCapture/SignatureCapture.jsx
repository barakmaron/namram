import { Button, FormHelperText } from '@mui/material';
import React, { useRef } from 'react';
import { useCallback } from 'react';
import SignaturePad from 'react-signature-canvas';

const SignatureCapture = ({
  name,
  setSignature,
  error = undefined
}) => {

  const sig_ref = useRef({});
  
  const clear_sig = useCallback((event) => {
    event.preventDefault();
    sig_ref.current.clear();
  }, []);

  const save_sig = useCallback((event) => {
    event.preventDefault();
    sig_ref.current.getTrimmedCanvas().toBlob(blob => 
      setSignature(new File([blob], `${name}.png`, {
      type: "image/png"
    }, 'image/png')));
  }, [setSignature, name]);

  return (<>
  <div className='w-fit border-2 border-solid border-forest-green-500 py-2 px-2'>
    <SignaturePad
    ref={sig_ref}
    canvasProps={{
      className: 'signatureCanvas'
    }}/>    
    <Button onClick={clear_sig}>
      clear
    </Button>
    <Button onClick={save_sig}>
      save
    </Button>
    { error && <FormHelperText
      error={true}>
          {error}
      </FormHelperText>}
  </div>
  </>);
};

export default SignatureCapture;