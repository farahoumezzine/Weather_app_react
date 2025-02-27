import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function LocationButton({ onLocation }) {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onLocation, handleError);
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
    }
  };

  const handleError = (error) => {
    let message = "Une erreur est survenue";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "Vous avez refusé l'accès à votre position";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "La position n'est pas disponible";
        break;
      case error.TIMEOUT:
        message = "La requête a expiré";
        break;
    }
    alert(message);
  };

  return (
    <button 
      className="btn btn-secondary" 
      onClick={handleClick}
      title="Utiliser ma position"
    >
      <FontAwesomeIcon icon={faLocationDot} />
    </button>
  );
}

export default LocationButton;