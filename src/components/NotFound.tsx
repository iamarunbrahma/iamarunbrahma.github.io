import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  console.log('Hello from NotFound');

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <img 
          src="/assets/404.svg" 
          alt="404 Error" 
          className="w-48 h-48 mx-auto mb-8 animate-bounce"
        />
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Oops! Page not found</p>
        <p className="text-xl text-gray-500 dark:text-gray-300 mb-8">
          Looks like this page took a vacation without telling us. How rude!
        </p>
        <p className="text-lg text-gray-400 dark:text-gray-500 mb-8">
          Don't worry, we're sending our best detective (a very confused intern) to find it.
        </p>
        <p className="text-md text-gray-400 dark:text-gray-500 mb-4">
          In the meantime, we'll be redirecting you to our home page in 5 seconds.
        </p>
        <p className="text-md text-gray-400 dark:text-gray-500">
          If you're impatient (we don't judge), click the button below:
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Take Me Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
