import React, { useEffect,useRef } from 'react'
import './Chat.css'
import ChatHedear from './ChatHedear'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/useSlice';
import db from './firebase'
import firebase from 'firebase'
import { selectChannelId, selectChannelName } from './features/appSlice';
function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState([]);
   
    useEffect(()=>{
        if(channelId){
        db.collection('channels')
        .doc(channelId)
        .collection('message')
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot)=>
        setMessages((snapshot.docs.map(
            (doc)=>doc.data()
            )))
        );
        scrollToBottom();
        return(
            scrollToBottom()
        )
    }
    }, [channelId]);
     const messageEl = useRef(null);
   const scrollToBottom = () => {
    if (messageEl) {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
      }
      }

    const sendMessage = e=>{
        e.preventDefault();
        db.collection("channels").doc(channelId)
        .collection("message")
        .add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user
        });
        scrollToBottom();
        setInput("");
    }
    
    return (
        <div className="chat">
           <ChatHedear channelName={channelName}/>
           <div className="chat__messages" ref={messageEl}>
           {
               
            messages.length ? (messages.map((msg,i) => (
                   <Message
                   key={i}
                   timestamp={msg.timestamp}
                   message={msg.message}
                   user={msg.user}
                   />
             ))):(channelName?(<div className="new__message">
                 <span className="left"></span><p>share your ideas with random people</p><span className="right"></span>
                
             </div>):(
             <div className="info">
             <div className="info__message">
                <h2>Welcome to Discord</h2>
                <p>Choose a room or add a new room to share your ideas with random people</p>
             </div>
             </div>))
           }
           
           </div>
           <div className="chat__input">
                <AddCircleIcon fontSize="large"/>
                <form >
                    <input value={input} 
                    onChange={e=>setInput(e.target.value)}
                    disabled={!channelId}
                    placeholder="Message..."/>
                    <button className="chat__inputButton"
                     type="submit"
                     onClick={sendMessage}
                     >
                       + 
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                </div>
           </div>
        </div>
    )
}

export default Chat
