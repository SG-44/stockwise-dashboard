import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const ROOT_ID = "root";
const rootEl = document.getElementById(ROOT_ID);

if (!rootEl) {
  console.error(
    `No element with id "${ROOT_ID}" found. Ensure your index.html contains <div id="${ROOT_ID}"></div>. Creating a temporary root for local preview.`
  );
  // Create a temporary root so the app can still mount when index.html is missing the root div
  const temp = document.createElement("div");
  temp.id = ROOT_ID;
  document.body.appendChild(temp);
  createRoot(temp).render(<App />);
} else {
  createRoot(rootEl).render(<App />);
}
