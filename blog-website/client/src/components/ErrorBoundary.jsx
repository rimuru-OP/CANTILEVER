import { Component } from "react";

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    gap: "1rem",
                    textAlign: "center",
                    padding: "2rem",
                }}>
                    <h1>Something went wrong</h1>
                    <p style={{ color: "#666" }}>
                        An unexpected error occurred. Please refresh the page.
                    </p>
                    <button onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}