import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const ROOT_ID = "root";
const rootEl = document.getElementById(ROOT_ID);

if (!rootEl) {
  console.error(
    `No element with id "${ROOT_ID}" found. Creating a temporary root for local preview.`
  );
  const temp = document.createElement("div");
  temp.id = ROOT_ID;
  document.body.appendChild(temp);
  createRoot(temp).render(
    <BrowserRouter basename="/inventory-app"> {/* add your repo name here */}
      <App />
    </BrowserRouter>
  );
} else {
  createRoot(rootEl).render(
    <BrowserRouter basename="/inventory-app"> {/* add your repo name here */}
      <App />
    </BrowserRouter>
  );
}
