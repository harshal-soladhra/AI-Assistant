import { useNavigate } from "react-router-dom";
import "./ChatBotButton.css";

export const ChatBotButton = () => {
  const navigate = useNavigate();

  return (
    <div className="chatbot-container"
onClick={() =>
  localStorage.getItem("token")
    ? navigate("/chat")
    : navigate("/login")
}>
      <div className="chatbot-icon">🤖</div>
      <span className="chatbot-text">Chat</span>
    </div>
  );
};

export default ChatBotButton;
