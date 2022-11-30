import React from "react";
import ReactDOM from "react-dom/client";
import InitialMenu from "./initialMenu";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <InitialMenu />
  </React.StrictMode>
);


