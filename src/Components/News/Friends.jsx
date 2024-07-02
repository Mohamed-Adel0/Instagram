import React, { useEffect, useState } from "react";
import { Profile } from "../../ControlAPI/API";
import { Link } from "react-router-dom";
import axios from "axios";
const Friends = () => {
  let fristName = JSON.parse(localStorage.getItem("firstName"));
  let id = JSON.parse(localStorage.getItem("id"));
  let idProfile = JSON.parse(localStorage.getItem("idProfile"));
  const [DataProfile, SetDataProfile] = useState(null);
  const [getAllProfiles, setAllProfile] = useState(null);
  useEffect(() => {
    const APIS = async () => {
      try{
        await axios.get(`https://instagram-4.onrender.com/api/Profile/getProfile/${id}`).then((e) => {
          SetDataProfile(e.data.data.product);
          localStorage.setItem("idProfile",JSON.stringify(e.data.data.product[0]._id));
        });
      }catch(err){
        console.error("Get Profile Have Error Page Friends" , err)
      }
      try{
        const getAllProfile = await axios.get(`https://instagram-4.onrender.com/api/Profile/GetAllProfile`)
        setAllProfile(getAllProfile.data.data.product)
      }catch(err){
        console.log("Data Have Error in Page Friends" , err);
      }
    };
    APIS();
  }, []);
  const filteredProfiles = getAllProfiles?.filter(e => e._id !== idProfile);
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
      <div className="parent-friends">
        <div className="container-friends">
          <div className="owner-profile">
            {Profile?.map((e, index) => (
              <div className="card-profile" key={index}>
                {DataProfile?.map((e, index) => (
                  <img src={e.image} alt="" key={index} />
                ))}
                <div className="paragraph-profile">
                {DataProfile?.map((e, index) => (
                  <Link to={`/${id}`} key={index}>
                  <h2>{e.title}</h2>
                    </Link>
                  ))}
                  <h3>{fristName} 💪</h3>
                </div>
                <button>{e.switch}</button>
              </div>
            ))}
          </div>
          <div className="Suggestions-firends">
            <div className="Suggested-friends">
              <h1>Suggested for you</h1>
              <button>See All</button>
            </div>
            {filteredProfiles?.slice(0, 4).reverse().map((e, index) => (
              <div className="card-profile" key={index}>
                <Link to={`${e.CreatBy}`}>
                  <img src={e.image} alt="" />
                </Link>
                <div className="paragraph-profile">
                  <Link to={`${e.CreatBy}`}>
                    <h2>{truncateText(e.title, 2)}</h2>
                  </Link>
                  <h3>{truncateText(e.nickName, 2)}</h3>
                </div>
                <button>{e.switch}</button>
              </div>
            ))}
          </div>
          <div className="footer">
            <div className="texts">
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>About.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Help.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Press.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>API.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Jobs.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Prviacy.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Terms.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Location.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Language.</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mohamed-adel-226611286/"
                target="_blank"
              >
                <p>Meta Verified.</p>
              </Link>
            </div>
            <Link
              to="https://www.linkedin.com/in/mohamed-adel-226611286/"
              target="_blank"
            >
              <p>© 2024 INSTAGRAM FROM MOHAMED-ADEL</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Friends;
