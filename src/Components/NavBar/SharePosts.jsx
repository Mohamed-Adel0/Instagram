import axios from "axios";
import React, { useContext, useState } from "react";
import { PiImagesLight } from "react-icons/pi";
import { ThemeContext } from "../ThemeContext/ThemeContext";
const SharePosts = () => {
  const [formData, setFormData] = useState({
    description: "", // hna a7tmal adef key tany 3shan ab3t ly back end id Profile
    });
  let idUser = JSON.parse(localStorage.getItem("id"));
  let idProfile = JSON.parse(localStorage.getItem("idProfile"));
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", image);
      await axios.post( `https://instagram-4.onrender.com/api/Post/CreatePost/${idUser}/${idProfile}`,formDataToSend)
      window.location.pathname = "/"
    } catch (error) {
      console.error(error);
    }
  };
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      <div className="parent-posts">
        <div className="container-posts">
          <div className={`card-posts ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-posts">
              <h3>Create new post</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <p>
                <PiImagesLight />
              </p>
              <h2>Drag photos and videos here</h2>
              <input type="text" placeholder="description" name="description" value={formData.description} onChange={handleChange}/>
              <input type="file" id="upload" name="image" onChange={handleImageChange}/>
              <label htmlFor="upload">Select from computer</label>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePosts;
