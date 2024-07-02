import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../NavBar/Menu";
import Message from "./Message";
import { ThemeContext } from "../ThemeContext/ThemeContext";
const InfoMessages = () => {
  const { darkMode } = useContext(ThemeContext);
  const [sizeScreen, setsizeScreen] = useState(false);
  useEffect(() => {
    const changeSizeScreen = () => {
      if (window.innerWidth <= 1025) {
        setsizeScreen(false);
      } else {
        setsizeScreen(true);
      }
    };
    changeSizeScreen();
    window.addEventListener("resize", changeSizeScreen);
  }, []);
  return (
    <div>
      <div className={`parent-infomessage ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="container-infomessage">
          <div className="menu-infomessage">
            <Menu />
          </div>
          <div className="card-infomessage">
            <div className="card-Priavte-Message">
              <Message />
            </div>
            <div className="Change-Chat">
              {sizeScreen ? <Outlet></Outlet> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMessages;
