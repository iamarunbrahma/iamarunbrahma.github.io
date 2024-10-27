import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isNotFound = params.get('notfound') === 'true';
    const redirect = params.get('redirect');
    
    if (isNotFound && redirect) {
      // Clean up URL parameters
      window.history.replaceState(null, '', redirect);
      // Force React Router to handle the new path
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RedirectHandler;
