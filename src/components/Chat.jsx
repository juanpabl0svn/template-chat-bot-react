import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import uuid from "react-uuid";

const Chat = () => {
  const [messages, setMessages] = useState(null);

  const newMessage = useRef();

  useEffect(() => {
    setMessages(["hola", "ammigos", "bien", "o que"]);
  }, []);

  return (
    <div className="card">
      <p className="title">Tu amigo</p>
      <div className="chat">
        {messages != null &&
          messages.map((message) => <Message key={uuid()} message={message} />)}
      </div>
      <textarea type="text" ref={newMessage} />
      <button
        onClick={() =>
          setMessages((lastMessages) => [
            ...lastMessages,
            newMessage.current.value,
          ])
        }
      >
        enviar
      </button>
    </div>
  );
};
export default Chat;
