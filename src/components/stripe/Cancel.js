import React,{useContext,useEffect,useState} from 'react'
import { LoginContext } from '../contextaccount/contextacc';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import "./stripe.css"




const Cancel = () => {
    const { account, setAccount } = useContext(LoginContext);

 
  const history = useNavigate();


  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};


  

  useEffect(()=>{
    account&&setOpen(true)
    setTimeout(()=>{
        history("/")
    },2000)
    
  },[])
  return (
    <div >
        {account?<>
            
        <Box className="box_class_stripe" sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>

    <div className='success_page' >
        <div className='thanks'> SOMETHING&nbsp;WENT&nbsp;&nbsp;WRONG!!</div>
        <Box className='thanks' sx={{ display: 'flex' }}>
      <CancelIcon className='cancel_icon' /> REDIRECTING&nbsp;TO&nbsp;HOMEPAGE
    </Box>
    </div>
        </>:""}

    
        

      
<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="warn"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                               Payment was Unsuccessful
                            </Alert>
                        </Snackbar>
    </div>
  )
}

export default Cancel