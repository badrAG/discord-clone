import React, { useEffect, useState } from 'react'
import './SideBar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SidebarChannel from './SidebarChannel';
import db,{ auth } from './firebase';
import HeadsetIcon from '@material-ui/icons/Headset';
import { Avatar, Tooltip } from '@material-ui/core';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import MicOffIcon from '@material-ui/icons/MicOff';
import { useSelector } from 'react-redux';
import { selectUser } from './features/useSlice';
function SideBar() {
     const user = useSelector(selectUser);
     const [channels ,setChannels] = useState([]);
     const [toggle, setToggle] = useState(false);
     const [toggleAudio, setToggleAudio] = useState(false);
     const [toggleHead, setToggleHead] = useState(false);
     const [togglephone, setTogglephone] = useState(false);
     useEffect(()=>{
        db.collection('channels')
        .orderBy("channelName","asc")
        .onSnapshot((snapshot)=>
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
         const channelName = prompt("Enter a new room name");
         if(channelName){
             db.collection('channels').add({
                 channelName:channelName,
             });
         }
     }
    const toggeler = () =>{
        setToggle((prev)=>!prev);
    }
    const toggelerAud = () =>{
        setToggleAudio((prev)=>!prev);
    }
    const toggelerHead = () =>{
        setToggleHead((prev)=>!prev);
    }
    const toggelerPhone = () =>{
        setTogglephone((prev)=>!prev);
    }
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>DISCORD</h3>
                <ExpandMoreIcon/>
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                    <Tooltip title={toggle?"Show rooms":"Hiden rooms"} placement="right">
                       <ExpandMoreIcon onClick={toggeler} className="toggle"/>
                       </Tooltip>
                        <h4>Chat Rooms</h4>
                    </div>
                    <Tooltip title="Add room" placement="bottom">
                      <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                    </Tooltip>
                </div> 
                <div className={toggle?"active":"sidebar__channelsList"} >
                   { 
                   channels.map(({channel,id})=>(
                       <SidebarChannel 
                         key={id}
                         id={id}
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
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>
            <div className="sidebar__vioceIcons">
                <HelpOutlineIcon/>
               {togglephone ? <PhoneEnabledIcon onClick={toggelerPhone}/> :  <PhoneDisabledIcon onClick={toggelerPhone}/>}
            </div>
          </div>
          <div className="sidebar__profile">
              <Tooltip title="signOut" placement="top">
              <Avatar onClick={()=> auth.signOut()} src={user.photo} style={{ cursor:"pointer" }}/>
              </Tooltip>
              <div className="statut__contener">
                   <span className="statut"></span>
              </div>
              <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,5)}</p>
              </div>
              <div className="sidebar__infoIcons">
               {
               toggleAudio?
                <MicOffIcon onClick={toggelerAud}/>:
                <MicIcon onClick={toggelerAud}/>
                }
                <HeadsetIcon onClick={toggelerHead}/>

                <SettingsIcon/>
                
              </div>
          </div>
        </div>
    )
}

export default SideBar
