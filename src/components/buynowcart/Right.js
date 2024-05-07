import React,{useEffect, useState} from 'react'
import {loadStripe} from '@stripe/stripe-js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Right = ({cartdata}) => {
    const [price, setPrice] = useState(0);

    const [open2, setOpen2] = React.useState(false);



    



    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    useEffect(()=>{

      setPrice(cartdata.reduce((a,e)=>{
        return a+e.price.cost;

      },0))
    },[cartdata]);


    const checkout = async()=>{
      
      if(cartdata.length){const stripe = await loadStripe("pk_test_51PDRMGSIko0Hsvm4w354biN8bVrMTCbVt7X1uhNyBOGFYGipcCp4WxV00qcBAvMZ5vfaDzdKkdzYqaBMMJTEpRbM00GcsLGYH2")
 
      const response = await fetch("https://shopshop-backend.onrender.com/checkout",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({cartdata:cartdata})
      })
      const data = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId:data.id
      })
      if(result.error){

      }}else{
        setOpen2(true);

      }
      
    
    }

  return (
    <div className='right_buy'>
        <img src="./banad.png" alt="" />
        <div className="cost_right">
            <p>Your order is eligible for FREE Delivery.</p> <br />
            <span style={{ color: "#565959" }}>Select this option at checkout. Details

            </span>

            <h3>Subtotal {cartdata.length}: <span style={{ fotnWeight: 700 }}> ₹{price}.00</span></h3>
            <button className='rightbuy_btn' onClick={checkout}>Process to Buy</button>
            <div className="emi">
                Emi available
            </div>
        </div>

        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose2} className='snakbar'>
                            <Alert
                                onClose={handleClose2}
                                severity="warm"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                No Items In Cart
                            </Alert>
                        </Snackbar>
    </div>
  )
}

export default Right