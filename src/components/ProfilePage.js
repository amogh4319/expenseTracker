import React, { useContext, useState ,useEffect} from 'react';
import { Card,Form,Button, FormControl } from 'react-bootstrap';
import './ProfilePage.css'
import AuthContext from '../store/authContext';
const nameLoader=JSON.parse(localStorage.getItem('fullname'));
const photoLoader=JSON.parse(localStorage.getItem('photo'));

function ProfilePage() {
  
    const [fullname,setFullname]=useState(nameLoader);
    const [photo,setPhotoUrl]=useState(photoLoader);
  const ctx=useContext(AuthContext);
    const fullnameHandler=(event)=>{
        setFullname(event.target.value);
    }
    const photoHandler=(event)=>{
        setPhotoUrl(event.target.value);
    }
    useEffect(() => {
      // Fetch user profile data using idToken
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA51EecfJp7QewP5lK4328whRsJUwpBUdk`, {
            method: 'POST',
            body: JSON.stringify({
              idToken: ctx.token,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch profile data.');
          }
  
          const data = await response.json();
            console.log(data);
          if (data.users && data.users.length > 0) {
            const userData = data.users[0];
            setFullname(userData.displayName || '');
            setPhotoUrl(userData.photoUrl || '');
          }
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchUserProfile();
    }, [ctx.token]);
    const submission=async(event)=>{
        event.preventDefault();
        console.log(fullname,photo);
        localStorage.setItem('fullname',JSON.stringify(fullname));
        localStorage.setItem('photo',JSON.stringify(photo));
        try{
         

        const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA51EecfJp7QewP5lK4328whRsJUwpBUdk',{
            method:'POST',
            body:JSON.stringify({
                idToken:ctx.token,
                displayName:fullname,
                photoUrl:photo,
                returnSecureToken	:true
            }),
            headers:{
              'Content-Type':'AppLication/json'
            }
        })
        console.log(res)
        if(!res.ok){
          throw new Error('update get failured!!!')
        }
        const data=await res.json();
        console.log(data);
      }catch(error){
        console.error(error.message);
      }
    }
  return (
    <div>
      <h3><i>Winners never quite Quitters never wins</i></h3>
      <Card className='div card' style={{backgroundColor:'pink'}}><p>Your profile is <b>64%</b> completed.A complete profile has higher chance oflanding job.Complete now </p></Card>
      <hr/>
      <section className='div section'>
        <h4>Contact Details:</h4>
        <br/>
        <Form onSubmit={submission}>
            <div>
            <Form.Label>Full Name:</Form.Label>
            <FormControl type='text' onChange={fullnameHandler}/>
            <br/>
            <Form.Label>Profile Photo Url:</Form.Label>
            <FormControl type='text' onChange={photoHandler}/>
            </div>
            <Button style={{backgroundColor:'brown'}} className='mt-3'type='submit'>Update</Button>
        </Form>
      </section>
    </div>
  );
}

export default ProfilePage;
