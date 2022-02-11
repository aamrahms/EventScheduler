import React from 'react';
import './Footer.scss'
export default function Footer(){
    return(
        <footer>
            <div className="wrapper-footer">
                    <a href="/" className="right"><img src="assets/images/EventLogo.png" alt="go-to-profile"/></a>
                <div className="copyright">
                    <p> &#169; Event Tracker -<span>2021</span> Northeastern University </p>
                </div>
            </div>
        </footer>
    
    

    );
}


