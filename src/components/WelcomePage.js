import React, { useContext,useEffect, useState} from 'react';
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
    
    
    
    history('/');
  }

  useEffect(() => {
    // Fetch the previously added expenses here
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          'https://expensetracker-4e64b-default-rtdb.firebaseio.com/expenseData.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            money: data[key].money,
            description: data[key].description,
            category: data[key].category,
          });
        }

        setuserList(loadedExpenses);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchExpenses();
  }, []); // Run only once on component mount
  
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
