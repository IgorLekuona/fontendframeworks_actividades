import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { NavigationBar } from "../NavigationBar";
import "./styles.css";

import pfp_img from "../../images/pfp_img.jpg";

export const Profile = () => {

    const [profile, setProfile] = useState({});

    const navigate = useNavigate();

    const profileContent = {
        avatar: pfp_img,
        username: "@pepito_14",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }

    async function loadProfile (bearer) {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${bearer}` 
        }
           
        let reqOptions = {
            url: "https://three-points.herokuapp.com/api/users/me",
            method: "GET",
            headers: headersList,
        }
           
        await axios.request(reqOptions)
        .then(response => {
            if (response.status === 200) {
                setProfile(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
            setProfile(profileContent)
            if (error.response.status === 401) exit();
        })
    }

    let bearer = JSON.parse(localStorage.getItem("userToken"));
    useEffect(() => {
        loadProfile(bearer);
    }, []);

    //Logo click handler
    function handleLogoClick () {
        navigate("/");
    };

    //Profile click handler
    function handleProfileClick () {
        navigate("/");
    };

    //Method to clear localStorage and redirect to /login
    function exit () {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <div className="profile-container">
            <NavigationBar onLogoClick={handleLogoClick} onProfileClick={handleProfileClick}/>
            <img src={profile.avatar} alt="Profile Picture" className="pfp-img"/>
            <h5>{profile.username}</h5>
            <p>{profile.bio}</p>
            <button type="button" className="btn btn-outline-danger" onClick={() => exit()}>Log out</button>
        </div>
    )
}