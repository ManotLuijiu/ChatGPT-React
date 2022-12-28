import './App.css';
import ChatGPTLogo from './components/ChatGPT';
import './normal.css';

function App() {
  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span>+</span>New Chat
        </div>
      </aside>
      <section className="chat-box">
        <div className="chat-log">
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar"></div>
              <div className="message">Hello World</div>
            </div>
          </div>
          <div className="chat-message chatgpt">
            <div className="chat-message-center">
              <div className="chatgpt">
                <div className="rounded-lg">
                  <ChatGPTLogo className="chatgpt-logo" />
                </div>
              </div>
              <div className="message">I am an AI</div>
            </div>
          </div>
        </div>
        <div className="chat-input-holder">
          <textarea
            className="chat-input-textarea"
            name="prompt"
            id="prompt"
            cols="1"
            rows="1"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
