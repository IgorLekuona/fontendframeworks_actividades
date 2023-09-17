import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { NavigationBar } from "../components/NavigationBar";
import { SearchBar } from "../components/SearchBar";
import { PostList } from "../components/PostList";
import { Loading } from "../components/Loading";
import "./styles.css";

import post_img from "../images/post_img.jpg";

const tokenSplit = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

export const Main = () => {

    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [section, setSection] = useState("");

    const [pageLoaded, setPageLoaded] = useState(false);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

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

    async function loadPosts (bearer) {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${bearer}`
        }
        
        let reqOptions = {
            url: "https://three-points.herokuapp.com/api/posts",
            method: "GET",
            headers: headersList,
        }
           
        await axios.request(reqOptions)
        .then(response => {
            if (response.status === 200) {
                setPosts(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.response.status === 401) exit();
        })
    }

    function loadAllData () {
        let bearer = JSON.parse(localStorage.getItem("userToken"));
        loadPosts(bearer);
    }

    //Check page load
    useEffect(() => {
        const onPageLoad = () => {
            setPageLoaded(true);
        };

        //Check if logged, else redirect to /login
        let saved = localStorage.getItem("userToken");
        let tokenValue = JSON.parse(saved) || "";
        if (!tokenValue.includes(tokenSplit)) {
            navigate("/login");
        }
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
        const timeOutId = setTimeout(() => loadAllData(), 3000);
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
        navigate("/");
    };

    //Profile click handler
    function handleProfileClick () {
        navigate("/profile");
    };

    //Method to clear localStorage and redirect to /login
    function exit () {
        localStorage.clear();
        navigate("/login")
    }

    const mainPage = (
        <div className="main-container">
            <NavigationBar onLogoClick={handleLogoClick} onProfileClick={handleProfileClick}/>
            {posts.length !== 0 ?
                <>
                    <SearchBar value={search} onSearch={handleSearchChange}/>
                    <PostList posts={query === "" ? posts : posts.filter((post) => post.text.includes(query))} />
                </>
            :
                <Loading />  
            }       
        </div>
    );

    return (
        mainPage
    );
}