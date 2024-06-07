import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";

function SignOut() {
    const { setIsLoggedIn } = useContext(AuthContext);

    setIsLoggedIn(null);
    localStorage.removeItem('user');

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default SignOut;
