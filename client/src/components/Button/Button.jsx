import React from 'react';
import { Button } from '@mui/material';

export const SIZE = {
    SMALL: "small",
    LARGE: "large"
};

const CostumeButton = ({
    action,
    text,
    size,
}) => {
  return (<Button 
    variant="contained"
    color="success"
    size={size}
    onClick={action}>
        {text}
    </Button>);
};

export default CostumeButton;