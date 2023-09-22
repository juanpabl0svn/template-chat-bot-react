// import { useState } from "react";
import "./index.css";
import Chat from './components/Chat';
import InfoIcon from "./components/InfoIcon";

function App() {

  
  function handleClick(){
    const element = document.getElementById('chat');
    element.classList.toggle('show')
  }

  return (
    <main>
        <InfoIcon click={handleClick}/>
        <Chat/>
    </main>
  );
}

export default App;
