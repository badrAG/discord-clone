import { Button } from '@material-ui/core'
import React from 'react'
import {auth,provider} from './firebase'
import './Login.css'
function Login() {
    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .catch(err => alert(err.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/603px-Discord_logo.svg.png" alt="logo"/>
            </div>
            <Button onClick={signIn}>SIGN IN</Button>
        </div>
    )
}

export default Login
