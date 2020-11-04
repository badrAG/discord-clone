import React, { useEffect, useState } from 'react'
import './SideBar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import CallIcon from '@material-ui/icons/Call';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SidebarChannel from './SidebarChannel';
import db,{ auth } from './firebase';
import HeadsetIcon from '@material-ui/icons/Headset';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/useSlice';
function SideBar() {
     const user = useSelector(selectUser);
     const [channels ,setChannels] = useState([]);
     console.log(channels)
     useEffect(()=>{
        db.collection('channels').onSnapshot((snapshot)=>
            setChannels(
                snapshot.docs.map((doc) => ({
                id:doc.id,
                channel:doc.data(),
            })
            )
        )
        )
     },[]);
     const handleAddChannel = ()=>{
         const channelName = prompt("Enter a new channel name");
         if(channelName){
             db.collection('channels').add({
                 channelName:channelName,
             });
         }
     }
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>badr__ag</h3>
                <ExpandMoreIcon/>
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div> 
                <div className="sidebar__channelsList">
                   { 
                   channels.map(({channel,i})=>(
                       <SidebarChannel 
                         key={i}
                         id={i}
                         nameChannel={channel} />
                   ))
                     }
                </div>
            </div>
          <div className="sidebar__vioce">
            <SignalCellularAltIcon 
            className="sidebar__vioceIcon"
            fontSize='large'
            />
            <div className="sidebar__vioceInfo">
                <h3>Vioce Connected</h3>
                <p>Stream</p>
            </div>
            <div className="sidebar__vioceIcons">
                <HelpOutlineIcon/>
                <CallIcon/>
            </div>
          </div>
          <div className="sidebar__profile">
              <Avatar onClick={()=> auth.signOut()} src={user.photo} />
              <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,5)}</p>
              </div>
              <div className="sidebar__infoIcons">
                <MicIcon/>
                <HeadsetIcon/>
                <SettingsIcon/>
              </div>
          </div>
        </div>
    )
}

export default SideBar
