import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Constants from './Constants';
import ContactNav from './components/ContactNav/ContactNav';
import Footer from './components/Footer/Footer';
import SideNavBar from './components/SideNavBar/SideNavBar';
import LoginConnector from './pages/ControlPanel/LoginPage/LoginConnector';
import React, { useEffect } from 'react';
import DynamicDataParserConnector from './components/DynamicDataParser/DynamicDataParserConnector';
import Helmet from 'react-helmet';

function App({ 
  logged_in,
  AuthUserAction
}) {

  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('control_panel') || location.pathname.includes('login')) 
      AuthUserAction();
  }, [AuthUserAction, location]);

  return !logged_in ? 
   !location.pathname.includes('login') ? (<>
    <header>
      <ContactNav {...Constants.contact_nav}/>
      <Navbar routes={Constants.routes} />
    </header>
    <Routes>      
      {Constants.routes.map((route, index) => {
        return <React.Fragment key={`route-fragment-${index}`}>
          {route.sub_nav ? 
            route.sub_nav.map((sub_route, sub_index) => {
              return <React.Fragment key={`route-${sub_route.location}-${index}-sub-${sub_index}`} >
              <Route 
              path={sub_route.location} 
              element={
                <>
                   <Helmet>
                      <title>נמרם | {route.label} | {sub_route.label}</title>
                  </Helmet>
                  <sub_route.element></sub_route.element>
                  <DynamicDataParserConnector
                    page_route={sub_route.location} />
                </>}/>
              { sub_route.child && <Route 
              key={`route-sub-child-${sub_route.child.location}-${index}`} 
              path={sub_route.child.location} 
              element={<sub_route.child.element></sub_route.child.element>}/>}
              </React.Fragment >;
            })
          :
          <Route 
          key={`route-${route.location}-${index}`} 
          path={route.location} 
          element={
            <>
            <Helmet>
              <title>נמרם | {route.label}</title>
            </Helmet>
            <route.element></route.element>
            <DynamicDataParserConnector
              page_route={route.location} />
          </>}/>}
          { route.child && <Route 
          key={`route-child-${route.child.location}-${index}`} 
          path={route.child.location} 
          element={<route.child.element></route.child.element>}/>}
       </React.Fragment>
      })}
    </Routes>
    <Footer></Footer>
  </>) : 
  (<LoginConnector/>) 
  : (<div className='flex flex-row ' dir='rtl'>
    <header className='w-fit'>
      <SideNavBar routes={Constants.admin_routes} />
    </header>
    <div className='flex-1'>
      <Routes>      
        {Constants.admin_routes.map((route, index) => {
          return route.sub_nav ? route.sub_nav.map((sub_route, sub_index) => {
            return <Route 
            key={`route-${sub_route.location}-${index}-sub-${sub_index}`} 
            path={sub_route.location} 
            element={<sub_route.element {...sub_route.props}></sub_route.element>}/>;
          }) :
        <Route 
        key={`route-${route.location}-${index}`} 
        path={route.location} 
        element={<route.element {...route.props}></route.element>}/>;
        })}
      </Routes>
    </div>
  </div>);
}

export default App;
