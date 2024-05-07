import React,{useEffect,useState} from 'react'
import "./buynow.css"
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import { NavLink,useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const BuyNowCart = () => {
    const [cartdata, setCartdata] = useState("");
    // console.log(cartdata)
    const history = useNavigate();

    const getdatabuy = async () => {
        const res = await fetch("https://shopshop-backend.onrender.com/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            //console.log("error");
            
            history("/login");
            
        } else {
            setCartdata(data.carts);
        }
    };


    useEffect(() => {
        getdatabuy();
    }, []);

  return (
    <>
        {
            cartdata &&
            <div className='buynow_section'>
                <div className='buynow_container'>
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        
                        <span className='leftbuyprice'>Price</span>
                        <Divider />

                        {!cartdata.length && 
                        <div className="no_items">

                            No Items To See Here
                        </div>
                        }
                        {
                             cartdata.map((e, k) => {
                                return (
                                    <div key={k}>
                                        <div className="item_containert">
                                            <img src={e.detailUrl} alt="" />
                                            <div className="item_details">
                                                <h3>{e.title.longTitle} </h3>
                                                <h3>{e.title.shortTitle} </h3>
                                                <h3 className='diffrentprice'>₹{e.price.cost}</h3>
                                                <p className='unusuall'>Usually dispatched in 8 days.</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="./logosmall.png" alt="" />
                                                <Option deletedata={e.id} get={getdatabuy}  />
                                            </div>
                                            <h3 className='item_price'>₹{e.price.cost}.00</h3>
                                        </div>
                                        <Divider />
                                    </div>
                                )
                            })
                        
                             }   
                             
                        <Subtotal cartdata={cartdata} />
                    
                        </div>
                    
                    
                    <Right cartdata={cartdata}/>
                
                </div>
            </div>
        }
        {
            !cartdata?<Box className="box_loading" sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>:""
        }

        </>
  )
}

export default BuyNowCart