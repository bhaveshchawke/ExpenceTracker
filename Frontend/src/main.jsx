import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MessageProvider } from "./Context/MessageContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  </StrictMode>,
);
