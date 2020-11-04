import React from 'react'
import './SidebarChannel.css'
function SidebarChannel({nameChannel}) {
    console.log(nameChannel)
    return (
        <div className="sidebarChannel">
            <h4>
                <span className="sidebarChannel__hash">#</span>
                {nameChannel.channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
