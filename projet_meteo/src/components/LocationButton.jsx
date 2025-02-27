import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { 
  Snackbar, 
  Alert, 
  CircularProgress,
  IconButton,
  Tooltip 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function LocationButton({ onLocation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleClick = () => {
    if (!navigator.geolocation) {
      showAlert("La géolocalisation n'est pas supportée par votre navigateur", 'error');
      return;
    }

    setIsLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        onLocation(position);
      },
      handleError,
      options
    );
  };

  const handleError = (error) => {
    setIsLoading(false);
    let message = "Une erreur est survenue";
    let severity = 'error';
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "Veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Impossible de déterminer votre position. Vérifiez que la localisation est activée sur votre appareil";
        break;
      case error.TIMEOUT:
        message = "La requête de localisation a expiré. Veuillez réessayer";
        severity = 'warning';
        break;
    }
    showAlert(message, severity);
  };

  const showAlert = (message, severity) => {
    setAlert({
      open: true,
      message,
      severity
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Tooltip title="Utiliser ma position">
        <IconButton
          color="primary"
          onClick={handleClick}
          disabled={isLoading}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <LocationOnIcon />
          )}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LocationButton;