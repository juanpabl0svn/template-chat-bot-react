import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import uuid from "react-uuid";

const Chat = () => {
  const [messages, setMessages] = useState(null);

  const newMessage = useRef();
  
  console.log('a ver')

  useEffect(() => {
    setMessages(["hola", "ammigos", "bien", "o que"]);
    window.addEventListener('keydown',(e)=>{
      if (e.key === 'Enter') handleSubmit(e)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = newMessage.current.value
    console.log(value)
    let array  = value.split(' ').filter(el => el !== '').join(' ')
    if (!array) return
    setMessages((lastMessages) => [...lastMessages, value])
  };
  
  return (
    <article className="card">
      <p className="title">Tu amigo</p>
      <section className="chat">
        {messages != null &&
          messages.map((message) => <Message key={uuid()} message={message} />)}
      </section>

      <form className="send" onSubmit={handleSubmit}>
        <textarea type="text" ref={newMessage} />
        <button>Enviar</button>
      </form>
    </article>
  );
};
export default Chat;
