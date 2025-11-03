import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection'; // 👈 import komponen baru
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import './App.css';

const App = () => {
  const [artworks, setArtworks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (formData) => {
    const { keyword, departmentId } = formData;
    if (!keyword.trim()) {
      setError('Please enter a search keyword.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(keyword)}&hasImages=true`;
      if (departmentId) url += `&departmentId=${departmentId}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch search results');
      const data = await res.json();

      if (data.objectIDs && data.objectIDs.length > 0) {
        const ids = data.objectIDs.slice(0, 20);
        const details = await Promise.all(
          ids.map(id =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(r => r.json())
          )
        );
        const valid = details.filter(item => item.primaryImage);
        setArtworks(valid);
      } else {
        setArtworks([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (art) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.objectID === art.objectID);
      return exists
        ? prev.filter(f => f.objectID !== art.objectID)
        : [...prev, art];
    });
  };

  const isFavorite = (id) => favorites.some(f => f.objectID === id);

  return (
    <div className="app">
      <Header />
      <HeroSection /> {/* 👈 Tambahkan ini */}
      <main className="main-container">
        <SearchForm onSearch={handleSearch} />
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p className="loading">Searching artworks...</p>
        ) : (
          <DataTable
            artworks={artworks}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            onSelect={setSelectedArtwork}
          />
        )}
        {selectedArtwork && (
          <DetailCard
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedArtwork.objectID)}
          />
        )}
      </main>
    </div>
  );
};

export default App;