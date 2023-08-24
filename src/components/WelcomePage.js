import React, { useContext } from 'react';
import './WelcomePage.css';
import { Button, Card} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';
function WelcomePage() {
  const ctx=useContext(AuthContext);
  const history=useNavigate();
  const logoutPage=()=>{
    ctx.logOut();
    
    ctx.token='';
    
    history('/');
  }
  return (
    <div>
        
      <h2><i>Welcome to Expense tracker app</i></h2>
      <Card className='p' style={{backgroundColor:'pink'}}><p><i>your profile is incomplete <Link to='/profile'>Complete now</Link></i></p></Card>
      <Button variant='danger' onClick={logoutPage}>Log Out</Button>
      <hr/>
      
    </div>
  );
}

export default WelcomePage;
