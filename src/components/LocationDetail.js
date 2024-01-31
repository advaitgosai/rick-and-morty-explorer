import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import '../styles/LocationDetail.css';

const GET_LOCATION_DETAIL = gql`
  query GetLocationDetail($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
        image
      }
      created
    }
  }
`;

function LocationDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_LOCATION_DETAIL, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const location = data.location;

  return (
    <div className="location-detail-container">
      <div className="location-info">
        <h2>{location.name}</h2>
        <p>Type: {location.type}</p>
        <p>Dimension: {location.dimension}</p>
        <p>Created: {new Date(location.created).toLocaleDateString()}</p>
      </div>

      <div className="residents-container">
        <h3 className="residents-title">Residents</h3>
        <div className="residents-grid">
          {location.residents.map((resident) => (
            <Link to={`/character/${resident.id}`} key={resident.id} className="resident-card">
              <img src={resident.image} alt={resident.name} />
              <p>{resident.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
