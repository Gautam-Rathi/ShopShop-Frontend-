import React,{useContext,useEffect,useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import './nav.css'
import { NavLink,useNavigate } from 'react-router-dom';
import { LoginContext } from "../contextaccount/contextacc";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import { products } from '../home/productdata';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import Leftmenu from './Leftmenu';
import LoginIcon from '@mui/icons-material/Login';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Nav = () => {

    const { account, setAccount } = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useNavigate();
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

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("");
    //console.log(text);
    const [liopen, setLiopen] = useState(true);


    const [dropen, setDropen] = useState(false)


    const handleopen = () => {
        setDropen(true)
    }

    const handledrclose = () => {
        setDropen(false)
    }



    const getdetailvaliduser = async () => {
        const res = await fetch("https://shopshop-backend.onrender.com/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        //console.log(data);

        if (res.status !== 201) {
            //console.log("error");
        } else {
            //console.log("data valid");
            setAccount(data);
        }
    };



    const logoutuser = async () => {
        const res2 = await fetch("https://shopshop-backend.onrender.com/lougout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        //console.log(data2);

        if (res2.status !== 201) {
            //console.log("error");
        } else {
            //console.log("data valid log");
            // alert("logout")
            setOpen2(true);
            setTimeout(() => {
                history("/");
            }, 1000);
            setAccount(false);

        }
    };

    const getText = (iteams) => {
        setText(iteams)
        setLiopen(false)
    }
    const showlist = ()=>{
        setLiopen(false)
    }


    useEffect(() => {
        getdetailvaliduser()
    }, [])

    return (
        <header>
            <nav>
                <div className="left" >
                    

                <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon  />
                    </IconButton>

                    <Drawer open={dropen} onClose={handledrclose}>
                        
                        <Leftmenu logclose={handledrclose} logoutuser={logoutuser}/>
                    


                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"><img src="./simplelogo.png" alt="" /></NavLink>
                    </div>
                    <ClickAwayListener onClickAway={()=>{setLiopen(true)}}>
                    <div className="nav_searchbar">
                        <input className='nav_searchbar_text' type="text" placeholder='Search All Products Here' onClick={showlist} onChange={(e)=>{getText(e.target.value)}}/>
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>


                        {
                            
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/productpage/${product.id}`} onClick={() => setLiopen(true)} >
                                                { product.title.longTitle }
                                        </NavLink>
                                          
                                        </ListItem>
                                    ))
                                }
                    </List>
                        }




                    </div>
                    </ClickAwayListener>
                </div>
                <div className="right">
                    {account?"":<NavLink to="/login">
                    <div className="nav_btn">
                        SignIn
                        <LoginIcon/>
                    </div>
                    </NavLink>}
                    <NavLink to={account?"/cart":"/login"}>
                    <div className="cart_btn">


                    {
                        account ? 
                            <Badge badgeContent={account.carts.length} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                         : 
                            <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                        
                    }
                        
                        <p>Cart</p>
                    </div>
                    </NavLink>
                    {
                    account ? <Avatar className='avtar2'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        
                    >{account.fname[0].toUpperCase()}</Avatar> :
                        <Avatar className='avtar'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            
                        ></Avatar>
                }
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {account?<MenuItem onClick={handleClose}>{account.fname}</MenuItem>:<MenuItem onClick={()=>{
                        handleClose()
                        history("/login")


                    }}>No Account</MenuItem>}
                    {
                        account ? <div onClick={handleClose}><MenuItem onClick={logoutuser} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem></div> : ""
                    }

                </Menu>
                </div>
            </nav>
            <>
                        
                        <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose2} className='snakbar'>
                            <Alert
                                onClose={handleClose2}
                                severity="warm"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Logging Out
                            </Alert>
                        </Snackbar>

                    </>



        </header>
    )
}

export default Nav