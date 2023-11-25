
import React, { useEffect } from 'react';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import SideNavBar from './components/SideNavBar';
import ApiMessageDisplay from './components/ApiMessageDisplay';
import AppRoutes, { loginRoute } from './AppRoutes';

function App({
    logged_in,
    AuthUserAction
}) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        AuthUserAction();
    }, [AuthUserAction, logged_in]);

    useEffect(() => {
        if (!logged_in) {
            navigate('/');
        }
    }, [location.pathname, logged_in, navigate]);

    return <div dir={'rtl'}>

        <ApiMessageDisplay />
        {!logged_in && <Routes>
            <Route
                path={AppRoutes.loginRoute.location}
                element={<loginRoute.element />} />
        </Routes>}
        {logged_in && <div className='flex flex-column'>
            <header>
                <SideNavBar />
            </header>
            <Routes>
                {AppRoutes?.adminRoutes?.map((route, index) => <Route
                    key={`route-${route.location}-${index}`}
                    path={route.location}
                    element={
                        <div className='py-5'>
                            <route.element {...(route?.props || [])}></route.element>
                        </div>
                    } />
                )}
            </Routes>
        </div>}
    </div>;
}

export default App;
