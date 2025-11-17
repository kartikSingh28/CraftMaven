import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ padding: 20, fontFamily: "sans-serif", color: "#111" }}>
          <h2 style={{ color: "#b00" }}>An error occurred</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{String(error)}</p>
          {info && info.componentStack && (
            <pre style={{ background: "#f3f3f3", padding: 10, overflow: "auto" }}>
              {info.componentStack}
            </pre>
          )}
          <p style={{ color: "#555" }}>Check browser console and paste the error here for more help.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
