import React from "react";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../FireBaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

import { IconContext } from "react-icons";
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;

      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await addUser(user.uid);
      }

      navigate("/create-user");

    }).catch(error => {
      console.log(error);
    });
  }

  const addUser = async (userID) => {
    const userRef = doc(db, "users", userID);
    return await setDoc(userRef, {
      id: userID
    });
  }

  return <div className="login h-full flex items-center justify-center items-center">
    <div className="login__google flex cursor-pointer flex-col w-80 h-80 items-center justify-center bg-white rounded-md" onClick={handleOnClick}>
      <h1 className="text-2xl mb-[10px]" >Sign Up Using Google</h1>
      <IconContext.Provider value={{ style: { height: '100px', width: '100px' } }} >
        <FcGoogle />
      </IconContext.Provider>
    </div>
  </div>
}
