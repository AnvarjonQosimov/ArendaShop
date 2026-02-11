import React, { useEffect, useState } from "react";
import "../styles/AboutUser.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import personFace from "../images/personFace.jpg";

function AboutUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="AboutUser">
      <div className="aboutUserCard">
        <div className="classTop">
          <img
            src={user?.photoURL || personFace}
            alt="User avatar"
            className="userImage"
          />
          <h1>{user?.displayName || user?.phoneNumber || "User"}</h1>
        </div>

        <div className="classTopLine"></div>

        <div className="classBottom">
          {user?.phoneNumber && (
            <div className="infoRow">
              <h3>📞 Phone Number:</h3>
              <div className="lineInRight"></div>
              <h3 className="infoValue">{user.phoneNumber}</h3>
            </div>
          )}

          {user?.email && (
            <div className="infoRow">
              <h3>📧 Email:</h3>
              <div className="lineInRight"></div>
              <h3 className="infoValue">{user.email}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUser;
