import React from "react";

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "#fbfbfb" }}>
      <div className="container border-top mt-5 pt-5 pb-5">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <img src="media/images/logo.svg" style={{ width: "140px", marginBottom: "20px" }} />
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd.<br/>All rights reserved.
            </p>
             <div>
                 <a href="#" className="me-3 footer-link"><i class="fa fa-twitter"></i></a>
                 <a href="#" className="me-3 footer-link"><i class="fa fa-facebook-square"></i></a>
                 <a href="#" className="me-3 footer-link"><i class="fa fa-instagram"></i></a>
                 <a href="#" className="footer-link"><i class="fa fa-linkedin"></i></a>
             </div>
          </div>
          
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="mb-3 fw-bold">Company</h6>
            <a href="#" className="footer-link">About</a><br/>
            <a href="#" className="footer-link">Products</a><br/>
            <a href="#" className="footer-link">Pricing</a><br/>
            <a href="#" className="footer-link">Referral programme</a><br/>
            <a href="#" className="footer-link">Careers</a><br/>
            <a href="#" className="footer-link">Zerodha.tech</a><br/>
            <a href="#" className="footer-link">Press & media</a><br/>
            <a href="#" className="footer-link">Zerodha cares (CSR)</a>
          </div>
          
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="mb-3 fw-bold">Support</h6>
            <a href="#" className="footer-link">Contact</a><br/>
            <a href="#" className="footer-link">Support portal</a><br/>
            <a href="#" className="footer-link">Z-Connect blog</a><br/>
            <a href="#" className="footer-link">List of charges</a><br/>
            <a href="#" className="footer-link">Downloads & resources</a>
          </div>
          
          <div className="col-md-3 col-sm-6 mb-4">
             <h6 className="mb-3 fw-bold">Account</h6>
            <a href="#" className="footer-link">Open an account</a><br/>
            <a href="#" className="footer-link">Fund transfer</a><br/>
            <a href="#" className="footer-link">60 day challenge</a>
          </div>
        </div>
        
        <div className="mt-5 text-muted" style={{ fontSize: "11px", lineHeight: "1.6" }}>
           <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>
          <div className="text-center mt-4">
               <a href="#" className="footer-link mx-2">NSE</a>
               <a href="#" className="footer-link mx-2">BSE</a>
               <a href="#" className="footer-link mx-2">MCX</a>
               <a href="#" className="footer-link mx-2">Terms & conditions</a>
               <a href="#" className="footer-link mx-2">Policies & procedures</a>
               <a href="#" className="footer-link mx-2">Privacy policy</a>
               <a href="#" className="footer-link mx-2">Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
