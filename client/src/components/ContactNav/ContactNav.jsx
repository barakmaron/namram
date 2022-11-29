import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { BsShop } from 'react-icons/bs';
import logo from '../../images/logo.webp';
const ContactNav = ({
    phone,
    facebook,
    youtube
}) => {
  return (<div className='flex items-center justify-around mx-auto w-full' dir='rtl'>
    <div className='flex items-center gap-2'>
        <img className='w-20' src={logo} alt="logo"/>
        <h1 className='text-6xl font-bold text-green-600'>נמרם</h1>
    </div>
    <div className='flex gap-5 w-fit items-baseline text-4xl justify-start' dir='ltr'>
        <span className='text-slate-700 font-semibold'>{phone}</span>
        <Link
        className='hover:text-green-600'
        to='/sale'>
            <BsShop></BsShop>
        </Link>
        <Link
        className='hover:text-sky-600'
        to={facebook}>
            <FaFacebookSquare></FaFacebookSquare>
        </Link>
        <Link
        className='hover:text-rose-600'
        to={youtube}>
            <FaYoutube></FaYoutube>
        </Link>
    </div>
  </div>);
};

export default ContactNav;