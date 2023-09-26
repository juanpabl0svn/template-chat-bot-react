import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import uuid from "react-uuid";
import Menu from "./Menu";
import getEntryValue from "../utils/functions";

const PROCESS = {
  change_password: '¿Quieres cambiar tu contraseña?',
  make_pqr : '¿Quieres hacer una PQR para presentar tu problema?'
};


function controlMessages() {
  const chat = document.getElementById("chat");
  if (!chat) return;
  chat.scrollTop = chat.scrollHeight;
  const chatLastChild = chat.lastChild;
  if (!chatLastChild) return;
  chatLastChild.classList.add("new-message");
  setTimeout(() => {
    chatLastChild.classList.remove("new-message");
  }, 1000);
}

async function checkQuestion(message, setAnswer) {
  const value = await getEntryValue(message);

  const response =
    PROCESS[value] ??
    "Lo siento, no entendi tu pregunta, ¿Puedes ser mas claro y directo para yo entender mejor por favor?";


  const messageObject = {
    type: "bot",
    text: response,
  };

  return setAnswer((lastMessages) => [...lastMessages, messageObject]);
}


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const newMessage = useRef();

  useEffect(() => {
    controlMessages();
    if (
      messages !== undefined &&
      messages[messages.length - 1]?.type === "user"
    ) {
      const lastMessage = messages[messages.length - 1].text;
      checkQuestion(lastMessage, setMessages);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSubmit = () => {
    const value = newMessage.current.value;
    const array = value
      .split(" ")
      .filter((word) => word !== "")
      .join(" ");
    if (!array) return;

    const messageObject = {
      type: "user",
      text: value,
    };
    setMessages((lastMessages) => [...lastMessages, messageObject]);
    newMessage.current.value = "";
  };

  return (
    <article className="card">
      <p className="title">Tu amigo</p>
      <section className="chat" id="chat">
        <Menu />
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
