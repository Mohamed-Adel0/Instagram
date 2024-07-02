import React, { useContext, useEffect, useState } from "react"; // here NavBar for Size Width 450 Pexel
import { IoIosAddCircleOutline, IoIosSearch} from "react-icons/io";
import { Link } from "react-router-dom";
import Css from "./Search.module.css"
import SharePosts from "./SharePosts";
import axios from "axios";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { CiHome, CiUser, CiVideoOn } from "react-icons/ci";
const NavBarSmallSize = () => {
  const [width , setwidth] = useState(false)
  const ChangeStyle = ()=>{
    setwidth(!width)
  }
  const [ DevPosts, setDevPosts] = useState(false)
  const DevPost = ()=>{
    setDevPosts(!DevPosts)
  }
  const [DataProfile, SetDataProfile] = useState(null);
  let idUsers = JSON.parse(localStorage.getItem("id")); // here For take Some Info from The Profile Login
  const [showProfile , SetshowProfile] = useState(false)
 useEffect(() => {
    const Products = async () => {
      // Hna 3shan Fetch bta3 esm kol we7ad mnazel Post 3alla Sora we el Sora bt3ato
      if (localStorage.getItem("idProfile")) {
        console.log("welcome");
        SetshowProfile(true)
      }else{
        console.log("Error");
        SetshowProfile(false)
      }
      try {
        const ProfilesImage = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/getProfile/${idUsers}`
        );
        SetDataProfile(ProfilesImage.data.data.product);
      } catch (error) {
        console.error("Error fetching profile image", error);
      }
    };
    Products();
  }, []);
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div>
      <div className= {`parent-smailSize`}>
        <div className="container-smailSize">
          <div className="card-smailSize">
            <ul className={darkMode ? 'dark-mode' : 'light-mode'}>
            <li><Link to="/"><CiHome /></Link></li>
            <li><Link onClick={()=>ChangeStyle()} to="#"><IoIosSearch/> </Link></li>
            <li><Link onClick={()=>DevPost()} to=""><IoIosAddCircleOutline    />   </Link></li>
            <li><Link to="/"><CiVideoOn  /> </Link></li>
            <li><Link to={`/${idUsers}`}><div className="Pimage">{DataProfile?.map((e,index)=><img src={e.image} alt="" key={index}/>)}<CiUser className={`${showProfile? "hide-profile" : "show-profile"}`} /></div>
            
            </Link></li>
            </ul>
          </div>
        </div>
        <div className={`${Css.parent} Search-bar ${darkMode ? 'dark-mode' : 'light-mode'} ${width ? `${Css.backSearch}` : ""}`}>
        <div className={Css.container}>
          <div className={Css.card}>
            <h1>Search</h1>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className={`dev-posts ${DevPosts ? "left-posts" : ""}`}>
        <><SharePosts/></>
        <button className="close-posts" onClick={()=>DevPost()}>X</button>
      </div>
      </div>
    </div>
  );
};

export default NavBarSmallSize;
