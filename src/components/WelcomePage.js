import React, { useContext,useEffect, useState} from 'react';
import './WelcomePage.css';
import { Button, Card} from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ProductContext from '../store/ProductContext';
function WelcomePage() {
 const [userList,setuserList]=useState([]);
 const [editingItemId, setEditingItemId] = useState(null);
 const [isEditing,setIsEditing]=useState(false); // New state for editing item
  const authctx=useContext(AuthContext);
  const ctx=useContext(ProductContext)
  const history=useNavigate();
  const logoutPage=()=>{
    authctx.logOut();
    
    
    
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
        ctx.removeItem(id);
    
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

      

  return (
    <>
        
      <h2><i>Welcome to Expense tracker app</i></h2>
      <Card className='p' style={{backgroundColor:'pink'}}><p><i>your profile is incomplete <Link to='/profile'>Complete now</Link></i></p></Card>
      <Button variant='danger' onClick={logoutPage}>Log Out</Button>
      <hr/>
      <ExpenseForm 
      onAdd={addHandler}
      editingItemId={editingItemId} 
      items={userList}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      />
      <ExpenseList items={userList} deleteHandler={deleteHandler} editHandler={editHandler} />
    </>
  );
}

export default WelcomePage;
