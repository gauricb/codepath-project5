import { useState, useEffect } from "react";
import "react-bootstrap";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { getCharacters } from "./api";

import "./Dashboard.css";

const Dashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [characters, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container className=".dashboard">
      <Row>
        <Col>
          <h1>Marvel Characters</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text id="search-addon">Search</InputGroup.Text>
            <FormControl
              placeholder="Search by name"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
          <p>Total characters: {characters.length}</p>
          <p>Total filtered characters: {filteredCharacters.length}</p>
          <p>
            Example summary statistic:{" "}
            {filteredCharacters.length / characters.length}
          </p>
        </Col>
      </Row>
      <Row>
        {filteredCharacters.map((character) => (
          <Col md={4} key={character.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>

                <p className="card-text">{character.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
