import * as React from "react";
import "../styles/Header.css";
import ArendaShop from "../images/ArendaShop.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import Firebase, { db } from "../Firebase/Firebase.js";
import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import personFace from "../images/personFace.jpg";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom"

Firebase();

const ITEM_HEIGHT = 48;

function Header() {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState("");
  const { t, i18n } = useTranslation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const adminEmailMain = "anvarqosimov153@gmail.com";
  const menuRef = useRef(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const changeLanguage = lng => () => i18n.changeLanguage(lng);
  const handleChange = event => setAge(event.target.value);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [burgerOpen, setBurgerOpen] = useState(false)
  const openUserMenu = Boolean(anchorEl)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        localStorage.setItem("userEmail", currentUser.email);
        setUser(currentUser);
        setIsUser(true);
        await checkAndAddUserToFirestore(currentUser);
      } else {
        localStorage.removeItem("userEmail");
        setUser(null);
        setIsUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setBurgerOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside)
}, [])

  const checkAndAddUserToFirestore = async (user) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(usersRef, {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL
      });
    }
  };

  const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("userEmail", result.user.email);
    setShowLoginPopup(false);
  } catch (error) {
    console.log(`Error firebase --- ${error}`);
  }
};

  const logOutClick = async () => {
    try {
      await signOut(auth);
      setIsUser(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="Header">
      <div className="logo">
        <Link to={""}>
          <img src={ArendaShop} alt="ArendaShop" />
        </Link>
        <Link to={""}>
          <h2>ArendaShop</h2>
        </Link>
      </div>

      <div className="menu">
        <li><Link className="li" to={"/"}>{t("home")}</Link></li>
        <li><Link className="li" to={"/about"}>{t("about")}</Link></li>
        <li><Link className="li" to={"/rent"}>{t("rent")}</Link></li>
        <li><Link className="li" to={"/mysuggestions"}>{t('meningtakliflarim')}</Link></li>
        <li><Link className="li" to={"/contact"}>{t("contact")}</Link></li>
      </div>

      <div className="burger-wrapper" ref={menuRef}>
      <button
        className={`burger ${burgerOpen ? "active" : ""}`}
        onClick={() => setBurgerOpen(!burgerOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`burger-dropdown ${burgerOpen ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setBurgerOpen(false)} className="menu-link">
          Home
        </NavLink>

        <NavLink to="/about" onClick={() => setBurgerOpen(false)} className="menu-link">
          About
        </NavLink>

        <NavLink to="/rent" onClick={() => setBurgerOpen(false)} className="menu-link">
          Rent
        </NavLink>

        <NavLink to="/contact" onClick={() => setBurgerOpen(false)} className="menu-link">
          Contact
        </NavLink>
      </div>
    </div>

      <div className="translate">
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label">{t("lang")}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem onClick={changeLanguage("uz")} value={10}>UZ</MenuItem>
            <MenuItem onClick={changeLanguage("en")} value={20}>EN</MenuItem>
            <MenuItem onClick={changeLanguage("ru")} value={30}>РУ</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="submit_btn">
        {isUser ? (
          <div className="user">
            <IconButton onClick={handleClick}>
              <img className="user" src={personFace || user.photoURL} alt="User" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openUserMenu}
              onClose={handleClose}
              slotProps={{ paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } } }}
            >
              <MenuItem onClick={handleClose}>{user.displayName}</MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="linkLi" to={"/aboutUser"}>AboutUser</Link>
              </MenuItem>

              {/* {user.email === adminEmailMain && (
                <MenuItem onClick={handleClose}>
                  <Link className="linkLi" to={"/lease"}>{t("admin")}</Link>
                </MenuItem>
              )} */}

              <MenuItem onClick={handleClose}>
                  <Link className="linkLi" to={"/lease"}>{t("admin")}</Link>
                </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link className="linkLi" to={"/features"}>{t("saralanganlar")}</Link>
              </MenuItem>

              <div className="menuItemLine"></div>

              <MenuItem onClick={handleClose}>
                <button className="logout" onClick={logOutClick}>
                  {t("logout")}
                </button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <button className="login_btn" onClick={() => setShowLoginPopup(true)}>
            {t("submitbtn")}
          </button>
        )}
      </div>

      {showLoginPopup && (
        <div className="login_popup">
          <div className="popup_content">
            <h3 className="popup_conteent_h3">{t('submitText')}</h3>
            
            <button onClick={googleSignIn} className="google_signin_btn">
              <FaGoogle />
            </button>

            <button onClick={() => setShowLoginPopup(false)} className="close_popup_btn">
              ✖
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Header;