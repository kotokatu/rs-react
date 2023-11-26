import { Component, ReactNode, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode | ReactNode[];
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    this.setState({
      hasError: true,
    });
    console.log(error, errorInfo);
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
