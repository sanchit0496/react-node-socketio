// frontend1/src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:5000');

const App = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setReceivedMessage(data.message);
    });
  }, []);

  return (
    <div className="App">
      <h2>Frontend App 1</h2>
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received: {receivedMessage}</p>
    </div>
  );
};

export default App;
