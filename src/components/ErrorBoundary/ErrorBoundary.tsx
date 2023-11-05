import { Component } from 'react';

class ErrorBoundary extends Component {
  render() {
    return (
      <div className="error-container">
        An error has occured. Please try reloading the page.
      </div>
    );
  }
}

export default ErrorBoundary;
