const Message = ({ type, text }) => {
    if (!text) return null;
  
    const className = type === "success" ? "success-message" : "error-message";
    return <p className={className}>{text}</p>;
  };
  
  export default Message;
  