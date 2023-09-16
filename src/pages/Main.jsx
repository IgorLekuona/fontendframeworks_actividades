import React, { useState, useEffect } from "react";

import { NavigationBar } from "../components/NavigationBar";
import { Post } from "../components/Post";
import "./styles.css";
import { SearchBar } from "../components/SearchBar";

 export const Main = () => {

    const [pageLoaded, setPageLoaded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [pokeTeam, setPoketeam] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const poke_team = ["charizard", "swampert", "luxray", "garchomp", "umbreon", "metagross"];
    
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
        const timeOutId = setTimeout(() => setPoketeam(poke_team), 3000);
        return () => {clearTimeout(timeOutId);}
    }, [pageLoaded]);

    //Search bar change handler
    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    //Navbar open and close handlers
    function handleMenuClose () {
        setMenuOpen(false);
    }
    function handleMenuOpen () {
        setMenuOpen(true);
    }

    //Delay on search
    useEffect(() => {
        const timeOutId = setTimeout(() => setQuery(search), 100);
        return () => clearTimeout(timeOutId);
    }, [search]);

    return (
        <div className="page-container">
            <NavigationBar navbarState={menuOpen} openHandler={handleMenuOpen} closeHandler={handleMenuClose}/>
            {!menuOpen ? 
                pokeTeam != [] ?
                        <>
                            <SearchBar handleChange={handleSearchChange}/>
                            <div className="post-container">
                                {query === "" ? 
                                    pokeTeam && pokeTeam.map(poke => {
                                        return <Post key={poke} pokemon={poke} />
                                    })
                                :
                                    pokeTeam && pokeTeam.filter((member) => member.includes(query)).map(poke => {
                                        return <Post key={poke} pokemon={poke} />
                                    })
                                }
                            </div>
                        </>
                    :
                        <div><p>Loading</p></div>
            :
                null
            }       
        </div>
    )
}