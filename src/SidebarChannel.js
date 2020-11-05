import React from 'react'
import './SidebarChannel.css'
import {setChannelInfo} from './features/appSlice'
import { useDispatch } from 'react-redux';
function SidebarChannel({id,nameChannel}) {
   const dispatch = useDispatch();
    return (
        <div className="sidebarChannel" onClick={()=>dispatch(
            setChannelInfo({
                channelId : id,
                channelName:nameChannel.channelName
            })
        ) }>
            <div>
                <span className="sidebarChannel__hash">#</span>
                <span className="sidebarChannel__name">{nameChannel.channelName}</span>
            </div>
        </div>
    )
}

export default SidebarChannel
