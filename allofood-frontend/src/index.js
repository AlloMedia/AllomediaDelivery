import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import { UserProvider } from "./context/UserContext"; // Import UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  // <BrowserRouter>
  //   <UserProvider>
  //     <App />
  //   </UserProvider>
  // </BrowserRouter>

  <StrictMode>
  <App />
  </StrictMode>
);