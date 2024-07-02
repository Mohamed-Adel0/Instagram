import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pictures from "../../Pictures/home-phonesws.png";
import axios from "axios";
import { useAuth } from "../../Routing/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [TakeValue, SetTakeValue] = useState({
    email: "",
    password: "",
    // type: "users",
  });
  const [ErrorMail, SetErrorMail] = useState(false);
  const [ErrorPass, SetErrorPass] = useState(false, "");
  const [EmailInvalid, SetEmailInvalid] = useState("");
  const [PasswordInvalid, SetPasswordInvalid] = useState("");
  const { login } = useAuth();

  const ValidationLogin = async (TakeValue) => {
    try {
      await axios
        .post(
          "https://instagram-4.onrender.com/api/auth/signIn",
          TakeValue
        )
        .then((e) => {
          if (e.data.status === "success") {
            localStorage.setItem(
              "token",
              JSON.stringify(e.data.data.product[1].token)
            );
            localStorage.setItem(
              "firstName",
              JSON.stringify(e.data.data.product[2].firstName)
            );
            localStorage.setItem(
              "lastName",
              JSON.stringify(e.data.data.product[2].lastName)
            );
            localStorage.setItem(
              "email",
              JSON.stringify(e.data.data.product[2].email)
            );
            localStorage.setItem(
              "id",
              JSON.stringify(e.data.data.product[2]._id)
            );
            SetEmailInvalid("SuccessFully");
            SetPasswordInvalid("");
            setInterval(() => {
              window.location.pathname = "/";
            }, 500);
            login();
          }
        });
    } catch (err) {
      if (err.response.data.status !== "sucess") {
        SetErrorMail(err.response.data.data);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const CheckEmail = /^[a-zA-Z]{3,15}[0-9]{0,4}@(hotmail|yahoo|gmail).com$/g;
    const Checkpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (CheckEmail.test(TakeValue.email)) {
      SetErrorMail(false);
      if (Checkpassword.test(TakeValue.password)) {
        ValidationLogin(TakeValue);
        toast('Welcome To Your Home',
          {
            icon: '🥳',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        SetErrorPass(false);
      } else {
        SetErrorPass(true);
        SetErrorPass("Invalid Password");
      }
    } else {
      SetErrorMail(true);
      SetErrorMail("Email is not Valid");
    }
  };
  const handleChange = (e) => {
    const Validation = { ...TakeValue };
    Validation[e.target.name] = e.target.value;
    SetTakeValue({ ...Validation });
  };
  return (
    <div>
      <div className="parent-login">
        <div className="container-login">
          <div className="card-images">
            <img src={Pictures} alt="" />
          </div>
          <div className="cards-login">
            <div className="card-login">
              <h3>Instagram</h3>
              <form onSubmit={handleSubmit}>
                <div className="textError">
                  <p className={`errors`}>
                    {ErrorMail}
                    {EmailInvalid}
                    {PasswordInvalid}
                    {ErrorPass}
                  </p>
                </div>
                <input
                  // className={`${ErrorMail ? "border-allarm" : "border-true"}`}
                  type="email"
                  placeholder="Your email"
                  name="email"
                  onChange={handleChange}
                />
                <input
                  // className={`${ErrorPass ? "border-allarm" : "border-true"}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                {/* <div className="textError">
                  <p className={`errors`}>
                    {ErrorPass} {PasswordInvalid}
                  </p>
                </div> */}
                <button>Log in</button>
              </form>
              <fieldset>
                <legend>Or</legend>
                <Link>Did you forget the secret number?</Link>
              </fieldset>
            </div>
            <div className="card-login">
              <Link to="/register">Create a new account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
