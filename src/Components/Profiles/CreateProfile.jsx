import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateProfile = () => {
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
        .post(`https://instagram-4.onrender.com/api/Profile/CreateProfile/${id}`, formDataToSend)
        .then((e) => {
            Path(`/${id}`)
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="parent-EditProfile">
        <div className="container-EditProfile">
          <div className="card-EditProfile">
            <div className="text-EditProfile">
              <h3>Edit your Profile</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <p>
                Create your links is only available on mobile. Visit the
                Instagram app and edit your profile to change the websites in
                your bio.
              </p>
              <input type="text" placeholder="Your Name" name="title" value={formData.title} onChange={handleChange}/>
              <input type="text" placeholder="NickName" name="nickName" value={formData.nickName} onChange={handleChange}/>
              <input type="text" placeholder="Bio" name="description" value={formData.description} onChange={handleChange}/>
              <input type="file" id="upload" name="image" onChange={handleImageChange} />
              <label htmlFor="upload">Select Your Photo Profile</label>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
