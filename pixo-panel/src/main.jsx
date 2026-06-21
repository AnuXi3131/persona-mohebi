import { createRoot } from "react-dom/client";
import "react-toastify/ReactToastify.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./contexts/auth-context.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
