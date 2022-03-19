import React, { useEffect, useState } from 'react';
import "./Chat.css";
import ScrollToBottom from 'react-scroll-to-bottom';


function Chat({socket,username,room}) {

  const [message, setMessage ]= useState("");
  const [messageList, setMessageList] = useState([]);
  const [countUser,setCountUser] =useState([{username}]);


  const handelSentMessage = async ()=> 
  {    
    if(message !=="")
      {
        var today = new Date();
        const messageData = {
          room:room,
          author:username,
          message: message,
          time: today.getDate()+'-'+(today.getMonth()+1)+today.getHours()+':'+today.getMinutes()
        }
        await socket.emit("send_message",messageData);
        setMessageList((list)=>[...list,messageData]);
        setMessage("");
      }
  }

   useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list)=>[...list,data]);
    });
    socket.on("count_user",(data)=>{
        setCountUser((list) =>[...list,data]);
        console.log(countUser);
    });
  }, [socket]);



  return (
    <div className='chatbox'>
        <div className='chatbox_header'>
          <p>Live Chat</p>
        </div>
        <div className='chatbox_body'>
          <ScrollToBottom>
          { messageList.map((message,index)=>
         {
           return(
            <div key={index} className ={message.author === username ? "you": "other"}>
              <div id="content">
                  <p >{message.message}</p>
              </div>
              <p id="meta-mess">{message.author} - {message.time}</p>
             
            </div>
            )
         })}
          </ScrollToBottom>
        </div>
        <div className='chatbox_footer'>
            <input
                type="text"
                placeholder='....'
                value={message}
                onChange={(event) => {setMessage(event.target.value)}}
            />
            <button onClick={handelSentMessage}>Gửi</button>
        </div>
    </div>
  )
}

export default Chat