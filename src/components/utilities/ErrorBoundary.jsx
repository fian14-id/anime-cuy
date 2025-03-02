"use client";

import { Component } from 'react';
import Button from '../user-interface/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      retryCount: prevState.retryCount + 1
    }));
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI based on error type
      if (this.state.error?.message?.includes('429')) {
        return (
          <div className="p-4 text-center">
            <h2 className="mb-2 text-xl font-bold">Too Many Requests</h2>
            <p className="mb-4">We're experiencing high traffic. Please wait a moment.</p>
            {this.state.retryCount < 3 && (
              <Button 
                onClick={this.retry}
              >
                Try Again
              </Button>
            )}
          </div>
        );
      }

      // Generic error UI
      return (
        <div className="p-4 text-center">
          <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
          <p className="mb-4">Please try again later</p>
          <button 
            onClick={this.retry}
            className="px-4 py-2 bg-blue-500 rounded text-palette-secondary hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;