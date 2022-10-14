import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';
import Constants from './Constants';
import ContactNav from './components/ContactNav/ContactNav';
import Footer from './components/Footer/Footer';

function App() {
  return (<>
    <header>
      <ContactNav {...Constants.contact_nav}/>
      <Navbar routes={Constants.routes} />
    </header>
    <Routes>
      <Route path='/' element={<Home></Home>} />
    </Routes>
    <Footer></Footer>
  </>);
}

export default App;
