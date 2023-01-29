import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Constants from './Constants';
import Footer from './components/Footer/Footer';
import SideNavBar from './components/SideNavBar/SideNavBar';
import React, { useEffect, useState } from 'react';
import DynamicDataParserConnector from './components/DynamicDataParser/DynamicDataParserConnector';
import Helmet from 'react-helmet';
import ApiMessageDisplayConnector from './components/ApiMessageDisplay/ApiMessageDisplayConnector';
import AppRoutes from './AppRoutes';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App({ 
  logged_in,
  AuthUserAction
}) {

  const location = useLocation();
  const [routes, setRoutes] = useState(AppRoutes.routes);

  useEffect(() => {
    if(location.pathname.includes('control_panel') && logged_in) 
      setRoutes(AppRoutes.admin_routes);
    else 
      setRoutes(AppRoutes.routes);
  }, [AuthUserAction, location, logged_in]);

  useEffect(() => {
    AuthUserAction();
  }, [AuthUserAction, logged_in]);
  
  return <div className={`${logged_in && routes === AppRoutes.admin_routes ? `flex flex-row` : ``}`}  dir={logged_in && routes === AppRoutes.admin_routes ? 'rtl': 'ltr'}>
    <GoogleAnalytics></GoogleAnalytics>
    <ScrollToTop/>
    <header>
      { !logged_in || routes !== AppRoutes.admin_routes ? 
      <Navbar routes={routes} {...Constants.contact_nav} />:
      <SideNavBar routes={routes} />}
    </header>
    <ApiMessageDisplayConnector/>
    <Routes>      
      {routes?.map((route, index) => {
        return <React.Fragment key={`route-fragment-${index}`}>
          {(route?.sub_nav || [route]).map((parse_route, sub_index) => {
            return <React.Fragment key={`route-${parse_route.location}-${index}-sub-${sub_index}`} >
              <Route 
              path={parse_route.location} 
              element={
              <>
                  <Helmet>
                    <title>נמרם | {route.label} | {parse_route?.label}</title>
                </Helmet>
                <parse_route.element {...(parse_route?.props || [])}></parse_route.element>
                { !logged_in && <DynamicDataParserConnector
                  page_route={parse_route.location} />}
              </>}/>
            { parse_route.child && parse_route.child.map(child => <Route 
            key={`route-sub-child-${child.location}-${index}`} 
            path={child.location} 
            element={<>
              <Helmet>
                <title>נמרם | {route.label}</title>
            </Helmet>
            <child.element></child.element>
            { !logged_in && <DynamicDataParserConnector
              page_route={child.location} />}
          </>}/>)}
            </React.Fragment >;
          })}
          </React.Fragment>;
      })}
    </Routes>
   { !logged_in && <Footer></Footer> }
  </div>;
}

export default App;
