import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import axios from "axios";
const News = () => {
  const [SizNav, SetSizNav] = useState(false);
  const [DataProfile, SetDataProfile] = useState(null);
  const [getallprofile, SetGetallProfile] = useState(null);
  let id = JSON.parse(localStorage.getItem("id"));
  let idProfile = JSON.parse(localStorage.getItem("idProfile"));
  useEffect(() => {
    const changeSizeScreen = () => {
      if (window.innerWidth <= 425) {
        SetSizNav(false);
      } else {
        SetSizNav(true);
      }
    };
    changeSizeScreen();
    window.addEventListener("resize", changeSizeScreen);
    const APIS = async () => {
     try{
      await axios.get(`https://instagram-4.onrender.com/api/Profile/getProfile/${id}`).then((e) => {
        SetDataProfile(e.data.data.product);
        localStorage.setItem("idProfile",JSON.stringify(e.data.data.product[0]._id));
      });
     }catch(err){
      console.error("Get Profile Have Error Page News" , err)
     }
     try{
      const getAllProfile =await axios.get(`https://instagram-4.onrender.com/api/Profile/GetAllProfile`)
      SetGetallProfile(getAllProfile.data.data.product)
     }catch(err){
      console.log("Get All Profile have Error in Page News" , err);
     }
    };
    APIS();
  }, []);
  const filteredProfiles = getallprofile?.filter(e => e._id !== idProfile);
  const truncateText =(text, maxWords)=> {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text; 
  }
  return (
    <div>
      <div className="parent-news">
        <div className="container-news">
          {SizNav ? (
            ""
          ) : (
            <div className="nav-header">
              <h3>instagram</h3>
              <div className="icons-heade">
                <Link>
                  <FaRegHeart />
                </Link>
                <Link to="/message">
                  <RiMessengerLine />
                </Link>
              </div>
            </div>
          )}
          <div className="stores-news">
            {DataProfile?.map((e, index) => (
              <div className="card-stores" key={index}>
                <div className="image-stores">
                  <img src={e.image} alt="" />
                  <h6>{truncateText(e.title, 1)}</h6>
                </div>
              </div>
            ))}
            {filteredProfiles?.map((e, index) => 
              <div className="card-stores" key={index}>
                <Link to={`${e.CreatBy}`} className="image-stores">
                  <img src={e.image} alt="" />
                  <h6>{truncateText(e.title, 1)}</h6>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
