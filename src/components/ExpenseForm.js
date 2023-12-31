import React,{ useState,useEffect} from 'react';
import {Card,Form,Container,FormControl,Button} from 'react-bootstrap'
import { useDispatch ,useSelector} from 'react-redux';
import { expenseActions } from '../store/expense';


function ExpenseForm(props) {
  const { editingItemId,items,isEditing,setIsEditing } = props; // Receive the editingItemId prop
    const [money,setMoney]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const dispatch=useDispatch();
     
    

    useEffect(() => {
      // If there's an editingItemId, find the specific item and pre-fill the form
      console.log('userlist',{items});
      if (editingItemId) {
        const specificExpense = items.find(item => item.id === editingItemId);
        if (specificExpense) {
          setMoney(specificExpense.money);
          setDescription(specificExpense.description);
          setCategory(specificExpense.category);
        }
      }
    }, [editingItemId, items]);
   
       

    const moneyHandler=(event)=>{
      setMoney(event.target.value);
    }
    const descriptionHandler=(event)=>{
      setDescription(event.target.value);
    }
    const categoryHandler=(event)=>{
      setCategory(event.target.value);
    }
   
    const submission=async(event)=>{
        event.preventDefault();
        if(isEditing){
        setIsEditing(false);
        }
         
        //ctx.addItem({money:money,description:description,category:category})
          dispatch(expenseActions.addItem({money:money,description:description,category:category}))
        
        props.onAdd(money,description,category);
        setMoney('');
        setCategory('');
        setDescription('');
        }
        const isDarkTheme=useSelector(state=>state.theme.isDarkTheme)
    
  
  return (
    <div >
        <Container >
        <Card className='card mt-3 shadow fluid' style={{backgroundColor:isDarkTheme?'grey':"white",border: isDarkTheme ? '2px solid white' : '2px solid black'}}>
          <Card.Body>
          <Form onSubmit={submission}>
            <Form.Label style={{color:isDarkTheme?'white':'black'}}>Money Spent:</Form.Label>
            <FormControl type='number' onChange={moneyHandler} value={money}/>
            <Form.Label style={{color:isDarkTheme?'white':'black'}}>Description:</Form.Label>
            <FormControl type='text' onChange={descriptionHandler} value={description}/>
            <Form.Label style={{color:isDarkTheme?'white':'black'}}>Category:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={categoryHandler} value={category}>
              <option>Open this select menu</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
            <Button variant='success' className='mt-3 btn float right' type='submit'>{!isEditing?'Add expense':'Update Expense'}</Button>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ExpenseForm;
