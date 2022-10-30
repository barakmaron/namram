import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Constants from './Constants';
import ContactNav from './components/ContactNav/ContactNav';
import Footer from './components/Footer/Footer';
import SideNavBar from './components/SideNavBar/SideNavBar';

function App({ logged_in }) {
  return !logged_in ? (<>
    <header>
      <ContactNav {...Constants.contact_nav}/>
      <Navbar routes={Constants.routes} />
    </header>
    <Routes>      
      {Constants.routes.map((route, index) => {
        return route.sub_nav ? route.sub_nav.map((sub_route, sub_index) => {
          return <Route key={`route-${sub_route.location}-${index}-sub-${sub_index}`} path={sub_route.location} element={<sub_route.element></sub_route.element>}/>;
        }) :
       <Route key={`route-${route.location}-${index}`} path={route.location} element={<route.element></route.element>}/>;
      })}
    </Routes>
    <Footer></Footer>
  </>) : (<div className='flex flex-row ' dir='rtl'>
    <header className='w-fit'>
      <SideNavBar routes={Constants.admin_routes} />
    </header>
    <div className='flex-1'>
      <Routes>      
        {Constants.admin_routes.map((route, index) => {
          return route.sub_nav ? route.sub_nav.map((sub_route, sub_index) => {
            return <Route key={`route-${sub_route.location}-${index}-sub-${sub_index}`} path={sub_route.location} element={<sub_route.element></sub_route.element>}/>;
          }) :
        <Route key={`route-${route.location}-${index}`} path={route.location} element={<route.element></route.element>}/>;
        })}
      </Routes>
    </div>
  </div>);
}

export default App;
