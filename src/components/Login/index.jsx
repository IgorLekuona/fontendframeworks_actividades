import { useState } from "react";
import axios from "axios";

import { LoginForm } from "./LoginForm";
import "./styles.css";

const API_URL = "https://three-points.herokuapp.com/api/login";

export const Login = ({onLoginComplete}) => {
    
    const [error, setError] = useState(false);

    const appLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
    );

    async function handleLogin (user, pw) {
        let headersList = {
            "Accept": "*/*",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json" 
        }
        
        let bodyContent = JSON.stringify({"username": user, "password": pw});
        
        let reqOptions = {
            url: "https://three-points.herokuapp.com/api/login",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }
           
        await axios.request(reqOptions)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("userToken", JSON.stringify(response.data.token));
                setError(false);
                onLoginComplete();
            } else setError(true);
        })
        .catch((error) => {
            console.error(error);
            setError(true);
        })
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <span className="logo-box">{appLogo} <h1>three pics</h1></span>
                <LoginForm error={error} onLogin={handleLogin}/>
            </div>
        </div>
    );

}