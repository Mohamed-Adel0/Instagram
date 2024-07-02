import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Menu from "../NavBar/Menu";
import { aboutProfile } from "../../ControlAPI/API";
import { Stores } from "../../ControlAPI/API";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBarSmallSize from "../NavBar/NavBarSmallSize";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../Routing/AuthProvider";
import { ThemeContext } from "../ThemeContext/ThemeContext";
const SingalProfile = () => {
  const [sizeScreen, setsizeScreen] = useState(false);
  const [DataProfile, SetDataProfile] = useState(null);
  const [getposts, SetGetPost] = useState(null);
  const [ChangeSize, SetChangeSize] = useState(false);
  useEffect(() => {
    // here for Change Size Width
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
  }, []);
  let id = JSON.parse(localStorage.getItem("id"));
  // let idProfiles = JSON.parse(localStorage.getItem("idProfile"));
  let pid = useParams();
  let IdProfile = pid.id;
  let TitleProfiles = JSON.parse(localStorage.getItem("TitleProfile"));
  useEffect(() => {
    // here for fetch API from Back-End
    const APIS = async () => {
      try {
        await axios
          .get(
            `https://instagram-4.onrender.com/api/Profile/getProfile/${IdProfile}`
          )
          .then((e) => {
            SetDataProfile(e.data.data.product);
            localStorage.setItem(
              "TitleProfile",
              JSON.stringify(e.data.data.product[0].title)
            );
          });
      } catch (err) {
        console.error("GetProfile Have Error", err);
      }
      try {
        await axios
          .get(`https://instagram-4.onrender.com/api/Post/getPost/${IdProfile}`)
          .then((e) => {
            SetGetPost(e.data.data.product);
          });
      } catch (err) {
        console.error("get have Error", err);
      }
    };
    APIS();
    RemoveBtn();
  }, [IdProfile, TitleProfiles]);

  // console.log(person);
  const [ChangeStyle, setChangeStyle] = useState(false);
  const btnClick = () => {
    setChangeStyle(!ChangeStyle);
  };
  const { logout } = useAuth(); // here for Log out to Remove The Detalis from User
  const Path = useNavigate();
  const LogOuts = () => {
    logout();
    Path("/login");
  };
  // Here for Create Profile
  const [EventBtn, SetEventbtn] = useState(false);
  const RemoveBtn = () => {
    if (JSON.parse(localStorage.getItem("TitleProfile"))) {
      SetEventbtn(true);
    } else {
      SetEventbtn(false);
    }
  };
  const { darkMode , toggleDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <div className={`parent-profile ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="ChangeSize-NavBar">
          {sizeScreen ? <NavBar /> : <Menu />}
        </div>
        <div className="container-profile">
          <div className="information-profile">
            {aboutProfile?.map((e) => (
              <div className="box-profile" key={e.id}>
                {DataProfile?.map((e, index) => (
                  <img src={e.image} alt="" key={index} />
                ))}
                <div className="paragraph-profiles">
                  <div className="edit">
                    {DataProfile?.map((e, index) => (
                      <Link key={index}>
                        <h3>{e.title}</h3>
                      </Link>
                    ))}
                    {ChangeSize ? (
                      <>
                        <Link
                          className={`${EventBtn ? "" : "RemoveBtn"}`}
                          to={`/${id}/edit`}
                        >
                          <button>Edit Profile</button>
                        </Link>
                        <button className={`${EventBtn ? "" : "RemoveBtn"}`}>
                          Ad tools
                        </button>
                        <Link
                          className={`${EventBtn ? "RemoveBtn" : "ShowBtn"}`}
                          to={`/${id}/createprofile`}
                        >
                          <button>Create Profile</button>
                        </Link>
                      </>
                    ) : (
                      <div className="icons-profiless">
                        <Link  className={`${EventBtn ? "" : "RemoveBtn"}`}  to={`/${id}/edit`}>
                          <button>Edit Profile</button>
                        </Link>
                        <button className={`${EventBtn ? "" : "RemoveBtn"}`}> Ad tools</button>
                        <Link  className={`${EventBtn ? "RemoveBtn" : "ShowBtn"}`}  to={`/${id}/createprofile`}>
                          <button>Create Profile</button>
                        </Link>
                        <Link onClick={() => btnClick()}>
                          <CiMenuBurger
                            className={`${ChangeStyle ? "hide-btn" : ""}`}
                          />
                          <IoMdClose
                            className={`${ChangeStyle ? "" : "hide-btn"}`}
                          />
                        </Link>
                        <div className={`menu-logOut ${  ChangeStyle ? "back-logOuts" : ""}`}>
                          <button onClick={toggleDarkMode}>Switch appearance</button>
                          <button onClick={() => LogOuts()}>Log out</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`followers ${EventBtn ? "" : "RemoveBtn"}`}>
                    <p>{getposts?.length} Posts</p>
                    <p>61.1M followers</p>
                    <p>0 following</p>
                  </div>
                  {DataProfile?.map((mo, index) => (
                    <div className="texts" key={index}>
                      <p>{mo.nickName} 💪</p>
                      <p>{mo.description}</p>
                      <p>If I can do something for you Palestine I don't hesitate for seconds, Free Palestine , God be with you oh Palestine</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="stores-profile">
              {Stores?.map((e) => (
                <div className="card-stores" key={e.id}>
                  <Link>
                    <img src={e.image} alt="" />
                  </Link>
                  <p>{e.address}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="posts-profile">
            {getposts?.map((e, index) => (
              <div className="card-posts" key={index}>
                <Link>
                  <img src={e.image} alt="" />
                </Link>
              </div>
            ))}
          </div>
          {ChangeSize ? (
            ""
          ) : (
            <div className="navbar-smaillSize">
              <NavBarSmallSize />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingalProfile;
