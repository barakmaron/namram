import React from 'react';
import { Link } from 'react-router-dom';

const SideNavBar = ({ routes }) => {
  return (<div className='justify-start items-start bg-green-600 w-max h-full'>
    <div className='flex flex-col w-fit'>
        {routes.map((route, index) => {
            return <Link 
            className='text-white text-2xl py-4 px-10 border-b-2 border-white border-solid w-full hover:bg-white hover:text-green-600 font-bold'
            key={`sidenav-bar-${index}-${route.location}`} 
            to={route.location}>
                {route.label}
            </Link>
        })}
    </div>
  </div>);
};

export default SideNavBar;