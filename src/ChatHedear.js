import React from 'react'
import './ChatHedear.css'
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
function ChatHedear({channelName}) {
    return (
        <div className="chat__hedear">
           <div className="chatHedear__left">
              <h3>
                  <span className="chatHedear__hash">
                 # </span>
                 {channelName}
              </h3>
           </div>
           <div className="chatHedear__right">
                <NotificationsIcon/>
                <EditLocationIcon/>
                <PeopleAltIcon/>
                <div className="chatHedear__search">
                    <input placeholder='Search'/>
                    <SearchIcon/>
                </div>
                <SendIcon/>
                <HelpIcon/>
           </div>
        </div>
    )
}

export default ChatHedear
