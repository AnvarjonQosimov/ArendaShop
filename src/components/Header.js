import * as React from 'react';
import "../styles/Header.css"
import ArendaShop from "../images/ArendaShop.png"
import {Link} from "react-router-dom"
import { useTranslation } from "react-i18next"
import i18n from "../i18n.js"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { signInWithPopup, getAuth, GoogleAuthProvider} from "firebase/auth"
import Firebase from "../Firebase/Firebase.js"
import {useState} from "react"

Firebase()

function Header() {
  const [user, setUser] = useState({})
  const [isUser, setIsUser] = useState(false)
  const [IsLogOut, setIsLogOut] = useState(false)

  const { t, i18n } = useTranslation()
  const changeLanguage = (lng) => {
    return () =>{
      i18n.changeLanguage(lng)
    }
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const auth = getAuth()

  const Provider = new GoogleAuthProvider()

  const googleSignIn = () => {
    signInWithPopup(auth, Provider).then((users) => {
      setIsUser(true)
      setUser(users.user)
    })
  }

  const logOut = () => {
    setIsLogOut(true)
  }

  const logOutClose = () => {
    setIsLogOut(false)
  }

  const logOutClick = () => {
    setIsUser(false)
  }
  console.log(user)
  return (
    <div className='Header'>
      <div className="logo">
        <Link to={""}><img src={ArendaShop} alt="ArendaShop" /></Link>
        <Link to={""}><h2>ArendaShop</h2></Link>
      </div>

      <div className="menu">
      <li>
          <Link className="li" to={""}><li>{t('home')}</li></Link>
        </li>

        <li>
          <Link className="li" to={"about"}><li>{t('about')}</li></Link>
        </li>

        <li>
          <Link className="li" to={"lease"}><li>{t('lease')}</li></Link>
        </li>
          
        <li>
          <Link className="li" to={"rent"}><li>{t('rent')}</li></Link>
        </li>

        <li>
          <Link className="li" to={"contact"}><li>{t('contact')}</li></Link>
        </li>

      </div>

      <div className="translate">
<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{t('lang')}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem onClick={changeLanguage('uz')} value={10}>UZ</MenuItem>
        <MenuItem onClick={changeLanguage('en')} value={20}>EN</MenuItem>
        <MenuItem onClick={changeLanguage('ru')} value={30}>РУ</MenuItem>
      </Select>
    </FormControl>
      </div>

      <div className="submit_btn">
        {isUser ? (<div className="user">{IsLogOut ? (<div className='logouttrue'>
        <div onClick={logOutClose} className='usertrue'><img src={user.photoURL} alt="" /></div>
        <div className='logout'><butto onClick={logOutClick} className='logout_btn'>Log Out</butto></div> 
        </div>) 
        : (<img onClick={logOut} src={user.photoURL} alt="" />) }
        </div>) : (<div><button className='login_btn' onClick={googleSignIn}>Log In</button></div>)}
      </div>
    </div>
  )
}

export default Header
