import React from 'react';

import ChatGPTLogo from './ChatGPT';

const ChatMessage = ({ message }) => {
  console.log(message);
  return (
    <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}>
          {message.user === 'gpt' && <ChatGPTLogo />}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
