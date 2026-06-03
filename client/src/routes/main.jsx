import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollTopButton from "../CommonComponents/ScrolltopButton";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
      <ToastContainer/>
      <ScrollTopButton />
  </StrictMode>,
);
