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
      console.log('Redirected to:', window.location.href);
      console.log('Redirect:', redirect);
    }
  }, [navigate]);

  return null;
};

export default RedirectHandler;
