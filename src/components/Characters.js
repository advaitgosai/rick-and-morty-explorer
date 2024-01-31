import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones, faHeartbeat, faDna, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/Characters.css';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          id
        }
        created
      }
    }
  }
`;

function Characters() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, name: query },
  });

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const characters = data?.characters?.results || [];
  const charactersCount = data?.characters?.info?.count || 0;

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {query && (
        <p className="search-count">Characters Found: {charactersCount}</p>
      )}
      <div className="characters-grid">
        {data.characters.results.map((character) => (
          <Link to={`/character/${character.id}`} key={character.id} className="character-card">
          <div key={character.id}>
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-info">
              <h3> {character.name}</h3>
              <p><FontAwesomeIcon icon={character.status === 'Alive' ? faHeartbeat : faSkullCrossbones} id="ix"/> {character.status}</p>
              {/* <p><FontAwesomeIcon icon={faVenusMars} id="ix"/> {character.gender}</p> */}
              <p><FontAwesomeIcon icon={faGlobe} id="ix"/> {character.location.name}</p>
              {/*<p><FontAwesomeIcon icon={faClock} id="ix"/> Created: {new Date(character.created).toLocaleDateString()}</p> */}
              <p><FontAwesomeIcon icon={faDna} id="ix"/> {character.species}</p>
            </div>
          </div>
          </Link>
        ))}
        <div className="pagination">
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Characters;
