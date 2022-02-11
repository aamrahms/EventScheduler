import React from 'react';
import { Link } from "react-router-dom";
import SignUpForm from '../../Components/Forms/SignUp/SignUpForm';
import './SignUp.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SignUp() {
    return(
        <div className="container">
            <div className="container_wrapper grid grid-cols-1 lg:grid-cols-4">
                <div className="_backBtn">
                <Link to="/"><FontAwesomeIcon icon="arrow-circle-left" /></Link>
                </div>
                <div className="branding_wrapper col-span-1">
                    <img className="brand_img" alt="brandImg" src="assets/images/EventLogo.png"></img>
                </div>
                <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}

export default SignUp