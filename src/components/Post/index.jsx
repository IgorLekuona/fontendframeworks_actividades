import { Fragment, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import "./styles.css";
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export const Post = ({pokemon}) => {

    const [pokeData, setPokeData] = useState({});
    const [ability, setAbility] = useState("");
    const [likes, setLikes] = useState(1000);

    useEffect(() => {
        fetchPoke(pokemon);
    }, [pokemon]);

    const fetchPoke = (pokeName) => {
        let pName = pokeName.toLowerCase();
        console.log(pName);
        fetch(API_URL+pName)
            .then(response => response.json())
            .then(data => {setPokeData(data); fetchAbility(data.abilities[0].ability.url);})
            .catch(() => alert("Error when fetching!!"));
    }

    const fetchAbility = (ab_url) => {
        fetch(ab_url)
            .then(response => response.json())
            .then(data => setAbility(data.effect_entries[1]));
    }

    function firstLetterToUppercase(word) {
        let cap = word.charAt(0).toUpperCase();
        return cap+word.slice(1);
    }

    return (
        <Card className="card">
            <Card.Title className="card-title bg-danger">
                <h1>{firstLetterToUppercase(pokemon)}</h1>
                <h4>Pokedex ID: {pokeData.id && String(pokeData.id).padStart(3, '0')}</h4>
            </Card.Title>
            {pokeData ? 
                <Fragment>
                    <Card.Img src={pokeData.sprites && pokeData.sprites.front_default} className="card-image img-fluid"/>
                    <Card.Body>
                        <div className="ability">
                            <h3>Ability : <b>{pokeData.abilities && firstLetterToUppercase(pokeData.abilities[0].ability.name)}</b></h3>
                            <p align="left">{ability.effect}</p>
                        </div>
                        <div className="types">
                            <span>
                                <button type="button" className="btn btn-danger like-btn" onClick={() => setLikes(likes+1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                </button> {likes} likes</span>
                            {pokeData.types && firstLetterToUppercase(pokeData.types[0].type.name)}{pokeData.types && pokeData.types[1] ? " - " + firstLetterToUppercase(pokeData.types[1].type.name) : null}
                        </div>
                    </Card.Body>
                </Fragment>
            : null}
        </Card>
    );
}