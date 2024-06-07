import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "./AuthContext";

function MainMenu() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ul className="mainmenu">
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      {isLoggedIn === null ? (
        <>
          <li>
            <NavLink to="/login">LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/register">REGISTER</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/profile">PROFILE</NavLink>
          </li>
          <li>
            <NavLink to="/nota">NOTA</NavLink>
          </li>
          <li>
            <NavLink to="/signout">SIGN OUT</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default MainMenu;
