import React, { useEffect } from 'react';
import { useNavigate, useLocation, useLinkClickHandler } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Utils/Design-Tokens/CommonScssUtil.scss'
import SearchBar from '../SearchBar/SearchBar'
/**
 * Rebders Navbar with conditional buttons 
 * @param {*} param0 
 * @returns 
 */
const Navbar = ({ user, setUser, isSignup, setIsSignup, openModal }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

    useEffect(() => {
    const token = user?.token
    setUser(JSON.parse(localStorage.getItem('userProfile')))
    }, [location])


    const isLoggedIn = useSelector((state) => state.profile)

	const logout = () => {
		dispatch({ type: "LOGOUT" })
		dispatch({ type: "ISNOTSIGNIN" })
		navigate('/')
	}

	return (
		<header>
			<nav className="navbar_nav">
				<div className="brand_logo" onClick={() => {dispatch({ type: "ISNOTSIGNIN" }); dispatch({type: "ISNOTFAV"})}}>
					<div className='logo'><img alt="brandlogo" src="assets/images/EventLogo.png"></img></div>
				</div>
				<div className="navBtnWrapper w-5/12">
					<SearchBar />
					<ul className="nav_container">
						{user?.profileObj === undefined ?
							<li>
								<button className='navbtn' onClick={() => setIsSignup(!isSignup)}>
									<a href="/auth">Login</a>
								</button>
							</li>
							:
							<>
							<li> 
								<button>
									<Avatar className='rounded-full flex items-center flex-shrink-0 profilebtn' size="50" round={true} alt={user?.profileObj.name.charAt(0)} 
										src={user?.profileObj?.imageUrl} name={user.profileObj.givenName + " " + user.profileObj.familyName} maxInitials={2} 
										type="button" onClick={() => {dispatch({ type: "ISSIGNIN" }); dispatch({ type: "ISNOTFAV"})}}>
									</Avatar>
								</button>
							</li>
              <li>
                <button className='addbtn _favourites' onClick={() => {
					dispatch({ type: "ISFAV" })
					dispatch({ type: "ISNOTSIGNIN"})
                }}>
                <FontAwesomeIcon icon="heart" />&nbsp;Favourites
                </button>
              </li>
							<li>
							<button className='addbtn' onClick={()=>{
								dispatch({ type: "ISADD" })
								openModal()
							}}>
								<FontAwesomeIcon icon="plus-circle" />&nbsp;Add
							</button>
							</li>

							<li><button className='navbtn' onClick={logout}><FontAwesomeIcon icon="sign-out-alt" />&nbsp;Logout</button></li>
							</>
						}
					</ul>
				</div>
			</nav>
		</header>
  	)
}

export default Navbar
