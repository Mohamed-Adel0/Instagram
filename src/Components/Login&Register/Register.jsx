import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pictures from "../../Pictures/home-phones.png";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const [ChangeValue, SetChangeValue] = useState({
    //Hna b5azan el Value elly rag3ly mn el Input
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reaPetpassword: "",
  });
  const Path = useNavigate();
  const [allarmEmail, SetAllarmEmail] = useState(false);
  const [allarmFristName, SetallarmFristName] = useState(false);
  const [allarmLastName, SetallarmLastName] = useState(false);
  const [allarmPassword, SetallarmPassword] = useState(false);
  // const [Accpet, SetAccpet] = useState(false);
  const [CopyText, SetCopyText] = useState("");
  const URLRegister = async (ValueInput) => {
    //ValueInput da loop rag3ly mn function submit gowaha State elly shayala el Data
    try {
      await axios
        .post(
          "https://instagram-4.onrender.com/api/auth/SignUp",
          ValueInput
        )
        .then((e) => {
          // if (e.data.error !== null) {
          //   //da fe 7alt low el data mogoda tatl3 Error eza kan email aw Passowrd mogod
          //   SetAllarmEmail(true)
          // }
        });
    } catch (err) {
      console.log(err);
      console.log();
      SetCopyText(err.response.data.data);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const CheckEmail = /^[a-zA-Z]{3,15}[0-9]{0,4}@(hotmail|yahoo|gmail).com$/g;
    const CheckUserName = /^[A-Z][a-z]{3,10}$/;
    const CheckPassowrd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (CheckUserName.test(ChangeValue.firstName)) {
      SetallarmFristName(false);
      if (CheckUserName.test(ChangeValue.lastName)) {
        SetallarmLastName(false);
        if (CheckEmail.test(ChangeValue.email)) {
          SetAllarmEmail(false);
          if (CheckPassowrd.test(ChangeValue.password)) {
            SetallarmPassword(false);
            SetCopyText("Successfully");
            toast.success('Registration Successful!')
            URLRegister(ChangeValue); // hna ktabt ChangeValue 3shan el data rag3 mn 5lelha f b3tha Paramtar ly Axios
            setTimeout(() => {
              Path("/login");
            }, 800);
            // SetAccpet(false);
          } else {
            SetallarmPassword(true);
            // SetAccpet(true);
            SetCopyText("Password Does Not Match");
          }
        } else {
          SetAllarmEmail(true);
          SetCopyText("Enter a valid email address.");
        }
      } else {
        SetallarmLastName(true);
        SetCopyText(
          "In the first letter of the name it must be a capital letter"
        );
      }
    } else {
      SetallarmFristName(true);
      SetCopyText(
        "In the first letter of the name it must be a capital letter"
      );
    }
    // SetAccpet(true);
  };
  const handleChange = (e) => {
    const UpdateData = { ...ChangeValue };
    UpdateData[e.target.name] = e.target.value;
    SetChangeValue({ ...UpdateData });
  };
  return (
    <div>
      <div className="parent-register">
        <div className="container-register">
          <div className="card-images">
            <img src={Pictures} alt="" />
          </div>
          <div className="cards-register">
            <div className="card-register">
              <h3>Instagram</h3>
              <p>Sign up to see photos and videos from your friends.</p>
              <fieldset>
                <legend>Or</legend>
                <form onSubmit={handleSubmit}>
                  <div className="textError">
                    <p className={`errors`}>
                      {/* You have to write the correct email */}
                      {CopyText}
                    </p>
                  </div>
                  <input
                    required
                    className={`${
                      allarmFristName ? "border-allarm" : "border-true"
                    }`}
                    type="text"
                    placeholder="Frist Name"
                    name="firstName"
                    onChange={handleChange}
                  />
                  <input
                    required
                    className={`${
                      allarmLastName ? "border-allarm" : "border-true"
                    }`}
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                  />
                  <input
                    required
                    className={`${
                      allarmEmail ? "border-allarm" : "border-true"
                    }`}
                    type="email"
                    placeholder="Your email"
                    name="email"
                    onChange={handleChange}
                  />
                  <input
                    required
                    className={`${
                      allarmPassword ? "border-allarm" : "border-true"
                    }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <input
                    required
                    type="password"
                    placeholder="Reapet Password"
                    name="reaPetpassword"
                    onChange={handleChange}
                  />
                  {/* <div className="textError">
                    {ChangeValue.reaPetpassword !== ChangeValue.password &&
                      Accpet && (
                        <p className="errors">Passworrd Does Not Match</p>
                      )}
                  </div> */}
                  <button>Sign up</button>
                </form>
              </fieldset>
            </div>
            <div className="card-register">
              <Link to="/login">
                Have an account? <span>Log in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
