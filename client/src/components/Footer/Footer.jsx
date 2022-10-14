import React from 'react'
import { Link } from 'react-router-dom';
import Constants from '../../Constants';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (<footer dir='rtl'>
    <ul className='flex flex-col sm:flex-row gap-2 bg-zinc-300 border-t-8 border-b-8 border-solid border-green-600'>
        <li className='w-1/3 flex flex-col justify-center items-center'>
           <h2 className='text-3xl text-green-600 py-2 font-bold'>קישורים</h2>
           <nav className='flex flex-col justify-center items-center text-xl'>
            {Constants.routes.map((route, index) => {
               return <React.Fragment key={`footer-links-${index}`}>
               <Link 
               className='hover:font-bold hover:text-white'
               to={route.location}>
                    {route.label}
               </Link>
               {route.sub_nav?.map((sub_route, sub_index) => {
                return <Link
                    key={`footer-links-${index}-sub-link-${sub_index}`}
                    to={sub_route.location}>
                        {sub_route.label}
                    </Link>
               })}
               </React.Fragment>;
            })} 
           </nav>
        </li>
        <li className='w-1/3 flex flex-col justify-center items-center'>
           <h2 className='text-3xl text-green-600 py-2 font-bold'>צור קשר</h2>
           <ul className='flex flex-col gap-2 text-xl'>
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
                            <span className='font-bold text-2xl'>פקס: </span>
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
                            <span className='font-bold text-2xl'>פקס: </span>
                            {Constants.contact_info.eilat.fax}
                        </div>
                    </div>
                </li>
           </ul>
        </li>
        <li>
            <h2 className='text-3xl text-green-600 py-2 font-bold'>עדכונים וחדשות</h2>
            <div className='flex gap-4 text-8xl justify-center'>
                <Link
                to={Constants.contact_nav.facebook}>
                    <FaFacebookSquare
                    className='hover:text-sky-600'></FaFacebookSquare>
                </Link>
                <Link
                to={Constants.contact_nav.youtube}>
                    <FaYoutube
                    className='hover:text-rose-600'></FaYoutube>
                </Link>
            </div>
        </li>
    </ul>
  </footer>);
}

export default Footer