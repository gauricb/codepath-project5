import React, { useEffect, useState } from "react";

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
      <div>Total Characters: {totalCharacters}</div>
      <div>Average Comics per Character: {avgComics.toFixed(2)}</div>
      <div>Most Common First Letter: {mostCommonLetter}</div>
    </div>
  );
};

export default SummaryStatistics;
