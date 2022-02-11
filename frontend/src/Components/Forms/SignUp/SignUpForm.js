import React, { useState } from 'react';
import './SignUpForm.scss';
import GoogleLogin from 'react-google-login'
import { signup, login } from '../../../Api/index.js'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckFieldsButton from "react-validation/build/button"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import FileBase from 'react-file-base64'
// import jwt from 'jsonwebtoken'

import { isEmail, isStrongPassword, isAlpha } from "validator";

/**
 * validation for required field
 * @param {value} value the input value
 * @returns 
 */
const required = (value) => {
    if (!value) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                This field is required!
            </div>
        )
    }
}

/**
 * validation for email field
 * @param {value} value of the email field
 * @returns 
 */
const emailIsValid = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Enter valid email
            </div>
        )
    }
}

/**
 * validation for username field
 * @param {value} value of the username field
 * @returns 
 */
const userNameIsValid = (value) => {
    if (value.length < 2 || value.length > 15) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Username should be between 2 and 15 characters
            </div>
        )
    }
}

/**
 * validation for name field
 * @param {value} value of the name field
 * @returns 
 */
const nameIsValid = (value) => {
    if (value.length < 2 || value.length > 15) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Characters should be between 2 and 15 characters
            </div>
        )
    } else if (!isAlpha(value)) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Only alphabetical characters allowed
            </div>
        )
    }
}

// validation for password field
const passwordIsValid = (value) => {
    if (value.length < 8 || value.length > 25) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Password should be between 8 and 25 characters
            </div>
        )
    } else if (!isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false
    })) {
        return (
            <div className="text-red-500 text-sm italic mt-2">
                Password should contain minimum length of 8, One Lowercase, Uppercase and a symbol
            </div>
        )
    }
}

/**
 * the actual render function for signup form
 * @param {user} user prop 
 * @returns 
 */
