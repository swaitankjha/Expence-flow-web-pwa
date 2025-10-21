import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 0, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isSending, setIsSending] = useState(false); // optional loading state

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
const response = await fetch("/api/chatbot", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userQuery: userMsg.text }),
});
const data = await response.json();

const botReply = {
  id: Date.now() + 1,
  sender: "bot",
  text: data.botResponse || "Sorry, I didn't get that.",
};

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Error: Unable to reach the server.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user" ? "user-msg" : "bot-msg"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <textarea
          rows="2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />
        <button onClick={handleSend} disabled={!input.trim() || isSending}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
