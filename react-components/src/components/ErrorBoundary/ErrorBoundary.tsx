import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode | ReactNode[];
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  componentDidCatch = (error: unknown) => {
    this.setState({
      hasError: true,
    });
    console.log(error);
  };

  render() {
    return this.state.hasError ? (
      <div className="error-container">
        An error has occured. Please try reloading the page.
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

export default ErrorBoundary;
