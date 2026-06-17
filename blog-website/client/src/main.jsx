import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// FIX: StrictMode was missing. It catches common mistakes during
// development (double-invoking effects, detecting deprecated APIs).
// Has zero effect on production builds.
ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
