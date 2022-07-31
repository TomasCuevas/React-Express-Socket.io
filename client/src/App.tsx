import { useState, FormEvent, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');

export const App = () => {
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    socket.emit('newMessage', message);
    setMessage('');
  };

  useEffect(() => {
    const receiveMessage = (message: string) => console.log(message);
    socket.on('newMessage', receiveMessage);

    return () => {
      socket.off('newMessage', receiveMessage);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" value={message} onChange={({ target }) => setMessage(target.value)} />
        <button>Send</button>
      </form>
    </div>
  );
};
