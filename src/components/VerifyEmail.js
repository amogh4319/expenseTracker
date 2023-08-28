import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import AuthContext from '../store/authContext';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

function VerifyEmail() {
    const history=useNavigate();
    //const ctx=useContext(AuthContext);
    const token=useSelector(state=>state.auth.token);
    const emailVerified=useSelector(state=>state.auth.isEmailVerified)
    const dispatch=useDispatch();
    const emailverification=async()=>{
        try{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA51EecfJp7QewP5lK4328whRsJUwpBUdk',{
                method:'POST',
                body:JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken:token,
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(response);
            const data=await response.json();
            if(!response.ok){
                throw new Error(data.error.message);
            }
           
            if(data.users && data.users.length>0){
            console.log(data.users[0].email);
            }
            //ctx.setEmailVerified(true);
            dispatch(authActions.setEmailVerified())
            alert('verification email sent to your mail id');
            history('/welcome');
        }catch(error){
            console.error(error.message);
        }
    }
  return (
    <div>
      <Button onClick={emailverification}>Verify Email</Button>
    </div>
  );
}

export default VerifyEmail;
