import React from 'react'
import "./footer.css"

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Get to Know US</h3>
                    <p>Abous Us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>ShopShop Cares</p>
                </div>
                <div className="footr_details_one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>INstagram</p>

                </div>
                <div className="footr_details_one forres">
                    <h3>Make Money with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>INstagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Make Money with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>INstagram</p>
                </div>
            </div>
            <div className="lastdetails">
                <img src="./houselogo.png" alt="" />
                <p>Conditions of Use & Sale &nbsp; &nbsp; &nbsp;      Privacy Notice&nbsp; &nbsp; &nbsp;      Interest-Based Ads&nbsp; &nbsp; &nbsp;      © 1996-{year}, ShopShop.com, Inc. or its affiliates</p>
            </div>
        </footer>
  )
}

export default Footer