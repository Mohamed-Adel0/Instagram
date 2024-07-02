import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Menu from "../NavBar/Menu";
import { aboutProfile } from "../../ControlAPI/API";
import { Stores } from "../../ControlAPI/API";
import { Posts } from "../../ControlAPI/API";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Profiles = () => {
  const [DataProfile, SetDataProfile] = useState(null);
  const [sizeScreen, setsizeScreen] = useState(false);
  useEffect(() => {
    const changeSizeScreen = () => {
      if (window.innerWidth <= 1024) {
        setsizeScreen(false);
      } else {
        setsizeScreen(true);
      }
    };
    changeSizeScreen();
    window.addEventListener("resize", changeSizeScreen);
  }, []);
  const pid = useParams()
  const idProfile = pid.id
  console.log(idProfile);
  let fristName = JSON.parse(localStorage.getItem("firstName"));
  let lastName = JSON.parse(localStorage.getItem("lastName"));
  let id = JSON.parse(localStorage.getItem("id"));
  // console.log(fristName , lastName);
  useEffect(() => {
    const APIS = async () => {
      try {
        const response = await axios.get(
          `https://instagram-4.onrender.com/api/Profile/getProfile/${id}`
        );
        SetDataProfile(response.data.data.product);
        console.log(response.data.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    APIS();
    // axios
    //   .get(`https://instagram-4.onrender.com/api/Profile/getProfile/${idProfile}`)
    //   .then((e) => console.log(e));
  }, []);
  // console.log(JSON.stringify(DataProfile));
  return (
    <div>
      <div className="parent-profile">
        <div className="ChangeSize-NavBar">
          {sizeScreen ? <NavBar /> : <Menu />}
        </div>
        <div className="container-profile">
          <div className="information-profile">
            {aboutProfile?.map((e) => (
              <div className="box-profile" key={e.id}>
                {DataProfile?.map((mo, index) => (
                  <img src={mo.image} alt="" key={index} />
                ))}
                <div className="paragraph-profiles">
                  <div className="edit">
                    <Link>
                      <h3>
                        {fristName} {lastName}
                      </h3>
                    </Link>
                    <Link to={`/${id}/edit`}>
                      <button>Edit Profile</button>
                    </Link>
                    <Link to={`/${id}/createprofile`}>
                      <button>Create Profile</button>
                    </Link>
                    <button>Ad tools</button>
                  </div>
                  <div className="followers">
                    <p>6 Posts</p>
                    <p>61.1M followers</p>
                    <p>0 following</p>
                  </div>
                  {DataProfile?.map((mo, index) => (
                    <div className="texts" key={index}>
                      <p>{mo.title} 💪</p>
                      <p>{mo.description}</p>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Molestiae excepturi aperiam nostrum alias laborum
                        sit.
                      </p>
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
            {Posts?.map((e) => (
              <div className="card-posts" key={e.id}>
                <Link>
                  <img src={e.image} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
