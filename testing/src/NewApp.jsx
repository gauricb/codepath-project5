import { useEffect, useState } from "react";

import "./App.css";
import { getCharacters } from "./api";
import { LineChart, Line, XAxis, ResponsiveContainer, Label } from "recharts";
import CharacterInfo from "./components/CharacterInfo";
import SummaryStatistics from "./components/SummaryStatistics";

function NewApp() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [comicInput, setComicInput] = useState("");
  const [issueInput, setIssueInput] = useState("");
  const [chartData, setChartData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  const searchItems = async () => {
    const filteredData = list.filter((character) => {
      if (
        nameInput &&
        !character.name.toLowerCase().includes(nameInput.toLowerCase())
      ) {
        return false;
      }
      if (
        comicInput &&
        !character.comics.items.find((item) =>
          item.name.toLowerCase().includes(comicInput.toLowerCase())
        )
      ) {
        return false;
      }
      if (issueInput && character.comics.returned < issueInput) {
        return false;
      }
      return true;
    });
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setList(data);
      setFilteredResults(data);

      // extract data for chart
      const chartData = data.map((character) => ({
        name: character.name,
        comics: character.comics.available,
      }));
      setChartData(chartData);

      const seriesChartData = data.map((character) => ({
        name: character.name,
        series: character.series.available,
      }));
      setSeriesData(seriesChartData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    searchItems();
  }, [nameInput, comicInput, issueInput]);

  return (
    <div className="App">
      <div className="whole-page">
        <h1>Marvel Characters</h1>
        <SummaryStatistics list={list} />
        <h2>Number of comics for each character</h2>
        <LineChart width={500} height={300} data={chartData}>
          <Line type="monotone" dataKey="comics" stroke="#8884d8" />
          <XAxis dataKey="name" />
        </LineChart>

        <h2>Number of series for each character</h2>
        <LineChart width={500} height={300} data={seriesData}>
          <Line type="monotone" dataKey="series" stroke="#82ca9d" />
          <XAxis dataKey="name" />
        </LineChart>
        <div className="input-container">
          <div>
            <label htmlFor="nameInput">Character Name:</label>
            <input
              type="text"
              id="nameInput"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="comicInput">Comic Name:</label>
            <input
              type="text"
              id="comicInput"
              value={comicInput}
              onChange={(e) => setComicInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="issueInput">Number of Issues:</label>
            <input
              type="number"
              id="issueInput"
              value={issueInput}
              onChange={(e) => setIssueInput(e.target.value)}
            />
          </div>
        </div>
        <div className="list">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Character Name</th>
                <th>Number of Issues</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((character) => (
                <CharacterInfo
                  charName={character.name}
                  charImage={character.thumbnail}
                  numIssues={character.comics.returned}
                  charId={character.id}
                ></CharacterInfo>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewApp;
