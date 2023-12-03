import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

const Page404 = () => {
  return (<>
    <div className='flex justify-center py-2 bg-amber-500 shadow-inner bg-center'>
        <h2 className='text-4xl text-slate-700 font-bold'>אופס 404! דף זה לא נמצא</h2>
    </div>
    <div className='sm:py-10 py-4 mx-auto flex flex-col items-center text-center text-2xl text-slate-700 font-bold' dir='rtl'>
        היי, נראה כי הדף אותו אתה מחפש לא נמצא.<br></br>
        אנו בטוחים שתוכל למצוא את כל המידע על נמרם בקישורים הבאים:
        {AppRoutes.routes.reduce((routes, route) => {
            route.show && routes.push(<Link 
                className='text-green-600 hover:text-slate-700 hover:underline'
                key={`404-link-${route.location}`}
                to={route.location}>{route.label}</Link>);
            return routes;
        }, [])}
    </div>  
</>)
}

export default Page404