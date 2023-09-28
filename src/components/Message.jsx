// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {


  // eslint-disable-next-line react/prop-types
  return <p className={message.type}>{message.text ?? "Lo siento, no entendi tu pregunta, ¿Puedes ser mas claro y directo para yo entender mejor por favor?"}</p>;
};

export default Message;
      
