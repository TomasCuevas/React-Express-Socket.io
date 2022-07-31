import { useState, FormEvent, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import { Message } from './components/Message';

const socket = io('http://localhost:4000');

interface Messages {
  body: string;
  from: string;
}

export const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    socket.emit('newMessage', message);
    setMessage('');
    setMessages((prev) => [
      {
        body: message,
        from: 'Me',
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    const receiveMessage = (message: Messages) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.on('newMessage', receiveMessage);

    return () => {
      socket.off('newMessage', receiveMessage);
    };
  }, [messages]);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" value={message} onChange={({ target }) => setMessage(target.value)} />
        <button>Send</button>
      </form>
      {messages.map((message, index) => (
        <Message key={message.from + index} body={message.body} from={message.from} />
      ))}
    </div>
  );
};
