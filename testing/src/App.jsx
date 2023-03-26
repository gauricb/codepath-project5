import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getCharacters } from "./api";
import CharacterInfo from "./components/CharacterInfo";
import SummaryStatistics from "./components/SummaryStatistics";

function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [comicInput, setComicInput] = useState("");
  const [issueInput, setIssueInput] = useState("");

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
                key={character.id}
                charName={character.name}
                charImage={character.thumbnail}
                numIssues={character.comics.returned}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
