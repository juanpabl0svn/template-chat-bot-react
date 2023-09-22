// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {


  // eslint-disable-next-line react/prop-types
  return <p className={message.type}>{message.text}</p>;
};

export default Message;
