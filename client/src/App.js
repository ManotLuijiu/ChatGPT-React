import { React, useEffect, useState } from 'react';

import './App.css';
import ChatMessage from './components/ChatMessage';
import './normal.css';

function App() {
  // add state for input and chat log
  const [currentModel, setCurrentModel] = useState('text-davinci-003');
  console.log(currentModel);
  const [models, setModels] = useState([]);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'How can I help you today?',
    },
    {
      user: 'Me',
      message: 'Hi',
    },
  ]);

  // clear chats
  const clearChat = () => {
    setChatLog([]);
  };

  // const getModels = () => {
  //   fetch('http://localhost:3001/models')
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error('เกิดปัญหาบางอย่าง');
  //     })
  //     .then((resJson) => {
  //       setModels(resJson.models);
  //     });
  // };

  const getModels = () => {
    fetch('http://localhost:3001/models')
      .then((res) => res.json())
      .then((resJson) => setModels(resJson.models));
  };

  // getModels once app loads
  useEffect(() => {
    getModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: 'me', message: `${input}` }];
    setInput('');
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join('\n');

    const response = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: 'gpt', message: `${data.message}` }]);
  };

  return (
    <div className="App">
      <aside className="side-menu">
        <div onClick={clearChat} className="side-menu-button">
          <span>+</span>New Chat
        </div>
        <label
          htmlFor="models"
          className="block my-2 text-sm font-medium text-white dark:text-white"
        >
          เลือกโมเดล
        </label>
        <select
          onChange={(e) => {
            setCurrentModel(e.target.value);
          }}
          value={currentModel}
          id="models"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
      </aside>
      <section className="chat-box">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <textarea
              className="chat-input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="prompt"
              id="prompt"
              cols="1"
              rows="1"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
