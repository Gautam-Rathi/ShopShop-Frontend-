import './App.css';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import {Routes,Route} from 'react-router-dom'
import SignUp from './components/SignIn-Up/SignUp';
import Signin from './components/SignIn-Up/Signin';
import ProductPage from "./components/productpage/ProductPage";
import BuyNowCart from './components/buynowcart/BuyNowCart';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState,useEffect } from 'react';
import Success from './components/stripe/Success';
import Cancel from './components/stripe/Cancel';


function App() {
  const [data,setdata] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setdata(true);
    },1500)
  },[])

  return (


    


    <>
    <Nav />
    {data?
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Signin />}/>
      <Route path='/register' element={<SignUp />}/>
      <Route path='/productpage/:id' element={<ProductPage />} />
      <Route path='/cart' element={<BuyNowCart />}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel />}/>
      


    </Routes>:
     <Box className="box_class" sx={{ width: '100%' }}>
     <LinearProgress />
   </Box>
  }
    <Footer />
    </>
  );
}

export default App;
