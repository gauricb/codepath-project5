import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getCharacters } from "./api";
import CharacterInfo from "./components/CharacterInfo";

function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = async (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      if (isNaN(searchValue)) {
        const filteredData = list.filter((character) =>
          character.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData);
      }

      // FILTER BY NUM ISSUES
      else {
        const filteredData = list.filter(
          (character) => character.comics.returned >= searchValue
        );
        setFilteredResults(filteredData);
      }
    } else {
      setFilteredResults(list);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="whole-page">
        <h1>Marvel Characters</h1>
        <input
          type="text"
          placeholder="Search by character name..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Character Name</th>
              <th>Number of Issues</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {searchInput.length > 0
              ? filteredResults.map((character) => (
                  <CharacterInfo
                    key={character.id}
                    charName={character.name}
                    charImage={character.thumbnail}
                    numIssues={character.comics.returned}
                    charDescription={character.description}
                  />
                ))
              : list.map((character) => (
                  <CharacterInfo
                    key={character.id}
                    charName={character.name}
                    charImage={character.thumbnail}
                    numIssues={character.comics.returned}
                    charDescription={character.description}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
