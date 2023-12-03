import React, { useState, useEffect, useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { Button } from '@mui/material';
import { BsShop } from 'react-icons/bs';

import { useScrollPosition } from '../hooks/useScrollPosition';
import logo from '../images/logo.webp';

const Navbar = ({
    routes,
    phone,
    facebook,
    youtube
}) => {
    const location = useLocation();
    const scroll = useScrollPosition();
    const [toggleMenuMobile, setToggleMenuMobile] = useState(true);
    const [mobile, setMobile] = useState(false);
    const [current_location, setCurrentLocation] = useState(location.pathname);

    const windowSize = useCallback(() => {
        if (window.innerWidth < 768) {
            setToggleMenuMobile(false);
            setMobile(true);
        }
    }, []);

    useEffect(() => {
        windowSize();
    }, [windowSize]);

    useEffect(() => {
        if (current_location !== location.pathname) {
            setCurrentLocation(location.pathname);
            mobile && setToggleMenuMobile(false);
        }
    }, [current_location, location, mobile]);

    return (<>

        <div className='grid sm:grid-cols-3 sm:grid-rows-1 grid-cols-1 grid-rows-3 text-4xl w-fit mx-auto sm:gap-24 gap-4 justify-items-center sm:items-baseline' dir='rtl'>
            <div className='flex items-center gap-2'>
                <img className='w-20' src={logo} alt="logo" />
                <h1 className='text-6xl font-bold text-green-600'>נמרם</h1>
            </div>
            <div className={`flex text-4xl items-center justify-center gap-2 bg-white w-full ${scroll > 30 && ` fixed top-0 z-10 py-2`}`}>
                <Link
                    className='hover:text-green-600'
                    to='/SalePage'>
                    <BsShop></BsShop>
                </Link>
                <a
                    className='hover:text-sky-600'
                    href={facebook}
                    rel="noreferrer"
                    target="_blank">
                    <FaFacebookSquare></FaFacebookSquare>
                </a>
                <a
                    className='hover:text-rose-600'
                    href={youtube}
                    rel="noreferrer"
                    target="_blank">
                    <FaYoutube></FaYoutube>
                </a>
                {mobile && <Button variant="outlined"
                    className="text-4xl"
                    onClick={() => setToggleMenuMobile(state => !state)}>
                    <FaBars />
                </Button>}
            </div>
            <span className='text-slate-700 font-semibold'>{phone}</span>
        </div>

        {toggleMenuMobile && <nav
            className={`z-10 h-screen sm:h-fit flex sm:flex-row flex-col sm:justify-center sm::items-start text-center items-center w-full mx-auto text-lg font-bold bg-white shadow-lg transition-all 
  ${scroll > 20 && ` fixed`} 
  ${mobile ? `top-12` : `top-0`}
   transition-all`}
            dir='rtl'>
            {routes.map((route, index) => {
                return route.show && <div key={`route--menu-route${index}`}
                    className={`relative w-screen sm:w-fit py-2 px-1 hover:bg-green-600 hover:text-white  peer
        ${route.location === location.pathname ? `bg-green-600 text-white` : `text-slate-700`}
        ${route?.sub_nav && `peer`}`}>
                    <Link
                        className='peer'
                        to={route.location}>
                        {route.label}
                    </Link>
                    {route?.sub_nav && <div
                        className='sm:hidden z-10 peer-hover:flex peer-focus:flex flex hover:flex flex-col bg-white sm:drop-shadow-lg sm:absolute top-7 left-0 w-full text-center'>
                        {route.sub_nav.map((sub_route, sub_index) => {
                            return sub_route.show && <Link
                                className={`py-2 px-2 hover:bg-green-600 hover:text-white
                ${sub_route.location === location.pathname ? `bg-green-600 text-white` : `text-slate-700`}`}
                                key={`route-${index}-sub-${sub_index}`}
                                to={sub_route.location}>
                                {sub_route.label}
                            </Link>;
                        })}
                    </div>}
                </div>
            })}
        </nav>}
    </>);
};

export default Navbar;