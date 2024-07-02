import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import News from "../News/News";
import Friends from "../News/Friends";
import { Link } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { PiRepeatLight } from "react-icons/pi";
import axios from "axios";
import Menu from "../NavBar/Menu";
import NavBarSmallSize from "../NavBar/NavBarSmallSize";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import moment from 'moment';
const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [GetProducts, setProducts] = useState(null);
  const [getProfile, setGetProfile] = useState(null);
  useEffect(() => {
    const Products = async () => {
      // Hna Fetch 3alla kol el Post's elly m3roda fel 2lab el Profile 3shan a3rdha fel Page Home
      try {
        const GetAllProducts = await axios.get(
          `https://instagram-4.onrender.com/api/Post/getAllPost`
        ); // here for get all Posts
        setProducts(GetAllProducts.data.data.product);
      } catch (error) {
        console.error("Data is Not Working", error);
      }
      try {
        const GetDataProfiless = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/GetAllProfile`
        ); // here for get all Profile
        setGetProfile(GetDataProfiless.data.data.product);
      } catch (err) {
        console.log("Get All Profile is not working", err);
      }
    };
    Products();
  }, [GetProducts]);
  let filterProfile = getProfile?.filter((e) =>GetProducts?.map((p) => p.CreatProfile).includes(e._id)); 
  const [sizeScreen, setsizeScreen] = useState(false);
  const [ChangeSize, SetChangeSize] = useState(false);
  useEffect(() => {
    const changeSizeScreen = () => {
      if (window.innerWidth <= 1024) {
        setsizeScreen(false);
      } else {
        setsizeScreen(true);
      }
      if (window.innerWidth <= 425) {
        SetChangeSize(false);
      } else {
        SetChangeSize(true);
      }
    };
    changeSizeScreen();
    window.addEventListener("resize", changeSizeScreen);
  }, [filterProfile]);
  return (
    <div>
      <div className={`parent-home ${darkMode ? "dark-mode" : "light-mode"}`}>
        <div className="container-home">
          <div className="menu">{sizeScreen ? <NavBar /> : <Menu />}</div>
          <div className={`news ${darkMode ? "dark-mode" : "light-mode"}`}>
            <News />
            {GetProducts?.slice().reverse().map((e,index) => (//That's for all Post's
                  <div className="posts-news" key={index}>
                    <div className="card-posts">
                      <div className="info-persons">
                        {filterProfile?.map(
                          (mo, idx) => mo._id === e.CreatProfile && (
                              <div className="pictures" key={idx}>
                                <Link to={`${mo.CreatBy}`}>
                                  <img src={mo.image} alt="" />
                                </Link>
                                <Link to={`${mo.CreatBy}`}>
                                  <h3>{mo.title}</h3>
                                </Link>
                                <p>• {moment(e.createdAt).fromNow()}</p>
                              </div>
                            )
                        )}
                        <button>
                          <GoKebabHorizontal />
                        </button>
                      </div>
                      <div className="bg-images">
                        <img src={e.image} alt="" />
                      </div>
                      <div className="home-posts">
                        <div className="icons">
                          <div className="likes">
                            <button>
                              <CiHeart />
                            </button>
                            <button>
                              <FaRegComment />
                            </button>
                            <button>
                              <FiSend />
                            </button>
                          </div>
                          <button>
                            <PiRepeatLight />
                          </button>
                        </div>
                        <div className="paragaph-posts">
                          <Link>
                            <p>{e.Likes}1997 like</p>
                          </Link>
                          <div className="text">
                            <Link to={`${e.name}`}>
                              <h3>{e.name}</h3>
                            </Link>
                            <p>{e.description}</p>
                          </div>
                          <form>
                            <input type="text" placeholder="Add a comment..." />
                            <button>Send</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            {ChangeSize ? (
              ""
            ) : (
              <div className="navbar-smaillSize">
                <NavBarSmallSize />
              </div>
            )}
          </div>
          <div className="friends">
            <Friends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
