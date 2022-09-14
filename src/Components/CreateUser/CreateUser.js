import React, { useState } from "react";

import avatar from "../../images/img_avatar.png";

import VerifyLoggedIn from "../../VerifyUser";

import { db } from "../../FireBaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function CreateUser() {
  const currentUser = VerifyLoggedIn();
  const userRef = collection(db, "users");

  const [unameAvailable, setUnameAvailable] = useState(false);

  if (currentUser === undefined) return null;

  const handleUsername = async (event) => {
    setUnameAvailable(false);
    const userName = event.target.value;

    const q = query(userRef, where("username", "==", userName));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id) {
        setUnameAvailable(unamestate => !unamestate);
      }
    });
  }

  return (
    <div className="createuser p-5">
      <form>
        <div className="createuser__avatar">
          <img src={avatar} alt="sma" className="rounded-full w-40 mx-auto mb-5" />
          <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100
    "/>
        </div>
        <div className="createuser__username">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block">
              Username
            </span>
            <input type="text" name="username" onKeyUp={handleUsername} className={`text-black mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 peer ${unameAvailable ? 'focus:!border-red-600 focus:!ring-red-600' : ''} `} placeholder="johndoe" />
            {unameAvailable && <p className="mt-2 text-white text-sm">
              Username is already taken.
            </p>}
          </label>
        </div>
        <div className="createuser__fullname">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block">
              Full Name
            </span>
            <input type="text" name="fullname" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="John Doe" />
          </label>
        </div>
        <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm" disabled>Save Changes</button>
      </form>
    </div>
  )
}
