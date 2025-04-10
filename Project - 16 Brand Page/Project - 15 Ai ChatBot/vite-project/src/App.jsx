// App.jsx
import { useState } from 'react';
import robot from '../public/robot.png';
import styles from './App.module.css';
import { Chat } from './components/Chat/chat.jsx';
import { Controls } from './components/Controls/Controls.jsx';



function App() {
  const [messages, setMessages] = useState([]);

  function handleContentSend(content){
    setMessages((prevMessages) => [...prevMessages, { content  ,role:'user'}])
  }



  return (
    <>
      <div className={styles.App}>
        <header className={styles.header}>
          <img className={styles.Logo} src={robot} alt="" />
          <h1 className={styles.Title}>AI ChatBot</h1>
        </header>

        <div className={styles.ChatContainer}>
          <Chat messages={messages} />
        </div>
        <Controls onSend={handleContentSend} />
      </div>
    </>
  );
}

export default App;