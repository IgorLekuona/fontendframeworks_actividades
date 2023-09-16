import "./styles.css";

export const Profile = ({avatar, username, bio}) => {
    return (
        <div className="profile-container">
            <img src={avatar} alt="Ash Ketchum Profile Picture" className="pfp-img"/>
            <h5>{username}</h5>
            <p>{bio}</p>
        </div>
    )
}