function SignUpForm({ user }) {

    const [isSignIn, setIsSignin] = useState(true)
    const [email, setEmail] = useState("")
    const [familyname, setFamilyname] = useState("")
    const [givenname, setGivenname] = useState("")
    const [username, setUsername] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [password, setPassword] = useState("")
    const [showprofile, setShowProfile] = useState(false)
    // const [showUserError, setShowUserError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formElement = React.useRef()
    const chkbuttonElement = React.useRef();
    const uploadBtnElement = React.useRef(null);

    // function to handle google login success
    const handleSuccess = async (resp) => {

        const profileObj = resp?.profileObj
        const token = resp?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { profileObj, token } })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    // function to handle google login failure
    const handleFailure = async (error) => {
        console.log(error)
    }

    // function to handle signup submit
    const handleSignUpSubmit = async (e) => {
        e.preventDefault()

        // validate all fields
        formElement.current.validateAll()
        // if no errors then proceed
        if (chkbuttonElement.current.context._errors.length === 0) {
            try {
                const data = await signup(email, familyname, givenname, username, imageurl, password)
                let profileObj = data?.data?.newUser
                let token = data?.data?.tokenId
                try {
                    // dispatch for auth
                    dispatch({ type: 'AUTH', data: { profileObj, token } })
                    navigate('/')
                } catch (error) {
                    console.log(error)
                }
            } catch (e) {
                setErrorMsg(e.response?.data.message)
            }

        }
    }

    // Login Logic
    const handleSignInSubmit = async (e) => {
        e.preventDefault()
        formElement.current.validateAll()
        // if (chkbuttonElement.current.context._errors.length === 0){
            try {
                const data = await login(username, password)
                let profileObj = data?.data?.newUser
                let token = data?.data?.tokenId
                try {
                    dispatch({ type: 'AUTH', data: { profileObj, token } })
                    navigate('/')
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error.response)
                setErrorMsg(error.response?.data.message)
            }
       // }     
    }

    // onchange of input values set the states
    const onChangeValue = (e) => {
        let elementValue = e.target.value
        // setEmail(elementValue)
        setErrorMsg("")
        switch (e.target.dataset.state) {
            case 'setEmail':
                setEmail(elementValue)
                break
            case 'setFamilyname':
                setFamilyname(elementValue)
                break
            case 'setGivenname':
                setGivenname(elementValue)
                break
            case 'setUsername':
                setUsername(elementValue)
                break
            case 'setPassword':
                setPassword(elementValue)
                break
            default:
                return null
        }
    };

    // when signup or login button is pressed at bottom, empty fields
    const authPageSwitch = async () => {
        setErrorMsg("")
        await setIsSignin(!isSignIn)
        await setEmail('')
        await setFamilyname('')
        await setGivenname('')
        await setUsername('')
        await setImageurl('')
        await setPassword('')
        // Clear all fields on page switch
    }

    /**
     * Handles all logic for file upload i.e size, type, file convert to base64
     * @param {*} e the event of file upload btn
     */
    const handleImageContent = (e) => {
        setErrorMsg("")
        let file = e.target.files[0]
        let files = []
        let reader = new FileReader()

        if (file !== undefined) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                // the file object
                let fileData = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                files.push(fileData)
                if (!(Math.round(file.size / 1000) > 15000)) {
                    // only if base64 present set image url and show profile
                    if (fileData.base64) {
                        setImageurl(fileData.base64)
                        setShowProfile(true)
                    } else {
                        setShowProfile(false)
                    }
                } else {
                    // error message if file exceed certain size
                    setErrorMsg("File size cannot be more than 16 MB. File won't be uploaded")
                    uploadBtnElement.current.value = ""
                    setImageurl("")
                    setShowProfile(false)
                }

                // if file names dont match, show error
                if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
                    setImageurl("")
                    setShowProfile(false)
                    uploadBtnElement.current.value = ""
                    setErrorMsg("Please select only jpg, jpeg or png file formats")
                }
            }
        } else {
            setImageurl("")
            setShowProfile(false)
        }
    }


    return (
        <div className="content_wrapper col-span-3 px-5 py-10 ">
            {/* Title */}
            <header className="content_title mb-5">
                <h2 className="text-4xl mb-2">{isSignIn ? 'Login' : 'Create an account'} to get started</h2>
                <span className="text-sm mb-1">Find events you love, meet new people, build your connection. All this with just one click.
                    What are you waiting for? {isSignIn ? 'Join Now' : 'Login'} </span>
            </header>
            {/* Form */}
            {errorMsg ? <>
                <div className="error_message" role="alert">
                    {errorMsg}
                </div>
            </> : null
            }
            <div>
                {/* signup form */}
                <Form onSubmit={isSignIn ? handleSignInSubmit : handleSignUpSubmit} id="signup-form" ref={formElement} className="add_signup_form">
                    {!isSignIn ? <><fieldset className="column_fieldset">
                        <label>Email</label>
                        <Input id="add-email" type="text" className="_inputField" name="emailid" value={email} data-state="setEmail" onChange={onChangeValue} validations={[required, emailIsValid]}
                        />
                    </fieldset>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                            <fieldset className="column_fieldset">
                                <label>First Name</label>
                                <Input id="add-firstname" type="text" className="_inputField" name="firstname" value={givenname} data-state="setGivenname" onChange={onChangeValue} validations={[required, nameIsValid]}
                                />
                            </fieldset>
                            <fieldset className="column_fieldset">
                                <label>Last Name</label>
                                <Input id="add-lastname" type="text" className="_inputField" name="lastname" value={familyname} data-state="setFamilyname" onChange={onChangeValue} validations={[required, nameIsValid]}
                                />
                            </fieldset>
                        </div>
                        <fieldset className="column_fieldset">
                            <label>Profile Picture</label>
                            {/* image upload button */}
                            <input type="file" ref={uploadBtnElement} onChange={handleImageContent} onClick={() => setErrorMsg("")}
                            />
                        </fieldset>
                        {showprofile ?
                            <fieldset className="column_fieldset">
                                <img alt="profile" src={imageurl} className="profileImg"></img>
                            </fieldset>
                            : null
                        }
                    </>
                        : null
                    }
                    {/* login fields */}
                    <fieldset className="column_fieldset">
                        <label>Username</label>
                        <Input id="add-username" type="text" className="_inputField" name="username" value={username} data-state="setUsername" onChange={onChangeValue} validations={[required, userNameIsValid]}
                        />
                    </fieldset>
                    <fieldset className="column_fieldset">
                        <label>Password</label>
                        <Input id="add-password" type="password" className="_inputField" name="password" value={password} data-state="setPassword" onChange={onChangeValue} validations={[required, passwordIsValid]}
                        />
                    </fieldset>
                    {/* <!-- submit button for creating a user --> */}
                    <div className="btn_wrapper">
                        <button id="create-user" type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                        <span className="_orSeparator mx-3">- OR -</span>
                        {/* google login button */}
                        <GoogleLogin
                            clientId={process.env.REACT_APP_CLIENT_ID}
                            className="googleLogin"
                            buttonText="Login with Google"
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                    {
                        isSignIn ?
                            <div className="noAccount">
                                Dont have an account? <button type="button" onClick={authPageSwitch}>Sign Up</button>
                            </div> :
                            <div className="noAccount">
                                Have an account? <button type="button" onClick={authPageSwitch}>Sign In</button>
                            </div>
                    }


                    <CheckFieldsButton style={{ display: "none" }} ref={chkbuttonElement} />
                </Form>
            </div>
            {/* Copyrights */}
            <div></div>
        </div>
    )
}

export default SignUpForm