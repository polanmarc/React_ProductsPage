import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import SignOut from "./SignOut";
import Button from "./Button";

function Profile() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const logOut = () => {
        setIsLoggedIn(null);
    }

    const generateTemplate = () => {
        console.log(isLoggedIn);
        return (
            <div className="profile">
                <h1>User Profile</h1>
                <div>
                    <p><b>Id:</b> {isLoggedIn.user.id}</p>
                    <p><b>Name:</b> {isLoggedIn.user.name}</p>
                    <p><b>Surname:</b> {isLoggedIn.user.surname}</p>
                    <p><b>Email:</b> {isLoggedIn.user.email}</p>
                </div>
                <Button funcion={logOut} texto="Sign Out"/>
            </div>
        );
    }

    return (
        <div>
            {isLoggedIn ? generateTemplate() : <SignOut />}
        </div>
    );
}

export default Profile;