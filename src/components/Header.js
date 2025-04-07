import * as React from "react";
import "../styles/Header.css";
import ArendaShop from "../images/ArendaShop.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import Firebase, { db } from "../Firebase/Firebase.js";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Features from "../pages/Features.js";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import personFace from "../images/personFace.jpg";

Firebase();

const ITEM_HEIGHT = 48;

function Header() {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [IsLogOut, setIsLogOut] = useState(false);
  const [users, setUsers] = useState([]);

  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    return () => {
      i18n.changeLanguage(lng);
    };
  };

  const [age, setAge] = React.useState("");

  const handleChange = event => {
    setAge(event.target.value);
  };

  const auth = getAuth();

  const Provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, Provider).then(users => {
        
        setUser(users.user);
        setIsRegist(false);
        addDoc(collection(db, "users"), {
          email: users.user.email,
          displayName: users.user.displayName,
          photoUrl: users.user.photoURL
        });
        setIsUser(true);
      });
    } catch (error) {
      console.log(`Error firebase --- ${error}`);
    }
  };

  const getData = async () => {
    try {
      await getDocs(collection(db, "users")).then(querySnapshot => {
        // console.log(querySnapshot);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setIsUser(true)
        setUsers(usersData);
        console.log(usersData);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const logOut = () => {
  //   setIsLogOut(true)
  // }

  // const logOutClose = () => {
  //   setIsLogOut(false)
  // }

  const logOutClick = () => {
    setIsUser(false);
  };

  //For Log Out

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminEmailMain = "anvarqosimov153@gmail.com";

  const [isRegist, setIsRegist] = useState(true);

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
        <li>
          <Link className="li" to={"/"}>
            {t("home")}
          </Link>
        </li>

        <li>
          <Link className="li" to={"/about"}>
            {t("about")}
          </Link>
        </li>

        <li>
          <Link className="li" to={"/rent"}>
            {t("rent")}
          </Link>
        </li>

        <li>
          <Link className="li" to={"contact"}>
            {t("contact")}
          </Link>
        </li>
      </div>

      <div className="translate">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">
            {t("lang")}
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem onClick={changeLanguage("uz")} value={10}>
              UZ
            </MenuItem>
            <MenuItem onClick={changeLanguage("en")} value={20}>
              EN
            </MenuItem>
            <MenuItem onClick={changeLanguage("ru")} value={30}>
              РУ
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="submit_btn">
        {isUser
          ? <div>
              <div className="user">
                {IsLogOut
                  ? null
                  : <div>
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          {/* <img
                                className="user"
                                src={users[0].photoURL}
                                alt=""
                              /> */}
                          {/* <MoreVertIcon /> */}
                          <img
                            className="user"
                            src={personFace}
                            alt="personFace"
                          />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button"
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          slotProps={{
                            paper: {
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch"
                              }
                            }
                          }}
                        >
                          <MenuItem className="userName" onClick={handleClose}>
                            {users[0].displayName}
                          </MenuItem>

                          <MenuItem className="userAdmin" onClick={handleClose}>
                            {users[0].email == adminEmailMain
                              ? <div>
                                  <li className="admin">
                                    <Link className="li" to={"/lease"}>
                                      {t("admin")}
                                    </Link>
                                  </li>
                                </div>
                              : null}
                          </MenuItem>

                          <MenuItem className="userAdmin" onClick={handleClose}>
                            <li className="admin">
                              <Link className="li" to={"/features"}>
                                {t("saralanganlar")}
                              </Link>
                            </li>
                          </MenuItem>

                          <div className="menuItemLine" />

                          <MenuItem onClick={handleClose}>
                            <button className="logout" onClick={logOutClick}>
                              {t("logout")}
                            </button>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>}
              </div>
            </div>
          : <div>
              <button className="login_btn" onClick={googleSignIn}>
                {t("submitbtn")}
              </button>
            </div>}
      </div>
    </div>
  );
}

export default Header;
