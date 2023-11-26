import { useState } from 'react';
const ErrorComponent = () => {
  const [error, setError] = useState(false);

  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <div>
      <button onClick={() => setError(true)}>Error</button>
      {error && throwError()}
    </div>
  );
};

export default ErrorComponent;
