import React, { useContext, useState} from 'react';
import './WelcomePage.css';
import { Button, Card} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
function WelcomePage() {
 const [userList,setuserList]=useState([]);
  const ctx=useContext(AuthContext);
  const history=useNavigate();
  const logoutPage=()=>{
    ctx.logOut();
    
    ctx.token='';
    
    history('/');
  }
    const addHandler=(uMoney,uDescription,uCategory)=>{
        setuserList((prevList)=>{
          return  ([...prevList,{money:uMoney,description:uDescription,category:uCategory,id:Math.random().toString()}])
        })
    }

  return (
    <>
        
      <h2><i>Welcome to Expense tracker app</i></h2>
      <Card className='p' style={{backgroundColor:'pink'}}><p><i>your profile is incomplete <Link to='/profile'>Complete now</Link></i></p></Card>
      <Button variant='danger' onClick={logoutPage}>Log Out</Button>
      <hr/>
      <ExpenseForm onAdd={addHandler}/>
      <ExpenseList items={userList}/>
    </>
  );
}

export default WelcomePage;
