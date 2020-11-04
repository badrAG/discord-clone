import React,{Fragment} from 'react';
import './App.css';
import SideBar from './SideBar';
import Chat from './Chat';
import{selectUser} from "./features/useSlice";
import {useSelector, useDispatch} from 'react-redux';
import Login from './Login';
import { auth } from './firebase';
import {login,logout} from './features/useSlice'
function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();
   React.useEffect(()=>{
     auth.onAuthStateChanged((authUser)=>{
       if(authUser){
        dispatch(
          login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName,
        }))
       }else{
        dispatch(logout());
       }
     })
   },[dispatch]);

  return (
    <div className="app">
      {user ? (
        <Fragment>
        <SideBar />
        <Chat />
      </Fragment>
      ):(
        <Login/>
      ) 
      }
      
    </div>
  );
}

export default App;


