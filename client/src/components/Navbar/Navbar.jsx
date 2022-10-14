import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const Navbar = ({
    routes
}) => {
    const location = useLocation();
    const scroll = useScrollPosition();
  return (<nav 
  className={`flex w-full justify-center mx-auto text-lg font-bold bg-white shadow-lg transition-all ${scroll > 20 && ` fixed top-0`}`} dir='rtl'>
    {routes.map((route, index) => {
        return !(route?.sub_nav) ? <Link 
        className={`py-2 px-1 hover:bg-green-600 hover:text-white
        ${route.location === location.pathname ? `bg-green-600 text-white` : `text-slate-700`}`}
        key={`route-${index}`} 
        to={route.location}>
            {route.label}
        </Link> : <div key={`route-sub-route${index}`} className={`py-2 px-1 relative hover:bg-green-600 hover:text-white peer
            ${route.location === location.pathname ? `bg-green-600 text-white` : `text-slate-700`}`}   >
            <Link 
            className='peer'
            to={route.location}>
                {route.label}
            </Link> 
            <div  key={`route-sub--menu-route${index}`} 
            className='hidden peer-focus:flex peer-hover:flex hover:flex flex-col bg-white drop-shadow-lg absolute top-7 left-0 w-full text-center'>
                {route.sub_nav.map((sub_route, sub_index) => {
                    return <Link 
                    className={`py-2 px-2 hover:bg-green-600 hover:text-white
                    ${sub_route.location === location.pathname ? `bg-green-600 text-white` : `text-slate-700`}`}
                    key={`route-${index}-sub-${sub_index}`} 
                    to={sub_route.location}>
                        {sub_route.label}
                    </Link>;
                })}
            </div>
        </div>
    })}
    </nav>);
};

export default Navbar;