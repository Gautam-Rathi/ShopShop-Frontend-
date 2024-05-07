import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css"

const data = [
    "banad.png",
    
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "banad2.png",
    "banad3.png",
    "banad4.png"
    
]

const Banner = () => {
  return (
    <Carousel 
      className='carasousel'
      autoPlay={true}
      animation='slide'
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
          style:{
              backgroundColor:"#fff",
              color:"#494949",
              borderRadius:0,
              marginTop:-22,
              height:"104px"
          }
      }}
      >
        {
            data.map((imag,i)=>{
                return (
                    <div key={i}>
                        <img key={i} src={imag} alt="" className='banner_img' />
                    </div>
                )
            })
        }
      </Carousel>
  )
}

export default Banner