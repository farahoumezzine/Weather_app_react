import { useState, useEffect } from 'react';

function FavoriteLocations({ onSelectLocation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteLocations');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (location) => {
    const newFavorites = [...favorites, location];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (location) => {
    const newFavorites = favorites.filter(fav => fav !== location);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
  };

  return (
    <div className="favorites-container">
      <h3>
        <i className="fas fa-star"></i>
        Lieux Favoris
      </h3>
      <div className="favorites-list">
        {favorites.map((location, index) => (
          <div key={index} className="favorite-item">
            <button 
              className="favorite-button"
              onClick={() => onSelectLocation(location)}
            >
              {location}
            </button>
            <button 
              className="remove-favorite"
              onClick={() => removeFromFavorites(location)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteLocations; 