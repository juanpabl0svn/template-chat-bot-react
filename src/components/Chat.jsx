import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import uuid from "react-uuid";
import Menu from "./Menu";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const newMessage = useRef();

  // useEffect(() => {
  //   setMessages([
  //     { type: "to", text: "Hola" },
  //   ]);
  // }, []);

  useEffect(() => {
    const chat = document.getElementById("chat");
    if (!chat) return;
    chat.scrollTop = chat.scrollHeight;

    const chatLastChild = chat.lastChild;
    if (!chatLastChild) return;
    chatLastChild.classList.add("new-message");
    setTimeout(() => {
      chatLastChild.classList.remove("new-message");
    }, 1000);
  }, [messages]);

  const handleSubmit = () => {
    const value = newMessage.current.value;
    const array = value
      .split(" ")
      .filter((el) => el !== "")
      .join(" ");
    if (!array) return;

    const messageObject = {
      type: "from",
      text: value,
    };
    setMessages((lastMessages) => [...lastMessages, messageObject]);
    newMessage.current.value = "";
  };

  return (
    <article className="card">
      <p className="title">Tu amigo</p>
      <section className="chat" id="chat">
        <Menu/>
        {messages != null &&
          messages.map((message) => <Message key={uuid()} message={message} />)}
      </section>
      <section className="send">
        <textarea
          ref={newMessage}
          onKeyDown={(e) => {
            if (e.which === 13 && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              return;
            }
          }}
        ></textarea>
        <button onClick={handleSubmit}>Enviar</button>
      </section>
    </article>
  );
};
export default Chat;
