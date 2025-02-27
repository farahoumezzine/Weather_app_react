import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow-1">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Entrez le nom d'une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <FontAwesomeIcon icon={faSearch} /> Rechercher
        </button>
      </div>
    </form>
  );
}

export default SearchBar;