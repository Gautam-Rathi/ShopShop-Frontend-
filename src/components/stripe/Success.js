import React,{useContext,useEffect,useState} from 'react'
import { LoginContext } from '../contextaccount/contextacc';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./stripe.css"




const Success = () => {

  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();


  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};


  const deletecartdata = async()=>{
    const res =  await fetch(`https://shopshop-backend.onrender.com/successcart`,{
       
    method:"DELETE",
    headers:{
      Accept:"application/json",
      "Content-type":"application/json"
    },
    credentials:"include"
  });

  const data = await res.json();
  //console.log(data);

  if(res.status === 400 || !data){
    history("/")
    //console.log("error");
  }else{
    //console.log("user delete");
    setAccount(data);
    setOpen(true);
    setTimeout(()=>{
      history("/")

    },2000)
    
  }}

  useEffect(()=>{
    account?
    deletecartdata():history("/")
    
  },[])
  return (
    <div >
        {account?<>
            
        <Box className="box_class_stripe" sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>

    <div className='success_page' >
        <div className='thanks'> THANK&nbsp;YOU&nbsp;FOR&nbsp;SHOPPING!!!</div>
        <Box className='thanks' sx={{ display: 'flex' }}>
      <CheckCircleIcon className='success_icon' /> REDIRECTING&nbsp;TO&nbsp;HOMEPAGE
    </Box>
    </div>
        </>:""}

    
        

      
<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                               Payment was Success
                            </Alert>
                        </Snackbar>
    </div>
  )
}

export default Success