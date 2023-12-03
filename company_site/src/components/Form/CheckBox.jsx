import { FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const CheckBox = ({
    name,
    place_holder
}) => {

    const [checked, setChecked] = useState(false);

  return (<>
        <FormControlLabel                       
        label={place_holder}
        name={name} 
        value={checked.toString()}
        onChange={() => setChecked(value => !value)}
        control={<Checkbox />}
        labelPlacement="end"/>
    </>)
};

export default CheckBox;