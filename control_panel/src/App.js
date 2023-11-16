
import React, { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import SideNavBar from './components/SideNavBar';
import ApiMessageDisplay from './components/ApiMessageDisplay';
import AppRoutes from './AppRoutes';

function App({
  logged_in,
  AuthUserAction
}) {

  useEffect(() => {
    AuthUserAction();
  }, [AuthUserAction, logged_in]);

  return <div className={`flex flex-row`} dir={'rtl'}>
    <header>
      <SideNavBar routes={AppRoutes.adminRoutes} />
    </header>
    <ApiMessageDisplay />
    <Routes>
      <Route
        path={AppRoutes.loginRoute.location}
        element={<AppRoutes.loginRoute.element {...(AppRoutes.loginRoute?.props || [])}></AppRoutes.loginRoute.element>} />
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
  </div>;
}

export default App;
