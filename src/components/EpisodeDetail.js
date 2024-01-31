import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import '../styles/EpisodeDetail.css';

const GET_EPISODE_DETAIL = gql`
  query GetEpisodeDetail($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

function EpisodeDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_EPISODE_DETAIL, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const episode = data.episode;

  return (
    <div className="episode-detail-container">
      <div className="episode-info">
        <h2>{episode.name}</h2>
        <p>Season: {episode.episode.split('E')[0]}</p>
        <p>Episode: {episode.episode}</p>
        <p>Air Date: {episode.air_date}</p>
      </div>

      <div className="character-cards-container">
        <h3 className="residents-title">Featuring</h3>
        <div className="residents-grid">
          {episode.characters.map((character) => (
            <Link to={`/character/${character.id}`} key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
