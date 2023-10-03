import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import uuid from "react-uuid";
import Menu from "./Menu";
import getEntryValue from "../utils/functions";
import SendIcon from "./SendIcon";
import ExitIcon from "./ExitIcon";

const PROCESS = {
  change_password: "¿Quieres cambiar tu contraseña?",
  make_pqr: "¿Quieres hacer una PQR para presentar tu problema?",
};

function makeAPQR() {
  alert("Se hizo una pqr");
}

const HANDLE_PROCESS = {
  make_pqr: makeAPQR,
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

async function checkQuestion(message, setAnswer, currentProcess, setCurrentProcess,isAnswering,setIsAnswering) {
  const messageObject = {
    type: "bot",
    text: '',
  };

  if (isAnswering){
    HANDLE_PROCESS[currentProcess](message)
    setIsAnswering(false)
    setCurrentProcess(undefined);
    messageObject.text = 'Trabajo realizado correctamente'
    return setAnswer((lastMessages) => [...lastMessages, messageObject]);
  }

  const value = await getEntryValue(message);

  const response = PROCESS[value];

  messageObject.text = response

  if (currentProcess) {
    if (response == "accepted") {
      messageObject.text = "Ingresa tu pqr por favor";
      setIsAnswering(true)
    } else {
      messageObject.text = "Entonces cuentame como puedo ayudarte";
    }
    setCurrentProcess(undefined);
    return setAnswer((lastMessages) => [...lastMessages, messageObject]);
  }

  setCurrentProcess(response);

  return setAnswer((lastMessages) => [...lastMessages, messageObject]);
}

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const newMessage = useRef();

  const [currentProcess, setCurrentProcess] = useState(undefined);

  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    controlMessages();
    const lastMessage = messages[messages.length - 1];
    if (messages.length == 0 || lastMessage?.type !== "user") return () => {};
    checkQuestion(lastMessage?.text, setMessages, currentProcess, setCurrentProcess,isAnswering,setIsAnswering);

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

  const handleExit = () => {
    const element = document.getElementById("card");
    if (!element.classList) return;
    element.classList.remove("show");
  };

  return (
    <article className="card" id="card">
      <p className="title">Tu amigo</p>
      <ExitIcon click={handleExit} />
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
        <SendIcon click={handleSubmit} />
      </section>
    </article>
  );
};
export default Chat;
