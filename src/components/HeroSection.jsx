// src/components/HeroSection.jsx
import React, { useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const artworks = [
    {
      id: 1,
      title: "New Age",
      description: "Traditional Serbian art was beginning to show some Baroque influences. It has been developed under the Russian-Ukrainian and Southern Balkan basis and the influences that had slowly arrived from Western European art centers...",
      image: "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg"
    },
    {
      id: 2,
      title: "Portrait of a Woman",
      description: "A captivating portrait showcasing the elegance of 19th century European painting, with soft brushwork and rich color palette.",
      image: "https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg"
    },
    {
      id: 3,
      title: "Madonna and Child",
      description: "A serene sculpture of the Virgin Mary holding the infant Jesus, carved in ivory with intricate details and gilded accents.",
      image: "https://images.metmuseum.org/CRDImages/ep/original/DT119.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>{artworks[currentIndex].title}</h1>
        <p>{artworks[currentIndex].description}</p>
        <button className="read-more">Read More</button>
      </div>
      <div className="hero-slider">
        <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {artworks.map((art, index) => (
            <div key={index} className="slide">
              <img src={art.image} alt={art.title} />
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="control-btn">←</button>
          <button onClick={nextSlide} className="control-btn">→</button>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;