import React, { useCallback } from 'react';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import Form from '../../components/Form/Form';
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
    <div className='py-10 mx-auto flex flex-col sm:flex-row items-start justify-center gap-5' dir='rtl'>
        <div className='border-l-2 border-green-600 border-solid px-4 flex flex-col items-start'>
            <h3 className=' text-slate-700 font-bold text-3xl'>טופס צור קשר</h3>
            <Form inputs={contact_inputs} action={send_form} />
        </div>
        <div className=' flex flex-col items-start h-full justify-start'>
            <h3 className=' text-slate-700 font-bold text-3xl'>פרטים ליצרת קשר</h3>
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