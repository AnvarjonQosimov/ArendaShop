import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedIds, setLikedIds] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const ref = doc(db, "likes", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            setLikedIds(Array.isArray(data.ids) ? data.ids : []);
          } else {
            await setDoc(ref, { ids: [] });
            setLikedIds([]);
          }
        } catch (err) {
          console.error("Error loading likes:", err);
          setLikedIds([]);
        }
      } else {
        setUserId(null);
        setLikedIds([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (id) => {
    if (!userId) {
      alert("Пожалуйста, войдите в аккаунт, чтобы ставить лайки.");
      return;
    }

    const ref = doc(db, "likes", userId);
    try {
      if (likedIds.includes(id)) {
        await updateDoc(ref, { ids: arrayRemove(id) });
        setLikedIds((prev) => prev.filter((x) => x !== id));
      } else {
        await updateDoc(ref, { ids: arrayUnion(id) });
        setLikedIds((prev) => [...prev, id]);
      }
    } catch (err) {
      if (err.code === "not-found" || err.message.includes("No document to update")) {
        try {
          await setDoc(ref, { ids: likedIds.includes(id) ? [] : [id] }, { merge: true });
          setLikedIds((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
        } catch (e) {
          console.error("Failed to create likes doc:", e);
        }
      } else {
        console.error("toggleLike error:", err);
      }
    }
  };

  return (
    <LikeContext.Provider value={{ likedIds, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};