import { React, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../contextaccount/contextacc';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "./leftmenu.css"
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';


const Leftmenu = ({logclose,logoutuser}) => {

    const { account, setAccount } = useContext(LoginContext);
  return (
    <div className="rightheader">
                <div className="right_nav">
                    {
                        account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar'></Avatar>
                    }
                    {account ? <h3>{account.fname.toUpperCase()}</h3> : ""}
                </div>
                <div className="left_nav_btn" onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    {/* <NavLink to="/">Shop By category</NavLink> */}

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <NavLink to="/productpage/product1" className="up_margin">today's Deal</NavLink>
                    {
                        account ? <NavLink to="/cart">Your orders</NavLink> : <NavLink to="/login">Your orders</NavLink>
                    }


                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <div >
                    {
                        account ? <NavLink to="/cart" className="flag up_margin">Return An Order</NavLink> : <NavLink to="/login" className="flag up_margin" >Return An Order</NavLink>
                    }
                        
                    </div>


                    {
                        account ? 
                        <NavLink onClick={()=>logoutuser()} style={{cursor:"pointer"}} className="flag">
                            Logout
                            <LogoutIcon className='icon_left'/>
                            
                        </NavLink>:
                    
                        
                        <NavLink to="login" className="flag">Log In
                        <LoginIcon className='icon_left'/>
                        </NavLink>
                        
                        
                    }
                </div>
            </div>
  )
}

export default Leftmenu