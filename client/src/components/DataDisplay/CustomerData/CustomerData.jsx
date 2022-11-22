import { Button } from '@mui/material';
import React from 'react'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const CustomerData = ({
    customer
}) => {

    const div_ref = useRef();
    const handle_print = useReactToPrint({
        content: () => div_ref.current
    });

  return (<div className='flex flex-col'>
    <div 
    ref={div_ref}
    className='flex flex-col text-2xl px-10 pt-10'
    dir='rtl'>
        <span>שם מלא: {customer?.FullName}</span>
        <span>שם החברה: {customer?.CompanyName}</span>
        <span>מספר טלפון: 
            <a href={`tel:${customer?.PhoneNumber}`}
            className="text-forest-green-500 px-2 font-bold">
                {customer?.PhoneNumber}
            </a>
        </span>
        <span>טלפון בבית: 
            <a href={`tel:${customer?.HomePhoneNumber}`}
            className="text-forest-green-500 px-2 font-bold">
                {customer?.HomePhoneNumber}
            </a>
        </span>
        <span>פקס: {customer?.FaxNumber}</span>
        <span>מספר זהות: {customer?.IdNumber}</span>
        <span>כתובת: {customer?.Address}</span>
    </div>
    <div className='w-fit mx-auto my-4'>
        <Button
        variant="outlined"
        onClick={handle_print}>
            הדפס
        </Button>
    </div>
  </div>);
};

export default CustomerData