import React from 'react';
import './WelcomePage.css';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
function WelcomePage() {
  return (
    <div>
        
      <h2><i>Welcome to Expense tracker app</i></h2>
      <Card className='p' style={{backgroundColor:'pink'}}><p><i>your profile is incomplete <Link to='/profile'>Complete now</Link></i></p></Card>
      
      <hr/>
      
    </div>
  );
}

export default WelcomePage;
