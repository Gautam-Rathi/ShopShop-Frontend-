import React,{useContext,useState} from 'react'
import { LoginContext } from '../contextaccount/contextacc';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Option = ({deletedata,get}) => {




  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();


  const [open, setOpen] = useState(false);

    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
  const removedata = async(req,res)=>{
    try {
      const res =  await fetch(`https://shopshop-backend.onrender.com/remove/${deletedata}`,{
       
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
        //console.log("error");
      }else{
        //console.log("user delete");
        setAccount(data);
        setOpen(true);
        
        get();
      }

    } catch (error) {
        //console.log("error"+error);
    }
  }


  return (
    <div className='add_remove_select'>
      {/* <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
      </select> */}
      <p style={{cursor:"pointer"}}  onClick={()=>removedata(deletedata)} >Delete</p><span>|</span>
      <p className='forremovemedia' style={{cursor:"pointer"}} onClick={()=>{history(`/productpage/${deletedata}`)}}>See Description</p><span>|</span>
      <p className='forremovemedia' style={{cursor:"pointer"}} onClick={()=>{history("/")}}>See More like this</p>
      <>
                        
                        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className='snakbar'>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Item Removed From Cart
                            </Alert>
                        </Snackbar>

                    </>
  </div>
  )
}

export default Option