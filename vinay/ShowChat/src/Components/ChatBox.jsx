import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios';

function ChatBox() {
    const [chatList,setChatList]=useState([]);
    const [currentChat,setCurrentChat]=useState([]);
    const handleClick=(e,i)=>{
        let newList=chatList?.filter((chat)=>chat.id===i)
        console.log("newList ",newList);
        setCurrentChat(()=>newList?.length>0 ? newList[0].messageList : []);
    }
    console.log("current chat",currentChat);
    useEffect(()=>{
        axios.get('https://my-json-server.typicode.com/codebuds-fk/chat/chats').
        then((res)=>{
                console.log("chat list is ", res.data);
                setChatList(res.data);
        })
    },[]);
  return (
        <div className='main-container'>
            <h1>My Chatbot</h1>
            <div className='container'>
                <div className='ecommerce-container'>
                    {
                        chatList.map((chat,i)=>{
                            return (
                                <div className='ecommerce-element' key={i} onClick={(e)=>handleClick(e,chat.id)}>
                                    <img src={chat.imageURL} style={{height: "50px", width: "50px"}}></img>
                                    <p>{chat.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='chat-container'>
                    {
                        currentChat?.map((chat,i)=>{
                            return (
                                <div className='msg-element' key={i}>
                                        <p style={{display: "flex", justifyContent: chat.sender==="BOT" ?"flex-start" : "flex-end"}}>{chat.sender}</p>
                                        <p style={{display: "flex", justifyContent: chat.sender==="BOT" ?"flex-start" : "flex-end"}}>{chat.message}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}

export default ChatBox
