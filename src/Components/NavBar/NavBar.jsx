import React, { useContext, useEffect, useState } from "react";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { BsCameraReels } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiHeart, CiHome } from "react-icons/ci";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { MdOutlineAddBox, MdOutlineExplore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import Css from "./Search.module.css";
import { useAuth } from "../../Routing/AuthProvider";
import SharePosts from "./SharePosts";
import axios from "axios";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const NavBar = () => {
  const {toggleDarkMode ,darkMode } = useContext(ThemeContext);
  const [width, setwidth] = useState(false);
  const ChangeStyle = () => {
    setwidth(!width);
  };
  const [message, setMessage] = useState(false);
  const messages = () => {
    setMessage(!message);
  };
  const [Logouts, setLogouts] = useState(false);
  const ChangeStyleLogouts = () => {
    setLogouts(!Logouts);
  };
  const [DevPosts, setDevPosts] = useState(false);
  const DevPost = () => {
    setDevPosts(!DevPosts);
  };
  const { logout } = useAuth(); // here for Log out to Remove The Detalis from User
  const Path = useNavigate();
  const LogOuts = () => {
    logout();
    Path("/login");
  };
  let idUsers = JSON.parse(localStorage.getItem("id")); // here For take Some Info from The Profile Login
  let id = JSON.parse(localStorage.getItem("id"));
  const [DataProfile, SetDataProfile] = useState(null);
  useEffect((e) => {
    const APIS = async () => {
      try {
        let Response = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/getProfile/${id}`
        );
        SetDataProfile(Response.data.data.product);
        localStorage.setItem("idProfile",JSON.stringify(Response.data.data.product[0]._id))   
      } catch (err) {
        console.error("Get Profile Have Error Page NavBar", err);
      }
    };
    APIS();
  }, []);
  return (
    <div>
      <div className={`parent-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className={`container-navbar ${width ? "border" : ""}`}>
          <div className={`card ${width ? `cardpadding` : ""}`}>
            <div className={`logo ${width ? "ChangeWidth" : ""}`}>
              <Link to="/" className={`${width ? "hide" : ""}`}>
                Instgram
              </Link>
              <Link className={` ${width ? "show pad" : "hide"}`} to="/">
                <FaInstagram />{" "}
              </Link>
            </div>
            <ul
              className={`${width ? "ChangeWidth" : ""} ${
                message ? "ChangeWidth" : ""
              }`}
            >
              <li>
                <Link to="/">
                  <button>
                  <CiHome />
                  </button>
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={() => ChangeStyle()} to="#">
                  <button>
                    <IoIosSearch />
                  </button>
                  Search{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button>
                    <MdOutlineExplore />
                  </button>{" "}
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button>
                    <BsCameraReels />
                  </button>{" "}
                  Reels
                </Link>
              </li>
              <li>
                <Link onClick={() => messages()} to="/message">
                  <button>
                    <BiMessageRoundedCheck />
                  </button>{" "}
                  Message
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button>
                    <CiHeart />
                  </button>{" "}
                  Notifications
                </Link>
              </li>
              <li>
                <Link onClick={() => DevPost()} to="">
                  <button>
                    <MdOutlineAddBox />
                  </button>{" "}
                  Create
                </Link>
              </li>
              <li><Link to={`/${idUsers}`}> <div className="Pimage"> 
                {DataProfile?.map((e, index) => ( <img src={e.image} alt="" key={index} />))}</div>Profile</Link></li>
              <div className="dev-LogOut">
                <li>
                  <Link onClick={() => ChangeStyleLogouts()} to="">
                    <button>
                      <IoIosMenu />
                    </button>{" "}
                    More
                  </Link>
                </li>
                <div className={`fixed-LogOut ${Logouts ? "top-logOut" : ""}`}>
                  <button onClick={toggleDarkMode}>Switch appearance</button>
                  <button onClick={() => LogOuts()}>Log out</button>
                </div>
              </div>
            </ul>
            <ul
              className={`${width ? "ChangeWidth" : ""} ${
                message ? "ChangeWidth" : ""
              }`}
            >
              <li>
                <Link to="/">
                  <button>
                  <CiHome />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link onClick={() => ChangeStyle()} to="#">
                  <button>
                    <IoIosSearch />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <button>
                    <MdOutlineExplore />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link to="/reels">
                  <button>
                    <BsCameraReels />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link onClick={() => messages()} to="/message">
                  <button>
                    <BiMessageRoundedCheck />
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/notifications">
                  <button>
                    <CiHeart />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link onClick={() => DevPost()} to="">
                  <button>
                    <MdOutlineAddBox />
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <button>
                    <CgProfile />{" "}
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button>
                    <IoIosMenu />
                  </button>{" "}
                  More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${Css.parent} ${width ? `${Css.backSearch}` : ""} Search-bar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className={Css.container}>
          <div className={Css.card}>
            <h1>Search</h1>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className={`dev-posts ${DevPosts ? "left-posts" : ""}`}>
        <SharePosts />
        <button className="close-posts" onClick={() => DevPost()}>
          X
        </button>
      </div>
    </div>
  );
};

export default NavBar;
