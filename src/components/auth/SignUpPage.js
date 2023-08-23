import React, { useContext, useState } from 'react';
import {Button, FormControl,Card,Form, Spinner} from 'react-bootstrap';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';
function SignUpPage(props) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [isLogin,setIsLogin]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const ctx=useContext(AuthContext);
    const history=useNavigate();
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }
    const confirmHandler=(event)=>{
        setConfirm(event.target.value);
    }

    const toggle=()=>{
        setIsLogin((prevState)=>!prevState);
    }
    const submission=async(event)=>{
        event.preventDefault();
        setIsLoading(true);
        console.log(email,password,confirm);
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA51EecfJp7QewP5lK4328whRsJUwpBUdk'
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA51EecfJp7QewP5lK4328whRsJUwpBUdk'
        }
            try{
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            setIsLoading(false);
            
            if(!response.ok){
                console.log('failed to add user')
                let errmessage='authentication failed'
            alert(errmessage);
            }
            const data=await response.json();
            console.log(data);
            ctx.logIn(data.idToken)
            history('/welcome')
            }catch(error){
                console.error(error.message);
            }
        
    }
  return (
    <div>
      <Card className='card mt-5 shadow fluid'>
        <Card.Title>{isLogin?'Log In':'Sign Up'}</Card.Title>
        <Card.Body>
            <Form className='form' onSubmit={submission}>
                <FormControl type='email' placeholder='EMAIL' className='mb-3'required onChange={emailHandler}/>
                <FormControl type='password' placeholder='PASSWORD'  className='mb-3' required onChange={passwordHandler}/>
                {!isLogin&&<FormControl type='password' placeholder='CONFIRM PASSWORD' className='mb-3' required onChange={confirmHandler}/>}
                {!isLoading&&<Button type='submit' style={{margin:'auto'}}>{isLogin?'Log In':'Sign Up'}</Button>}
                {isLoading&&<Spinner animation="border" variant="success" />}
            </Form>
        </Card.Body>
      </Card>
      
        <Button type='button' onClick={toggle} className='btn mt-3' variant='warning'>Have an account?Login</Button>
      
    </div>
  );
}

export default SignUpPage;
