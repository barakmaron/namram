import { Button } from '@mui/material';
import React from 'react'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { addressTitle, companyNameTitle, faxNumberTitle, fullNameTitle, homePhoneNumberTitle, idNumberTitle, phoneNumberTitle, printTitle } from '../../strings';

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
            <span>{fullNameTitle}: {customer?.FullName}</span>
            <span>{companyNameTitle}: {customer?.CompanyName}</span>
            <span>{phoneNumberTitle}:
                <a href={`tel:${customer?.PhoneNumber}`}
                    className="text-forest-green-500 px-2 font-bold">
                    {customer?.PhoneNumber}
                </a>
            </span>
            <span>{homePhoneNumberTitle}:
                <a href={`tel:${customer?.HomePhoneNumber}`}
                    className="text-forest-green-500 px-2 font-bold">
                    {customer?.HomePhoneNumber}
                </a>
            </span>
            <span>{faxNumberTitle}: {customer?.FaxNumber}</span>
            <span>{idNumberTitle}: {customer?.IdNumber}</span>
            <span>{addressTitle}: {customer?.Address}</span>
        </div>
        <div className='w-fit mx-auto my-4'>
            <Button
                variant="outlined"
                onClick={handle_print}>
                {printTitle}
            </Button>
        </div>
    </div>);
};

export default CustomerData