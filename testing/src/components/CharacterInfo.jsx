import React, { useEffect, useState } from "react";
import "./characterInfo.css";
import { Link } from "react-router-dom";

const CharacterInfo = ({ charName, charImage, numIssues, charId }) => {
  return (
    <tr>
      <td>
        <img
          className="icons"
          src={`${charImage.path}.${charImage.extension}`}
        />
      </td>
      <td>{charName}</td>
      <td>{numIssues} </td>
      <td>
        <Link
          style={{ color: "white" }}
          to={`/CharacterDetails/${charId}`}
          key={charId}
        >
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default CharacterInfo;
