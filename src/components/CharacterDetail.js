import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import '../styles/CharacterDetail.css'; 

const GET_CHARACTER_DETAIL = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
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
        name
        episode
      }
      created
    }
  }
`;

function CharacterDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const character = data.character;

  const episodesBySeason = character.episode.reduce((acc, episode) => {
    const season = episode.episode.split('E')[0];
    acc[season] = [...(acc[season] || []), episode];
    return acc;
  }, {});

  const totalEpisodes = character.episode.length;
  // const seasons = character.episode.map(ep => parseInt(ep.episode.split('E')[0].replace('S', '')));
  const seasons = ['S01', 'S02', 'S03', 'S04', 'S05'];

  return (
    <div className="character-detail-container">
      <div className="character-card-column">
        <div className="character-detail-card">
          <div>
            <img src={character.image} alt={character.name} className="character-detail-image" />
          </div>
          <div>
            <h2>{character.name}</h2>
          </div>
        </div>
        <ul>
            <li><p id="ix">{'Total Episodes   '}</p> {totalEpisodes}</li>
            <li><p id="ix">{'Status   '}</p>{character.status}</li>
            <li><p id="ix">{'Gender   '}</p> {character.gender}</li>
            <li><p id="ix">{'Location   '}</p> {character.location.name}</li>
            <li><p id="ix">{'Created   '}</p> {new Date(character.created).toDateString()}</li>
            <li><p id="ix">{'Species   '}</p> {character.species}</li>
            <li><p id="ix">{'Origin   '}</p> {character.origin.name}</li>
            <li><p id="ix">{'Type   '}</p> {character.type === '' ? 'unknown' : character.type}</li>
        </ul>
      </div>
      <div className="episodes-column">
        {seasons.map((season) => (
          <div key={season} className="season-column">
            <h3 className="episodes-seasons">Season {season.replace('S', '')}</h3>
            {episodesBySeason[season] && episodesBySeason[season].length > 0 ? (
              episodesBySeason[season].map((episode) => (
                <Link to={`/episode/${episode.id}`} key={episode.id} className="episode-card-horizontal">
                  {episode.episode.slice(3,6)}: {episode.name}
                </Link>
              ))
            ) : (
              <p className="no-episodes">No Appearances</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterDetail;
