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
    <div className=" h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form className="bg-zinc-900 p-10 w-screen" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          type="text"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          className="rounded-lg  border-2 border-zinc-500 p-2 text-black w-full"
        />
        <ul className="h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <Message key={message.from + index} body={message.body} from={message.from} />
          ))}
        </ul>
      </form>
    </div>
  );
};
