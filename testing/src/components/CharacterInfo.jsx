import React, { useEffect, useState } from "react";
import "./characterInfo.css";
const CharacterInfo = ({ charName, charImage, numIssues }) => {
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
    </tr>
  );
};

export default CharacterInfo;
