// import { useState } from "react";
import "./index.css";

import InfoIcon from "./components/InfoIcon";

import Chat from "./components/chat";

function App() {
  function handleClick(e) {
    e.preventDefault()
    const element = document.getElementById("card");
    if (!element.classList) return;
    element.classList.toggle("show");
  }

  return (
    <main>
      <InfoIcon click={handleClick} />
      <Chat />
    </main>
  );
}

export default App;
