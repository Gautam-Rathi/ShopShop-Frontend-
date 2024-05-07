import React,{useEffect,useState} from 'react'
import Banner from './Banner'
import "./Home.css"
import Slide from './Slide'
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';



const Home = () => {
    const [ad,setAd] = useState(true);
    const [ad2,setAd2] = useState(true);






    return (
    <>
            <div className='home_section'>
                <div className="banner_part">
                    <Banner />
                </div>

                <div className="slide_part">
                <div className="left_slide">
                <Slide title="Deal Of The Day"  />
                </div>
                {ad2&&<div className="right_slide disablead">
                <DisabledByDefaultIcon onClick={()=>{setAd2(false)}} className="disableiconbutton"/>
                    <h4>Festive latest launches</h4>
                    <img src="./ad2.png" alt="" />
                    <NavLink >Hurry Up!!</NavLink>
                </div>}
            </div>
            <Slide title="Today's Deal"   />
                {ad&&<div  className="center_img disablead">
                    <DisabledByDefaultIcon onClick={()=>{setAd(false)}} className="disableiconbutton" />
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>}
            <Slide title="Best Seller"    />
            <Slide title="Upto 80% off"   />
            </div>
            <Divider />
            
            </>
            )
}

            export default Home