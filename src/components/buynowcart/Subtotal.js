import React,{useEffect, useState} from 'react'

const Subtotal = ({cartdata}) => {
    const [price,setPrice] = useState(0);
    //console.log(cartdata)

    useEffect(()=>{
      totalAmount();
    },[cartdata])
  
    const totalAmount = ()=>{
      let price = 0;
      cartdata.map((item)=>{
        price = item.price.cost + price
      });
      setPrice(price)
    }


  return (
    <div className='sub_item'>
    <h3>Subtotal {cartdata.length}: <strong style={{fontWeight:700,color:"#111"}}> ₹{price}.00</strong></h3>
  </div>
  )
}

export default Subtotal