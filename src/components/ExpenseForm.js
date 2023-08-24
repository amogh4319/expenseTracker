import React,{useState} from 'react';
import {Card,Form,Container,FormControl,Button} from 'react-bootstrap'

function ExpenseForm(props) {
    const [money,setMoney]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
  
    const moneyHandler=(event)=>{
      setMoney(event.target.value);
    }
    const descriptionHandler=(event)=>{
      setDescription(event.target.value);
    }
    const categoryHandler=(event)=>{
      setCategory(event.target.value);
    }
    const submission=(event)=>{
        event.preventDefault();
        
        
        props.onAdd(money,description,category);
    }
  
  return (
    <div>
        <Container>
        <Card className='card mt-3 shadow fluid'>
          <Card.Body>
          <Form onSubmit={submission}>
            <Form.Label>Money Spent:</Form.Label>
            <FormControl type='number' onChange={moneyHandler}/>
            <Form.Label>Description:</Form.Label>
            <FormControl type='text' onChange={descriptionHandler}/>
            <Form.Label>Category:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={categoryHandler}>
              <option>Open this select menu</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
            <Button variant='success' className='mt-3 btn float right' type='submit'>Add expense</Button>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ExpenseForm;
