import React from 'react';
import ContactUs from './ContactUs';
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import AboutUs from './AboutUs';
import Cart from './Cart';
import PurchaseHistory from './PurchaseHistory';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import GoogleLoginComponent from './GoogleLoginComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLoginComponent from './FacebookLoginComponent';
import NotFound from './NotFound';

function App() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
    <h2>rhis is product details </h2>
    
    <GoogleOAuthProvider clientId="987724367142-g2tamta3enipb68rhm3kq6vqjc5o0s24.apps.googleusercontent.com">
       <GoogleLoginComponent/>
       </GoogleOAuthProvider>
       <FacebookLoginComponent/>

       
      
      

      <BrowserRouter>
        <nav>
          <Link to='/home'>Home</Link>
          <Link to='/veg'>Veg</Link>
          <Link to='/nonveg'>Non-Veg</Link>
          <Link to='/aboutus'>About Us</Link>
          <Link to='/contactus'>Contact Us</Link>
          <Link to='/cart'>Cart ({totalItems})</Link>
          <Link to='/purchasehistory'>Purchase History</Link>
        </nav>
       
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/veg' element={<Veg />} />
          <Route path='/nonveg' element={<NonVeg />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/purchasehistory' element={<PurchaseHistory />} />

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
     
     
      </>
  );
}

export default App;
