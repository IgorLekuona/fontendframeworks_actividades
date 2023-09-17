import { useState } from "react";
import { Button, Card } from "react-bootstrap";

import "./styles.css";

export const Post = ({createdAt, autor, text, comments, image, postLikes}) => {

    const [likes, setLikes] = useState(postLikes);

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const fav_icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    )

    const comment_icon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
        </svg>
    )

    return (
        <Card className="card"> 
            <Card.Img variant="top" src={`${image}`} className="card-image img-fluid"/>
            <Card.Body style={{width: "100%"}}>
                <div className="top-row">
                    <span>{timeSince(Date.parse(createdAt))} ago</span>
                    <button type="button" className="btn btn-danger like-btn" onClick={() => setLikes(likes+1)}>
                        {fav_icon} {likes}
                    </button>
                </div>
                <div className="card-info">
                    <h6><b>{autor}</b></h6>
                    <p align="left">{text}</p>
                    <div className="comments-container">
                        <span>{comment_icon} Comments ({comments}) </span>
                        
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}