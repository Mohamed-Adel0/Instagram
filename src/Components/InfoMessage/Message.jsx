import React, { useContext, useEffect, useState } from "react";
import Css from "./Message.module.css";
// import { persons } from "../../ControlAPI/API";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext/ThemeContext";
const Message = () => {
  const ids = useParams();
  const idURL = ids.id;
  const idUsers = JSON.parse(localStorage.getItem("id"))
  const idProfile = JSON.parse(localStorage.getItem("idProfile"))
  const [formData, setFormData] = useState({
    firstId: idUsers,
    secondId: idURL,
  });
  const [PeopleChat, SetPeopleChat] = useState(null);
  useEffect(() => {
      const PersonAPI = async () => {
       try{
        const Response = await axios.get(`https://instagram-4.onrender.com/api/Profile/GetAllProfile`)
          SetPeopleChat(Response.data.data.product);
       }catch(err){
        console.log("GetAllProfile Have Error" , err)
       }
      };
      PersonAPI();
    },[idURL]);
  const handleSubmit = async (e) => {
    try {// hna m7tag a3ml refresh 3alla el Id 3shan a2der a5tar el User elly hklmo
      await axios.post(`https://instagram-4.onrender.com/api/chat`,formData);
    } catch (error) {
      console.error("Error", error);
    }
  };
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
  }, [idURL]);
  const { darkMode } = useContext(ThemeContext);
  const FilterChat = PeopleChat?.filter(e => e._id !== idProfile);
  return (
    <div>
      <div className={`${Css.parent}`}>
        <div className={Css.container}>
          <div className={`${Css.card} card-messages ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className={`${Css.info} card-infoo`}>
              <h1>Mohamed-Adel</h1>
              <div className={Css.changePraivte}>
                <h3>Primary</h3>
                <h3>General</h3>
                <h3>Requests</h3>
              </div>
            </div>
            {sizeScreen? FilterChat?.map((e,index ) => (// Here for Size Screen if Screen Size change make Events
              <Link to={`/message/${e.CreatBy}`} className={Css.person} onClick={() => handleSubmit()}  key={index}>
                <div className={Css.imgProfile}>
                  <img src={e.image} alt="" />
                </div>
                <div className={Css.paragraph}>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                </div>
              </Link>))
              : FilterChat?.map((e, index) => (
                  <Link  to={`/messag/${e.CreatBy}`} className={`${Css.person} person`} onClick={() => handleSubmit()}  key={index}>
                    <div className={Css.imgProfile}>
                      <img src={e.image} alt="" />
                    </div>
                    <div className={Css.paragraph}>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
