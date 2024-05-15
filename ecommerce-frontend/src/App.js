import './App.css';
import './assets/style.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './frontend/Home';
import About from './frontend/About';
import Contact from './frontend/Contact';
import Header from './frontend/includes/Header';
import Login from './frontend/Login';
import Registration from './frontend/Registration';
import Footer from './frontend/includes/Footer';
import CartList from './frontend/CartList';
import Product from './frontend/Product';
import Checkout from './frontend/Checkout';
import OrderSuccessMassage from './frontend/OrderSuccessMassage';
import Search from './frontend/Search';
import Logout from './frontend/Logout';
// import CartList from './frontend/CartList';

function App() {
  const [cart, setCart] = useState(0);
  const [searchData, setSearchData] = useState([]);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId =  user ? user.id : '';
  
  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId =  user ? user.id : '';
  }
  useEffect( ()=>{
    cartItems();
  },[]);

  async function cartItems(){
    let result =await fetch('http://127.0.0.1:8000/api/cartitem/'+userId);
    result= await result.json();
    setCart(result);
  }

  function emptyCart(){
    setCart(0);
  }
  
  return (
    <BrowserRouter> {console.log(searchData)}
      <Header items={cart} setSearchData={setSearchData} />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cartlist" element={<CartList cartItem={cartItems}/>} />
            <Route path="/login" element={<Login cartItem={cartItems} userUpdate={userUpdate} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/product/:id" element={<Product cartItem={cartItems} />} />
            <Route path="/checkout" element={<Checkout cartItem={cartItems} />} />
            <Route path="/massage" element={<OrderSuccessMassage />} />
            <Route path="/search" element={<Search searchData={searchData} />} />
            <Route path="/logout" element={<Logout emptyCart={emptyCart} />} />
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
