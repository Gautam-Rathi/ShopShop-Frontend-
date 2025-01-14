import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./sign.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { LoginContext } from '../contextaccount/contextacc';

const Signin = () => {
    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate();

    const [passwordflag, setFlag] = useState(true);
    //console.log(logdata);


    const adddata = (e) => {
        const { name, value } = e.target;

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };


    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("https://shopshop-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
            credentials: 'include'

        });


        const data = await res.json();
        //console.log(data);

        if (res.status == 400 || !data) {
            //console.log("invalid details");
            handleClick();
            
                    

            

        } else {
            //console.log("data valid");
            setAccount(data)


            history("/")
            setData({ ...logdata, email: "", password: "" });
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
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                onChange={adddata}
                                value={logdata.email}
                                name="email" id="email" />
                        </div>
                        <div className="form_data ">
                            <label htmlFor="password">Password</label>
                            <div className="passdata">
                                <input type={passwordflag ? "password" : "text"}
                                    onChange={adddata}
                                    value={logdata.password}
                                    name="password" placeholder='At least 6 char' id="password" />
                                <div className="visicon" onClick={() => { setFlag(!passwordflag) }}>
                                    {passwordflag ? <VisibilityIcon className='visibility' /> : <VisibilityOffIcon className='visibility' />}
                                </div>
                            </div>
                        </div>
                        <button className='signin_btn' onClick={senddata} >Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New To Shop-Shop</p>
                    <NavLink to="/register">  <button>Create Your Shop-Shop account</button></NavLink>
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

                    </>

        </section>
    )
}

export default Signin