import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');

export const App = () => {
  return (
    <div>
      <h1>Hello Word</h1>
    </div>
  );
};
