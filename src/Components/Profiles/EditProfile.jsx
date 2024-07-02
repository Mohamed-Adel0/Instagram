import axios from "axios";
import React, { useContext, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const EditProfile = () => {
  const Path = useNavigate();
  const pid = useParams()
  const id = pid.id
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    nickName: "",
  });
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("nickName", formData.nickName);
      formDataToSend.append("image", image);
      await axios
        .patch(`https://instagram-4.onrender.com/api/Profile/UpdateProfile/${id}`, formDataToSend)
        .then((e) => {
            Path(`/${id}`)
        });
    } catch (error) {
      console.error(error);
    }
  };
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      <div className={`parent-EditProfile ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="container-EditProfile">
          <div className="card-EditProfile">
            <div className="text-EditProfile">
              <h3>Edit your Profile</h3>
            </div>
            <form className="Edit-Profile" onSubmit={handleSubmit}>
              <p>
                Editing your links is only available on mobile. Visit the
                Instagram app and edit your profile to change the websites in
                your bio.
              </p>
              <input type="text" required placeholder="Your Name" name="title" value={formData.title} onChange={handleChange}/>
              <input type="text" required placeholder="NickName" name="nickName" value={formData.nickName} onChange={handleChange}/>
              <input type="text" required placeholder="Bio" name="description" value={formData.description} onChange={handleChange}/>
              <input type="file" required id="upload" name="image" onChange={handleImageChange} />
              <label htmlFor="upload">Select Your Photo Profile <span><IoMdCloudDownload /></span></label>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
