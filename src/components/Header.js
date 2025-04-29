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
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import personFace from "../images/personFace.jpg";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

Firebase();

const ITEM_HEIGHT = 48;

function Header() {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [age, setAge] = React.useState("");
  const { t, i18n } = useTranslation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const adminEmailMain = "anvarqosimov153@gmail.com";

  // States for login popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const changeLanguage = lng => () => i18n.changeLanguage(lng);
  const handleChange = event => setAge(event.target.value);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setIsUser(true);
        await checkAndAddUserToFirestore(currentUser);
      } else {
        setUser(null);
        setIsUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
      await signInWithPopup(auth, provider);
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

  // ==== Phone Auth Logic ====
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => handlePhoneSubmit(),
    });
  };

  const handlePhoneSubmit = async () => {
    setupRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      alert("Код отправлен по SMS");
    } catch (error) {
      console.error("Ошибка отправки SMS: ", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      setIsUser(true);
      await checkAndAddUserToFirestore(result.user);
      setShowLoginPopup(false);
    } catch (error) {
      console.error("Неверный код: ", error);
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
        <li><Link className="li" to={"/contact"}>{t("contact")}</Link></li>
      </div>

      <div className="translate">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
              <img className="user" src={user.photoURL || personFace} alt="User" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{ paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } } }}
            >
              <MenuItem onClick={handleClose}>{user.displayName}</MenuItem>
              <MenuItem className="user_email_menu" onClick={handleClose}>{user.email}</MenuItem>

              {user.email === adminEmailMain && (
                <MenuItem onClick={handleClose}>
                  <Link className="linkLi" to={"/lease"}>{t("admin")}</Link>
                </MenuItem>
              )}

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
            {t("submitbtn") || "Log in"}
          </button>
        )}
      </div>

      {showLoginPopup && (
        <div className="login_popup">
          <div className="popup_content">
            <input
              type="text"
              placeholder="+998901234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handlePhoneSubmit}>{t("send_code") || "Отправить код"}</button>

            {confirmationResult && (
              <>
                <input
                  type="text"
                  placeholder="Введите код из SMS"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={handleOtpSubmit}>{t("verify") || "Подтвердить"}</button>
              </>
            )}

            <div className="divider" style={{ margin: "15px 0", borderTop: "1px solid #ccc" }}></div>

            <button onClick={googleSignIn} className="google_signin_btn">
              {t("login_with_google") || "Войти через Google"}
            </button>

            <button onClick={() => setShowLoginPopup(false)} className="close_popup_btn">
              ✖
            </button>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
}

export default Header;
