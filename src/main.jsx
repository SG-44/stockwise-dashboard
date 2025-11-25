import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- import BrowserRouter
import App from "./App.jsx";
import "./index.css";

const ROOT_ID = "root";
const rootEl = document.getElementById(ROOT_ID);

if (!rootEl) {
  const temp = document.createElement("div");
  temp.id = ROOT_ID;
  document.body.appendChild(temp);
  createRoot(temp).render(
    <BrowserRouter basename="/stockwise-dashboard">
      <App />
    </BrowserRouter>
  );
} else {
  createRoot(rootEl).render(
    <BrowserRouter basename="/stockwise-dashboard">
      <App />
    </BrowserRouter>
  );
}
