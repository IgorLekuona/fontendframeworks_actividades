import React, { useState, useEffect } from "react";

import { NavigationBar } from "../components/NavigationBar";
import { SearchBar } from "../components/SearchBar";
import { PostList } from "../components/PostList";
import { Profile } from "../components/Profile";
import { Loading } from "../components/Loading";
import "./styles.css";

import post_img from "../images/post_img.jpg";
import pfp_img from "../images/pfp_img.jpg";

export const Main = () => {

    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [section, setSection] = useState("");

    const [pageLoaded, setPageLoaded] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [query, setQuery] = useState("");

    const postArray = [
        {
            createdAt: Date.now(),
            autor: "@jose",
            text: "Madre mia como va Fernando!!! #14",
            comments: 33,
            image: post_img,
        },
        {
            createdAt: Date.now(),
            autor: "@josefa",
            text: "Se viene!!!!!! #latreintaytres",
            comments: 33,
            image: post_img,
        },
        {
            createdAt: Date.now(),
            autor: "@eric",
            text: "33! 33! 33!",
            comments: 33,
            image: post_img,
        },
        {
            createdAt: Date.now(),
            autor: "@erika",
            text: "Señorial conducción de Don Alonso.",
            comments: 33,
            image: post_img,
        },
    ];

    const profileContent = {
        img: pfp_img,
        user: "@pepito_14",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }

    //Check page load
    useEffect(() => {
        const onPageLoad = () => {
            setPageLoaded(true);
        };
    
        // Check if the page has already loaded
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);
    
    //Delay to page load
    useEffect(() => {
        const timeOutId = setTimeout(() => setPosts(postArray), 3000);
        return () => {clearTimeout(timeOutId);}
    }, [pageLoaded]);

    //Search bar change handler
    function handleSearchChange(e) {
        setSearch(e.target.value);
    };

    //Delay on search
    useEffect(() => {
        const timeOutId = setTimeout(() => setQuery(search), 1000);
        return () => clearTimeout(timeOutId);
    }, [search]);

    //Logo click handler
    function handleLogoClick () {
        window.location.reload();
    };

    //Profile click handler
    function handleProfileClick () {
        setProfileOpen(!profileOpen);
    };

    return (
        <div className="page-container">
            <NavigationBar onLogoClick={handleLogoClick} onProfileClick={handleProfileClick}/>
            {!profileOpen ? 
                posts.length !== 0 ?
                        <>
                            <SearchBar value={search} onSearch={handleSearchChange}/>
                            <PostList posts={query === "" ? posts : posts.filter((post) => post.text.includes(query))} />
                        </>
                    :
                        <Loading />  
            :
                <Profile avatar={profileContent.img} username={profileContent.user} bio={profileContent.bio} />
            }       
        </div>
    )
}