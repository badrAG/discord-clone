import { Avatar, Tooltip } from '@material-ui/core'
import React from 'react'
import StarsIcon from '@material-ui/icons/Stars';
import './Message.css'

function Message({timestamp,user,message}) {
    return (
        <div className="message">
            <Avatar src={user.photo}/>
            <div className="message__info">
    <h4 className="info__profil">{
    user.uid==="YsbpAdCQQNcAF9gFiatBr7bfr5M2"?(<> <Tooltip title="Admin" placement="top-start">
    <div >
        <StarsIcon className="admin"/>
        
        </div></Tooltip>{user.displayName}
        </>
        ):(
    <>{user.displayName}</>
    )
    }
                    <span className="message__timestamp">
                       {new Date(timestamp?.toDate()).toUTCString()} 
                    </span>
                </h4>
                <p>
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message
