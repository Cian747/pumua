import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './features/authentication/SignpPage';
import LoginPage from './features/authentication/LoginPage';
import Homepage from './features/pages/WelcomePage';


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/faq' element={<Faq />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
