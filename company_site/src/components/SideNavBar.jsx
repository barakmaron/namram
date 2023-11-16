import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = ({ routes }) => {
  const location = useLocation();
  return (<div className='justify-start items-start bg-green-600 w-max h-full'>
    <div className='flex flex-col w-fit'>
      {routes.map((route, index) => {
        return (route?.sub_nav || [route]).map(parsed_route =>
          <div
            className={`border-b-2 border-white border-solid w-full py-4 flex flex-col hover:bg-white hover:text-green-600
            ${parsed_route.location === location.pathname ? `bg-white text-green-600` : `text-white`}`}
            key={`sidenav-bar-${index}-${parsed_route.location}`} >
            <Link
              className={`text-2xl py-2 px-14  font-bold`}
              to={parsed_route.location}>
              {parsed_route.label}
            </Link>
          </div>
        )
      })}
    </div>
  </div>);
};

export default SideNavBar;