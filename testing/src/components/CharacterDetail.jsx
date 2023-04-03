import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import md5 from "md5";
const PUBLIC_KEY = "412039294c3da4d7d9c47671d49470f5";
const PRIVATE_KEY = "6e748f37d8d430903965d48d14f2944280c69c32";
let ts = new Date().getTime();
let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

//use character id make another api call

const CharacterDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCharacterDetail = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${params.id}?apikey=412039294c3da4d7d9c47671d49470f5&ts=${ts}&hash=${hash}`
        );
        const data = await response.json();
        setFullDetails(data.data.results[0]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCharacterDetail();
  }, [params.id]);
  return (
    <div>
      {fullDetails ? (
        <div>
          <h1>{fullDetails.name}</h1>

          <img
            src={`${fullDetails.thumbnail.path}/portrait_fantastic.${fullDetails.thumbnail.extension}`}
            alt={fullDetails.name}
          />
          <p>{fullDetails.description}</p>

          <h2>Comics:</h2>
          <ul>
            {fullDetails.comics.items.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>

          <h2>Series:</h2>
          <ul>
            {fullDetails.series.items.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>

          <h2>Stories:</h2>
          <ul>
            {fullDetails.stories.items.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default CharacterDetail;
