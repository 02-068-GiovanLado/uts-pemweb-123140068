import React from 'react';

const DetailCard = ({ artwork, onClose, onToggleFavorite, isFavorite }) => {
  return (
    <div className="detail-modal" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img
          src={artwork.primaryImage}
          alt={artwork.title}
          className="detail-img"
        />
        <div>
          <h2>{artwork.title || 'Untitled'}</h2>
          <p><strong>Artist:</strong> {artwork.artistDisplayName || 'N/A'}</p>
          <p><strong>Date:</strong> {artwork.objectDate || 'Unknown'}</p>
          <p><strong>Medium:</strong> {artwork.medium || 'N/A'}</p>
          <p><strong>Culture:</strong> {artwork.culture || 'N/A'}</p>
          <p><strong>Department:</strong> {artwork.department || 'N/A'}</p>
          <p><strong>Dimensions:</strong> {artwork.dimensions || 'N/A'}</p>
          <button onClick={() => onToggleFavorite(artwork)}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          {artwork.objectURL && (
            <a
              href={artwork.objectURL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', marginTop: '10px' }}
            >
              View on Met Museum Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;