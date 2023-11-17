
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
                <SideNavBar routes={AppRoutes.adminRoutes} />
            </header>
            <Routes>
                {AppRoutes?.adminRoutes?.map((route, index) => {
                    return <React.Fragment key={`route-fragment-${index}`}>
                        {(route?.sub_nav || [route]).map((parse_route, sub_index) => {
                            return <React.Fragment key={`route-${parse_route.location}-${index}-sub-${sub_index}`} >
                                <Route
                                    path={parse_route.location}
                                    element={<parse_route.element {...(parse_route?.props || [])}></parse_route.element>} />
                                {parse_route.child && parse_route.child.map(child => <Route
                                    key={`route-sub-child-${child.location}-${index}`}
                                    path={child.location}
                                    element={<child.element></child.element>} />)}
                            </React.Fragment >;
                        })}
                    </React.Fragment>;
                })}
            </Routes>
        </div>}
    </div>;
}

export default App;
