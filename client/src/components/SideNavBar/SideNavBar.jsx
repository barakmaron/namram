import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = ({ routes }) => {
  const location = useLocation();
  return (<div className='justify-start items-start bg-green-600 w-max h-full'>
    <div className='flex flex-col w-fit'>
        {routes.map((route, index) => {
            return !route.sub_nav ? <Link 
            className={`text-2xl py-4 px-10 border-b-2 border-white border-solid w-full hover:bg-white hover:text-green-600 font-bold
            ${route.location === location.pathname ? `bg-white text-green-600` : `text-white`}`}
            key={`sidenav-bar-${index}-${route.location}`} 
            to={route.location}>
                {route.label}
            </Link> : <div 
            className='border-b-2 border-white border-solid w-full py-4 flex flex-col'
              key={`sidenav-bar-${index}-${route.location}`} >
              <span className='text-white text-2xl px-10 font-bold'>{route.label}</span>
              {route.sub_nav.map((sub_route, index) => {
                return <Link 
                className={`text-2xl py-2 px-14 hover:bg-white hover:text-green-600 font-bold
                ${sub_route.location === location.pathname ? `bg-white text-green-600` : `text-white`}`}
                key={`sidenav-bar-sub-route-${index}-${sub_route.location}`} 
                to={sub_route.location}>
                  {sub_route.label}
                </Link>;
              })}
            </div>
        })}
    </div>
  </div>);
};

export default SideNavBar;