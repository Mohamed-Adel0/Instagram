import React from "react";
import Css from "./ChangeChat.module.css";
import { RiMessengerLine } from "react-icons/ri";
const ChangeChat = () => {
  return (
    <div>
      <div className={Css.parent}>
        <div className={Css.container}>
          <div className={Css.card}>
            <button className={Css.icon}>
              <RiMessengerLine />
            </button>
            <h3>Your messages</h3>
            <p>Send a message to start a chat.</p>
            <button className={Css.Send}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeChat;
