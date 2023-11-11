import React from 'react';
import Constants from '../Constants';
import { faxNumberTitle } from '../strings';

const ContactInfo = () => {
  return (<ul className='flex flex-col gap-2 text-xl mr-4 w-fit'>
    <li>
        <span className='font-bold text-2xl'>מייל: </span>
        {Constants.contact_info.mail}
    </li>
    <li className='flex flex-col gap-2'>
        <h3 className='font-bold text-3xl text-white bg-amber-500 w-fit py-1 px-4 rounded-full'>סניף אשדוד: </h3>
        <div className='px-10 text-2xl'>
            {Constants.contact_info.ashdod.address}
            <div>
                <span className='font-bold text-2xl'>טל: </span>
                {Constants.contact_info.ashdod.phone}
            </div>
            <div>
                <span className='font-bold text-2xl'>{faxNumberTitle}: </span>
                {Constants.contact_info.ashdod.fax}
            </div>
        </div>
    </li>
    <li className='flex flex-col gap-2'>
        <h3 className='font-bold text-3xl text-white bg-amber-500 w-fit py-1 px-4 rounded-full'>סניף אילת: </h3>
        <div className='px-10 text-2xl'>
            {Constants.contact_info.eilat.address}
            <div>
                <span className='font-bold text-2xl'>טל: </span>                        
                {Constants.contact_info.eilat.phone}
            </div>
            <div>
                <span className='font-bold text-2xl'>{faxNumberTitle}: </span>
                {Constants.contact_info.eilat.fax}
            </div>
        </div>
    </li>
    </ul>);
}

export default ContactInfo;