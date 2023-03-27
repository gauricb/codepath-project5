import React, { useEffect, useState } from "react";
import "./SummaryStatistics.css";

const SummaryStatistics = ({ list }) => {
  const totalCharacters = list.length;

  const totalComics = list.reduce(
    (accumulator, character) => accumulator + character.comics.returned,
    0
  );
  const avgComics = totalComics / list.length;

  const letterCounts = list.reduce((accumulator, character) => {
    const firstLetter = character.name[0].toUpperCase();
    return {
      ...accumulator,
      [firstLetter]: (accumulator[firstLetter] || 0) + 1,
    };
  }, {});

  const mostCommonLetter = Object.entries(letterCounts).reduce(
    (max, [letter, count]) => (count > max.count ? { letter, count } : max),
    { letter: "", count: 0 }
  ).letter;

  return (
    <div className="summary-stats">
      <div className="summary-box">
        <h3>Total Characters:</h3>
        <p>{totalCharacters}</p>
      </div>
      <div className="summary-box">
        <h3>Average Comics per Character:</h3>
        <p>{avgComics.toFixed(2)}</p>
      </div>
      <div className="summary-box">
        <h3>Most Common First Letter:</h3>
        <p>{mostCommonLetter}</p>
      </div>
    </div>
  );
};

export default SummaryStatistics;
