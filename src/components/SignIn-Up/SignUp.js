import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./sign.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const SignUp = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const [passwordflag,setFlag] = useState(true);
    const [passwordflag2,setFlag2] = useState(true);

    //console.log(udata);


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const [notify, setNotify] = React.useState("");

    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };

    const adddata = (e) => {
        const { name, value } = e.target;

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    };


    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata;

        if (password !== cpassword) {
            setOpen3(true)
            setNotify("password and cpassword not match" )
        } else if (mobile.length !== 10 || isNaN(+mobile)) {
            setOpen3(true)
            setNotify("mobile no is invalid" )
        } else if (password.length<6) {
            setOpen3(true)
            setNotify("password is smaller than 6 letters" )
        } else if (!email.includes("@gmail.com")) {
            setOpen3(true)
            setNotify("invalid email format, It should include @gmail.com" )
        }

        const res = await fetch("https://shopshop-backend.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        // //console.log(data);


        if(res.status === 422 || !data){
            // alert("no data")
            setOpen(true);
        }else{
            // alert("data succesfully adde");
            setOpen2(true);
            setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
        }
    }






  return (
    <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./houselogo.png" alt="shopshoplogo" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign-Up</h1>
                        <div className="form_data">
                            <label htmlFor="fname">Your name</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.fname}
                                name="fname" id="fname" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.email}
                                placeholder='xyz@gmail.com'
                                name="email" id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="number">Mobile</label>
                            <input type="text"
                                onChange={adddata}
                                value={udata.mobile}
                                name="mobile" id="mobile" />
                        </div>
                        <div className="form_data ">
                            <label htmlFor="password">Password</label>
                            <div className="passdata">
                            <input type={passwordflag?"password":"text"}
                                onChange={adddata}
                                value={udata.password}
                                name="password" placeholder='At least 6 char' id="password" />
                                <div className="visicon" onClick={()=>{setFlag(!passwordflag)}}>
                                {passwordflag?<VisibilityIcon className='visibility'/>:<VisibilityOffIcon className='visibility'/>}
                                </div>
                                </div>
                        </div>
                        <div className="form_data ">
                            <label htmlFor="cpassword">Password Again</label>
                            <div className="passdata">
                            <input type={passwordflag2?"password":"text"}
                                onChange={adddata}
                                value={udata.cpassword}
                                placeholder='Password Again'
                                name="cpassword" id="cpassword" />
                                <div className="visicon" onClick={()=>{setFlag2(!passwordflag2)}}>
                                {passwordflag2?<VisibilityIcon className='visibility'/>:<VisibilityOffIcon className='visibility'/>}
                                </div>
                                </div>
                        </div>
                        <button className='signin_btn'  onClick={senddata} >Continue</button>

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Signin</NavLink>
                        </div>
                    </form>
                </div>
                
            </div>
            <>
                        
                        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="warm"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Invalid Details
                            </Alert>
                        </Snackbar>



                        <Snackbar open={open3} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="warm"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {notify}
                            </Alert>
                        </Snackbar>




                        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Registered Successfully
                            </Alert>
                        </Snackbar>

                    </>
        </section>
  )
}

export default SignUp