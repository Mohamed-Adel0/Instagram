import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GiMouthWatering } from "react-icons/gi";
import axios from "axios";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const ViewChat = () => {
  const { id: idURL } = useParams();
  const userId = JSON.parse(localStorage.getItem("id"));
  const [chatView, setChatView] = useState([]);
  const [ownerPerson, setOwnerPerson] = useState(null);
  const [textChat, setTextChat] = useState([]);
  const [another, setAnotherChat] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const chatResponse = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/getProfile/${idURL}`
        );
        setChatView(chatResponse.data.data.product);

        const ownerResponse = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/getProfile/${userId}`
        );
        setOwnerPerson(ownerResponse.data.data.product);

        if (
          chatResponse.data.data.product.chatId !==
          ownerResponse.data.data.product.chatId
        ) {
          throw new Error("User does not have access to this chat.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProfileData();
  }, [idURL, userId]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `https://instagram-4.onrender.com/api/message/${userId}/${idURL}`
        );
        setTextChat(response.data.data.product);

        const anotherChat = await axios.get(
          `https://instagram-4.onrender.com/api/message/${idURL}/${userId}`
        );
        setAnotherChat(anotherChat.data.data.product);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatMessages();
    const interval = setInterval(fetchChatMessages, 5000);

    return () => clearInterval(interval);
  }, [idURL, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [textChat, another]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messagePayload = {
        chatId: userId,
        senderId: idURL,
        text: inputValue,
      };

      await axios.post(
        `https://instagram-4.onrender.com/api/message`,
        messagePayload
      );

      setInputValue("");
      const updatedChats = await axios.get(
        `https://instagram-4.onrender.com/api/message/${userId}/${idURL}`
      );
      setTextChat(updatedChats.data.data.product);

      const anotherChat = await axios.get(
        `https://instagram-4.onrender.com/api/message/${idURL}/${userId}`
      );
      setAnotherChat(anotherChat.data.data.product);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const { darkMode } = useContext(ThemeContext);
  const mergedChats = [...textChat, ...another].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div>
      <div className={`parent-viewChat ${ darkMode ? "dark-mode" : "light-mode"  }`}>
        <div className="container-viewChat">
          <div className="header-profile">
            {chatView?.map((e, index) => (
              <div className={`card-viewChat ${ darkMode ? "dark-mode" : "light-mode"  }`}  key={index}>
                <div className="proflie-person">
                  <Link to={`/${e.CreatBy}`} className="bg-person">
                    <img src={e.image} alt="" />
                    <h3>{e.title}</h3>
                  </Link>
                  <div className="icons-person">
                    <Link>
                      <IoCallOutline />
                    </Link>
                    <Link>
                      <CiVideoOn />
                    </Link>
                    <Link>
                      <IoIosInformationCircleOutline />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="detalis-chat">
            <div className="TypeChat">
            {chatView?.map((e, index) => (
              <div className="info-profiles" key={index}>
                <img src={e.image} alt="" key={index} />
                <div className="mall">
                  <h3>{e.title}</h3>
                  <p>{e.mall}</p>
                </div>
                <Link className="Viewfile" to={`/${e.CreatBy}`}>
                  View Profile
                </Link>
              </div>
            ))}
                {mergedChats.map((e, index) => (
                  <div className={e.senderId === userId ? "other" : "owner"} key={index}>
                    <Link to={`/${idURL}`}>
                      <img src={e.senderId === idURL ? "" : chatView[0]?.image}  alt=""/>
                    </Link>
                    <p>{e.text}</p>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form className={darkMode ? "dark-mode" : "light-mode"} onSubmit={handleSubmit}>
            <Link className="iconTypes">
              <GiMouthWatering />
            </Link>
            <input type="text" value={inputValue} placeholder="Message..." name="text" onChange={handleChange}/>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewChat;
