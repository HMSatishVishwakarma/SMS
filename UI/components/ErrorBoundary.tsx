// components/ErrorBoundary.js
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if there's an error
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render the children normally if no error
  }
}

export default ErrorBoundary;
