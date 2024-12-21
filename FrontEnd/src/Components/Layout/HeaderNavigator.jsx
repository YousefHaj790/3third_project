import React, { useEffect, useState } from "react";
import "../Styles/Navigator.css";
import icon from '../Images/yosefhaj_task_manager_image_icon_use_5D737E_color_4e4dacdb-b09e-420f-9ecb-69d30c715e06.png'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const USER_ID = sessionStorage.getItem("userid");




  const [Drop, setDrop] = useState("none");
  const allowedRoutes = ["/", "/Register"];




  useEffect(() => {
    if (!token && !allowedRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [token, location.pathname, navigate]);

  const Linkstyle = {
    all: "unset",
  };

  const DropDown = () => {
    setDrop("block");
  };

  const unDrop = () => {
    setDrop("none");
  };





  return (
    <>
      <div className="NAVIGATOR">
        <div className="nav">
          <div>
            <img src={icon} alt="" height={80} width={80} />
          </div>
          <ul>
            <li>
              <Link
                style={Linkstyle}
                to="/main"
                className={token ? "" : "disabled"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                style={Linkstyle}
                to="/about"
                className={token ? "" : "disabled"}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                style={Linkstyle}
                to="/Tasks"
                className={token ? "" : "disabled"}
              >
                Task Manager
              </Link>
            </li>
          </ul>
        </div>

        <div onMouseOver={DropDown} className="profileMenu">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/material-two-tone/24/menu--v1.png"
            alt="menu--v1"
          />
        </div>
      </div>

      <div className="Profile_dropDown">
        <ul style={{ display: Drop }} onMouseLeave={unDrop}>
          <Link
            to={`/Tasks/edit_profile/${USER_ID}`}
            className={token ? "" : "disabled"}
          >
            <li>
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                alt="user-male-circle"
              />
              Profile
            </li>
          </Link>

          <Link to="/Tasks/importants" className={token ? "" : "disabled"}>
            <li>
              <img
                style={{
                  height: "1.3rem",
                  width: "1.3rem",
                  float: "left",
                  marginRight: "5px",
                }}
                src="https://img.icons8.com/ink/48/important-book.png"
                alt="important-book"
              />
              Importants
            </li>
          </Link>

          <Link to="/Tasks/favorites" className={token ? "" : "disabled"}>
            <li>
              <img
                style={{
                  height: "1.3rem",
                  width: "1.3rem",
                  float: "left",
                  marginRight: "5px",
                }}
                src="https://img.icons8.com/ios/50/favorites.png"
                alt="favorites"
              />
              Favorites
            </li>
          </Link>

          <Link to="/Tasks/finished" className={token ? "" : "disabled"}>
            <li>
              <img
                style={{
                  height: "1.3rem",
                  width: "1.3rem",
                }}
                src="https://img.icons8.com/ios-glyphs/30/task-completed.png"
                alt="task-completed"
              />
              Finished
            </li>
          </Link>

          <li
            className={token ? "" : "disabled"}
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userid");
              sessionStorage.removeItem("username");
              localStorage.removeItem('tasks');
              navigate("/");
            }}
          >
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/windows/32/exit.png"
              alt="exit"
            />
            Log out
          </li>
        </ul>
      </div>

      <ul className="icon-list">
        <Link style={Linkstyle} to="/main" className={token ? "" : "disabled"}>
          <li>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/home--v1.png"
              alt="home--v1"
            />
          </li>
        </Link>
        <Link style={Linkstyle} to="/about" className={token ? "" : "disabled"}>
          <li>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/about.png"
              alt="about"
            />
          </li>
        </Link>
        <Link style={Linkstyle} to="/Tasks" className={token ? "" : "disabled"}>
          <li>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/checklist--v1.png"
              alt="checklist--v1"
            />
          </li>
        </Link>
      </ul>
    </>
  );
};

export default Header;
