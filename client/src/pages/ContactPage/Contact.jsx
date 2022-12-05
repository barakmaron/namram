import React, { useCallback } from 'react';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import FormConnector from '../../components/Form/FormConnector';
import Map from '../../components/Map/Map';
import Constants from '../../Constants';
import contact_inputs from './FormConstantans';

const Contact = ({
    SendContactForm
}) => {

    const send_form = useCallback((event, form) => {
        event.preventDefault();
        SendContactForm(form);
    }, [SendContactForm]);

  return (<>
    <div className='flex justify-center py-2 bg-amber-500 shadow-inner bg-center'>
        <h2 className='text-4xl text-slate-700 font-bold'>צור קשר</h2>
    </div>
    <div className='sm:py-10 py-4 mx-auto flex flex-col sm:flex-row items-start justify-center gap-5' dir='rtl'>
        <div className='border-l-2 sm:border-green-600 border-solid px-4 flex flex-col sm:items-start items-center'>
            <h3 className=' text-slate-700 font-bold sm:text-3xl text-2xl text-center'>טופס צור קשר</h3>
            <FormConnector inputs={contact_inputs} action={send_form} />
        </div>
        <div className=' flex flex-col h-full sm:items-start items-center'>
            <h3 className='text-slate-700 font-bold sm:text-3xl text-2xl text-center'>פרטים ליצרת קשר</h3>
            <div className='pr-4'>
                <ContactInfo/>
            </div>
        </div>
    </div>
    <div>
        <Map location={Constants.maps.ashdod}/>
    </div>
  </>);
};

export default Contact;