// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:8000/chatbot/api/chat/', {
        message: input,
      });
      const botReply = { role: 'bot', content: response.data.reply };
      setMessages([...messages, userMessage, botReply]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
