import React from 'react'
import { Link } from 'react-router-dom';

import Constants from '../Constants';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import ContactInfo from './ContactInfo';
import AppRoutes from '../AppRoutes';
import { contactAsTitle, newsAndUpdatesTitle } from '../strings';

const Footer = () => {
    return (<footer dir='rtl'>
        <ul className='flex flex-col sm:flex-row gap-2 bg-zinc-300 border-t-8 border-b-8 border-solid border-green-600 justify-center sm:items-start items-center'>
            <li className='w-full sm:w-1/3 flex flex-col justify-center items-center'>
                <h2 className='text-3xl text-green-600 py-2 font-bold'>קישורים</h2>
                <nav className='flex flex-col justify-center items-center text-xl'>
                    {AppRoutes.routes.map((route, index) => {
                        return route.show && <React.Fragment key={`footer-links-${index}`}>
                            <Link
                                className='hover:font-bold hover:text-white'
                                to={route.location}>
                                {route.label}
                            </Link>
                            {route.sub_nav?.map((sub_route, sub_index) => {
                                return sub_route.show && <Link
                                    key={`footer-links-${index}-sub-link-${sub_index}`}
                                    to={sub_route.location}>
                                    {sub_route.label}
                                </Link>
                            })}
                        </React.Fragment>;
                    })}
                </nav>
            </li>
            <li className='w-full sm:w-1/3 flex flex-col justify-center items-center'>
                <h2 className='text-3xl text-green-600 py-2 font-bold'>{contactAsTitle}</h2>
                <ContactInfo />
            </li>
            <li >
                <h2 className='text-3xl text-green-600 py-2 font-bold'>{newsAndUpdatesTitle}</h2>
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