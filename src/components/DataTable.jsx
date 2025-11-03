import React from 'react';

const DataTable = ({ artworks, onToggleFavorite, isFavorite, onSelect }) => {
  if (artworks.length === 0) {
    return <p>No artworks found.</p>;
  }

  return (
    <div className="artwork-grid">
      {artworks.map((art) => (
        <div key={art.objectID} className="card">
          <img src={art.primaryImageSmall || art.primaryImage} alt={art.title || 'Artwork'} />
          <div className="card-content">
            <h3>{art.title || 'Untitled'}</h3>
            <p>{art.artistDisplayName || 'Unknown Artist'}</p>
            <button
              className="favorite-btn"
              onClick={() => onToggleFavorite(art)}
              aria-label={isFavorite(art.objectID) ? 'Remove favorite' : 'Add to favorites'}
            >
              {isFavorite(art.objectID) ? '❤️' : '🤍'}
            </button>
            <button className="view-details-btn" onClick={() => onSelect(art)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataTable;