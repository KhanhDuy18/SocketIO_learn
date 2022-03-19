import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:3001");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[showChat,setShowchat ] = useState(false);

  const handleJoin = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room",  {room,username});
      setShowchat(true);
      console.log(showChat)
    }
  };

  return (
    <div className="App">
      { !showChat ? 
        (<div className='joinFrom'>
        <div className='joinFrom_title'>
          <h3 className='title'>Join Chat</h3>
        </div>
        <div className='joinFrom_body'>
          <input
            type="text"
            placeholder="join.."
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <input
            type="text"
            placeholder="RoomID."
            onChange={(e) => { setRoom(e.target.value) }}
          />
        </div>
        <div className='joinFrom_button'>
          <button onClick={handleJoin}>Join</button>
        </div>
      </div>)
      : 
        (<Chat socket={socket} username={username} room={room}/>)
      }
      
      
    </div>
  );
}

export default App;

