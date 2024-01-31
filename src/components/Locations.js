import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../styles/Locations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';

const GET_LOCATIONS = gql`
  query GetLocations($name: String) {
    locations(filter: { name: $name }) {
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

function Location() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { name: query } });

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search locations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="locations-grid">
        {data.locations.results.map((location) => (
          <Link to={`/location/${location.id}`} key={location.id} className="location-card">
            <h3 className="location-title">{location.name}</h3>
            <p><FontAwesomeIcon icon={faGlobe} id="ix"/> {location.type}</p>
            <p><FontAwesomeIcon icon={faStar} id="ix"/> {location.dimension}</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} id="ix"/> {new Date(location.created).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Location;
