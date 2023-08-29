import React, { useEffect, useState} from 'react';
import './WelcomePage.css';
import { Button, Card,Form} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';

import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expense';
import { authActions } from '../store/auth';
import premiumImg from '../assets/premium.png';
import download from '../assets/download.png';
import {themeActions} from '../store/theme'
import sun from '../assets/sunny.png';
import moon from '../assets/moon.png';

function WelcomePage() {
  
  const [userList,setuserList]=useState([]);
 const [editingItemId, setEditingItemId] = useState(null);
 const [isEditing,setIsEditing]=useState(false); // New state for editing item
 const [show,setShow]=useState(false);
 const [toggle,setToggle]=useState(false);
  const showPremiumButton=userList.some(item=>item.money>=10000);
  const dispatch=useDispatch();
  
  const history=useNavigate();
  const logoutPage=()=>{
    
    
   dispatch(authActions.logOut())
    
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
  }, [setuserList]); // Run only once on component mount
  
  const addHandler=async(uMoney,uDescription,uCategory)=>{
      try {
        const response = await fetch('https://expensetracker-4e64b-default-rtdb.firebaseio.com/expenseData.json', {
          method: 'POST',
          body: JSON.stringify({ money: uMoney, description: uDescription, category: uCategory }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Expense is not added');
        }
    
        // Fetch the updated list of expenses after adding a new one
        const updatedResponse = await fetch('https://expensetracker-4e64b-default-rtdb.firebaseio.com/expenseData.json');
        const updatedData = await updatedResponse.json();
    
        const updatedExpenses = [];
        for (const key in updatedData) {
          updatedExpenses.push({
            id: key,
            money: updatedData[key].money,
            description: updatedData[key].description,
            category: updatedData[key].category,
          });
        }
    
        setuserList(updatedExpenses); // Update the expenses in the parent component
      } catch (error) {
        console.error(error.message);
      }
    }


    const editHandler = (id) => {
      setEditingItemId(id);
      setIsEditing(true);
      deleteHandler(id) // Set the editingItemId state
    };

  const deleteHandler = async (id) => {
    
        console.log("Received ID:", id);
        console.log("Loaded Expenses:", userList);
      
      dispatch(expenseActions.removeItem(id));
    
        try {
         
          const deleteResponse = await fetch(
            `https://expensetracker-4e64b-default-rtdb.firebaseio.com/expenseData/${id}.json`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(deleteResponse.status); // Log the response status
          const deleteResponseData = await deleteResponse.json();
          console.log(deleteResponseData); // Log the response data
      
          if (deleteResponse.ok) {
            console.log("Item is deleted from Firebase");
           // alert('Expense got deleted!!!');
    
            // Re-fetch the updated list of expenses
            const updatedResponse = await fetch('https://expensetracker-4e64b-default-rtdb.firebaseio.com/expenseData.json');
            const updatedData = await updatedResponse.json();
    
            const updatedExpenses = [];
            for (const key in updatedData) {
              updatedExpenses.push({
                id: key,
                money: updatedData[key].money,
                description: updatedData[key].description,
                category: updatedData[key].category,
              });
            }
    
            setuserList(updatedExpenses); // Update the expenses in the parent component
          } else {
            console.error("Item could not be deleted from Firebase:", deleteResponse.statusText);
          }
        } catch (error) {
          console.error(error.message);
        }
      }

      const showtoggle=()=>{
        setShow(true);
        setToggle(true);
      }
      const downloadHandler=()=>{
        // Create a CSV string from your expense data
    const expensesCSV = userList.map(expense => {
       return `${expense.category},${expense.description},${expense.money}`;
     }).join('\n');
    
     // Create a Blob with the CSV data and trigger download
     const blob = new Blob([expensesCSV], { type: 'text/csv' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'expenses.csv';
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     URL.revokeObjectURL(url);
    }
    
    //const showDownloadButton=props.expenses.some(item=>item.money>=10000);
    const isDarkTheme=useSelector(state=>state.theme.isDarkTheme)
      const toggleSwitch=()=>{
        dispatch(themeActions.toggleDarkTheme());
      }
      

  return (
    <div style={{backgroundColor:isDarkTheme?'black':'white'}}>
        <div style={{backgroundColor:isDarkTheme?'black':'white'}}>
      <h2 style={{color:isDarkTheme?'white':'black'}}><i>Welcome to Expense tracker app</i></h2>
      {showPremiumButton&&!toggle?(<Button variant='info'  className='premium-button' ><img src={premiumImg} alt="premium" height={'60px'} width={'60px'} onClick={showtoggle}/></Button>):(show && toggle &&<Form.Check type='switch' style={{marginLeft:'47%',sw:'30px'}} label={<img src={isDarkTheme?sun:moon} alt='sun/moon' height={'30px'} width={'30px'} />} onClick={toggleSwitch}/>)}
      <div></div>
      <Card className='p' style={{backgroundColor:'pink'}}><p><i>your profile is incomplete <Link to='/profile'>Complete now</Link></i></p></Card>
      <Button variant='danger' onClick={logoutPage}>Log Out</Button>
      <hr/>
      </div>
      <ExpenseForm 
      onAdd={addHandler}
      editingItemId={editingItemId} 
      items={userList}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      
      />
       {show&&<Button variant={isDarkTheme?'dark':'light'} onClick={downloadHandler} style={{marginLeft:'40%'}}><img src={download} alt='download' width={'50px'} height={'50px'}/>Download Expenses as csv file</Button>}
      <ExpenseList items={userList} deleteHandler={deleteHandler} editHandler={editHandler} expenses={userList} />
    </div>
  );
}

export default WelcomePage;
