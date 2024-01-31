import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../styles/Episodes.css'; // Import CSS for styling

const GET_EPISODES = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

function Episodes() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="episodes-grid">
      {data.episodes.results.map((episode) => (
        <Link to={`/episode/${episode.id}`} key={episode.id} className="episode-card">
          <div>
            <h3>{episode.name}</h3>
            <p className="card-info">Air date: {episode.air_date}</p>
            <p className="card-info">Episode: {episode.episode}</p>
          </div>
        </Link>
      ))}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Episodes;
