import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl border border-cream-200 shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral-400/10 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-extrabold text-toast-900 mb-3">Something went wrong</h2>
            <p className="text-sm text-toast-500 font-medium mb-6 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-toast-900 rounded-full hover:bg-coral-500 transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-xs font-bold text-toast-400 cursor-pointer hover:text-toast-600">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-cream-100 rounded-xl text-[10px] text-toast-600 overflow-auto max-h-32 font-mono">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
