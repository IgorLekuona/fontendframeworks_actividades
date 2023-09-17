import { useState } from "react";

import "./styles.css";

export const LoginForm = ({error, onLogin}) => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit (event) {
        event.preventDefault();
        onLogin(user, password);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-header">
                <h4><b>LOGIN</b></h4>
                <p>Please enter your email and password!</p>
            </div>
            <div className="form-group form-elem">
                <input type="text" className="form-control" id="exampleInputUser1" aria-describedby="emailHelp" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            <div className="form-group form-elem">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error ? 
                <div className="error-container">
                    <p>Invalid user or password.</p>
                </div>
            :
                null
            }
            <button type="submit" className="btn" style={{background: "#04423d", color: "white"}}>Submit</button>
        </form>
    );
}