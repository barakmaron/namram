
import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Constants from './Constants';
import Footer from './components/Footer';
import DynamicDataParser from './components/DynamicDataParser';
import Helmet from 'react-helmet';
import ApiMessageDisplay from './components/ApiMessageDisplay';
import AppRoutes from './AppRoutes';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return <div className={``} dir='ltr'>
    <GoogleAnalytics></GoogleAnalytics>
    <ScrollToTop />
    <header>
      <Navbar routes={AppRoutes.routes} {...Constants.contact_nav} />
    </header>
    <ApiMessageDisplay />
    <Routes>
      {AppRoutes.routes?.map((route, index) => {
        return <React.Fragment key={`route-fragment-${index}`}>
          {(route?.sub_nav || [route]).map((parse_route, sub_index) => {
            return <React.Fragment key={`route-${parse_route.location}-${index}-sub-${sub_index}`} >
              <Route
                path={parse_route.location}
                element={
                  <>
                    <Helmet>
                      <title>{`נמרם | ${route.label} | ${parse_route?.label}`}</title>
                    </Helmet>
                    <parse_route.element {...(parse_route?.props || [])}></parse_route.element>
                    <DynamicDataParser
                      page_route={parse_route.location} />
                  </>} />
              {parse_route.child && parse_route.child.map(child => <Route
                key={`route-sub-child-${child.location}-${index}`}
                path={child.location}
                element={<>
                  <Helmet>
                    <title>{`נמרם | ${route.label}`}</title>
                  </Helmet>
                  <child.element></child.element>
                  <DynamicDataParser
                    page_route={child.location} />
                </>} />)}
            </React.Fragment >;
          })}
        </React.Fragment>;
      })}
    </Routes>
    <Footer></Footer>
  </div>;
}

export default App;
