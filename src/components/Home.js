import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters {
    characters {
      results {
        id
      }
    }
  }
`;

const GET_ALL_EPISODES = gql`
  query GetAllEpisodes {
    episodes {
      results {
        id
      }
    }
  }
`;

const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      results {
        id
      }
    }
  }
`;

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
    }
  }
`;

const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
    }
  }
`;

const GET_LOCATION_BY_ID = gql`
  query GetLocationById($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
    }
  }
`;


function Home() {
  const { data: charactersData } = useQuery(GET_ALL_CHARACTERS);
  const { data: episodesData } = useQuery(GET_ALL_EPISODES);
  const { data: locationsData } = useQuery(GET_ALL_LOCATIONS);

  const [randomCharacterId, setRandomCharacterId] = useState(null);
  const [randomEpisodeId, setRandomEpisodeId] = useState(null);
  const [randomLocationId, setRandomLocationId] = useState(null);

  const generateRandomEntries = () => {
    if (charactersData && episodesData && locationsData) {
      const characterIds = charactersData.characters.results.map(c => c.id);
      const episodeIds = episodesData.episodes.results.map(e => e.id);
      const locationIds = locationsData.locations.results.map(l => l.id);

      setRandomCharacterId(characterIds[Math.floor(Math.random() * characterIds.length)]);
      setRandomEpisodeId(episodeIds[Math.floor(Math.random() * episodeIds.length)]);
      setRandomLocationId(locationIds[Math.floor(Math.random() * locationIds.length)]);
    }
  };

  useEffect(() => {
    generateRandomEntries();
  }, [charactersData, episodesData, locationsData]);

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError
  } = useQuery(GET_CHARACTER_BY_ID, { variables: { id: randomCharacterId }, skip: !randomCharacterId });

  const {
    data: episodeData,
    loading: episodeLoading,
    error: episodeError
  } = useQuery(GET_EPISODE_BY_ID, { variables: { id: randomEpisodeId }, skip: !randomEpisodeId });

  const {
    data: locationData,
    loading: locationLoading,
    error: locationError
  } = useQuery(GET_LOCATION_BY_ID, { variables: { id: randomLocationId }, skip: !randomLocationId });

  return (
    <div className="home-container">
      <div className="generate-button-row">
        <button onClick={generateRandomEntries} className="generate-button">
          Explore Random Cards
        </button>
      </div>

      <div className="cards-row">
        <div className="random-character">
          {characterLoading ? <p>Loading character...</p> :
           characterError ? <p>Error loading character.</p> :
           characterData && (
             <Link to={`/character/${randomCharacterId}`} className="card">
               <h3>{characterData.character.name}</h3>
               <img src={characterData.character.image} alt={characterData.character.name} />
             </Link>
          )}
        </div>
        <div className="random-episode">
        {episodeLoading ? <p>Loading episode...</p> :
         episodeError ? <p>Error loading episode.</p> :
         episodeData && (
          <Link to={`/episode/${randomEpisodeId}`} className="card">
            <div>
              <h3>{episodeData.episode.name}</h3>
              <p className="card-info">{episodeData.episode.episode}</p>
              <p className="card-info">Air Date: {episodeData.episode.air_date}</p>
            </div>
          </Link>
         )}
      </div>
      <div className="random-location">
        {locationLoading ? <p>Loading location...</p> :
         locationError ? <p>Error loading location.</p> :
         locationData && (
          <Link to={`/location/${randomLocationId}`} className="card">
            <div>
              <h3>{locationData.location.name}</h3>
              <p className="card-info">Type: {locationData.location.type}</p>
              <p className="card-info">Dimension: {locationData.location.dimension}</p>
            </div>
          </Link>
         )}
      </div>
      </div>
    </div>
  );
}

export default Home;
