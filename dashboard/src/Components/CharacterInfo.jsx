import React, { useEffect, useState } from "react";

const CharacterInfo = ({ characterName, characterImage }) => {
    
    return (
        <div>
            <li className="main-list" key={characterName}>
                <img className="icons" src={characterImage}/>
                
            </li>
        </div>
    );
}