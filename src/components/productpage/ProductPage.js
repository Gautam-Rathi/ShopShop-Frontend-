import React,{useEffect,useState,useContext} from 'react'
import "./productpage.css"
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from "../contextaccount/contextacc";
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const ProductPage = () => {
    const {id} = useParams("");
    const history = useNavigate("");
    const [inddata, setInddata] = useState("");

    const { account, setAccount } = useContext(LoginContext)
  //console.log(inddata);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
        setOpen2(true);
        setOpen3(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };
  const getinddata = async () => {
    const res = await fetch(`https://shopshop-backend.onrender.com/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    //console.log(data);

    if (res.status !== 201) {
      //console.log("no data available");
    } else {
      //console.log("getdata");
      setInddata(data);
    }

  }

  useEffect(() => {
    setInddata("")
    setTimeout(getinddata,1500);
  }, [id]);


  const addtocart = async (id) => {
    const checkres = await fetch(`https://shopshop-backend.onrender.com/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inddata
      }),
      credentials: "include"
    });


    const data1 = await checkres.json();
    //console.log(data1);

    if (checkres.status === 401 || !data1) {
      //console.log("user invalid ");
      setOpen(true)
      // alert("user invalid");
    } else {
      setAccount(data1)
      setOpen2(true);
      // alert("data added in your cart");
      setTimeout(()=>{history("/cart")},500)
      
    }

  }

  function notlogin(){
    setOpen(true);
  setTimeout(()=>{history("/login")},1000)

  }



  return (
    <>
    
    
      {
    inddata?
      <div className='cart_section'>{
      inddata &&<div className="cart_container">
        <div className="left_cart">
          <img src={inddata.detailUrl} alt="cart_img" />
          <div className="cart_btn">
            <button className='cart_btn1' onClick={() => addtocart(inddata.id)} >Add to Cart</button>
            <button className='cart_btn2'onClick={()=>{
              account?addtocart(inddata.id):notlogin()
            }}>Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
            
          <h3>{inddata.title.shortTitle}</h3>
          <h4>{inddata.title.longTitle}</h4>
          
          <Divider />
          <p className="mrp">M.R.P. : ₹{inddata.price.mrp}</p>
          <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span> </p>
          <p>You save :  <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span> </p>

          <div className="discount_box">
            <h5>Discount : <span style={{ color: "#111" }}>{inddata.discount}</span></h5>
            <h4>Free Delivery :<span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21</span> Details</h4>
            <p>Fastest delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span> </p>
          </div>
          <p className='description'>About the Iteam : <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span> </p>
        </div>
      </div>}</div>:<Box className="box_loading" sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>}
      

      <>
                        
                        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="warm"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Not Loggedd In/ Invalid User
                            </Alert>
                        </Snackbar>
                        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Item Added In Your Cart
                            </Alert>
                        </Snackbar>

                    </>
    </>
  )
}

export default ProductPage