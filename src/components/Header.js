import * as React from "react";
import "../styles/Header.css";
import ArendaShop from "../images/ArendaShop.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
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

  const changeLanguage = lng => () => i18n.changeLanguage(lng);
  const handleChange = event => setAge(event.target.value);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Слушаем авторизованного пользователя
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
      // onAuthStateChanged автоматически выполнит нужные действия
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
          <button className="login_btn" onClick={googleSignIn}>
            {t("submitbtn")}
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
