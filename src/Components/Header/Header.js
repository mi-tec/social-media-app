import React, { useState } from "react";
import { IconContext } from "react-icons";

import { BsPersonCircle } from "react-icons/bs";

import SettingsPopup from "./SettingsPopup/SettingsPopup";

export default function Header() {
  const [settingspopup, setSettingsPopup] = useState(false);

  const handleProfileIconClick = () => {
    setSettingsPopup(current => !current);
  }

  return (
    <>
      <div className="header bg-gray-600 p-4 fixed w-full border-b-indigo-500">
        <div className="header__links flex flex-row justify-between items-center">
          <span className="text-2xl font-bold cursor-pointer">Social Media App</span>
          <span className="header__links--profileicon" onClick={handleProfileIconClick}>
            <IconContext.Provider value={{ style: { color: 'rgb(255,255,255)', width: '25px', height: '25px' } }} >
              <BsPersonCircle />
            </IconContext.Provider>
          </span>
        </div>
        {settingspopup && <SettingsPopup />}
      </div>
    </>
  )
}
