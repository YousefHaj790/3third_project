import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import MainLogin from "../Images/yosefhaj_shoping_theme_model_guy_using_phone_9f447e15-2b4b-4be9-b98f-a950d08bc6ba.png";
import Icon from "../Images/yosefhaj_task_manager_image_icon_use_5D737E_color_4e4dacdb-b09e-420f-9ecb-69d30c715e06.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";




const Login = () => {
  const [registerVisibility, setRegisterVisibility] = useState("block");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const location = useLocation();
  const { Return } = location.state || { Return: registerVisibility };




  const showRegister = () => {
    setRegisterVisibility("none");
  };



  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3003/profile/users/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userid", data.user._id);
        sessionStorage.setItem("username", data.user.firstName);

        navigate("/Tasks");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };






  return (
    <div style={{ position: "relative", marginTop: "2rem" }}>
      <div className="DIV">
        <form
          style={{ display: Return }}
          className="LOGIN"
          onSubmit={signIn}
        >
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className="SIGNIN_BTN" type="submit">
            Sign in
          </button>
          <br />
          {error && <div className="ERROR">{error}</div>}{" "}
          {/* Display error message */}
          <Link to="/Register" state={{ Return: "none" }}>
            <button onClick={showRegister} className="SIGNUP_BTN">
              Don't you have an account? Create now!
            </button>
          </Link>
          <br />
          <img src={Icon} alt="Shop Icon" width={80} height={80} />
        </form>

        <Outlet />

        <div className="THEME">
          <img src={MainLogin} alt="Login Theme" />
        </div>
      </div>
    </div>
  );
};

export default Login;
