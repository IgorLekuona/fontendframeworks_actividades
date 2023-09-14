import React from "react";

import { NavigationBar } from "../components/NavigationBar";
import { SearchBar } from "../components/SearchBar";
import { Post } from "../components/Post";
import "./styles.css";

 export const Main = () => {

    const poke_team = ["Charizard", "Swampert", "Luxray", "Garchomp", "Umbreon", "Metagross"];

    return (
        <div className="page-container">
            <NavigationBar />
            <SearchBar />
            <div className="post-container">
                {poke_team && poke_team.map(poke => {
                    return <Post key={poke} pokemon={poke} />
                })}
            </div>
        </div>
    )
 }