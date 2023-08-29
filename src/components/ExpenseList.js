import React from 'react';
import { ListGroup,Badge, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function ExpenseList(props) {
  const isDarkTheme=useSelector(state=>state.theme.isDarkTheme)

  return (
    <div>
       <ListGroup as="ol"  style={{width:'60%',margin:'auto'}} className='mt-3 ' >
       
        {props.items.map((item) => (

          <ListGroup.Item
          
          as="li"
          variant={isDarkTheme?'dark':'info'}
          className="d-flex justify-content-between align-items-center mt-3 shadow"
          
          key={item.id}>
            <div className="ms-2 me-auto">
          <div className="fw-bold" style={{fontSize:'20px'}}>{item.category}</div>
          <i>{item.description}</i>
        </div>
        <Badge bg="warning" pill style={{fontSize:'25px'}}>
        INR:{item.money}
        </Badge>
        
       
        <div>
        <Button onClick={()=>props.editHandler(item.id)}>Edit</Button>
        <Button variant='danger' className='mt-3' onClick={()=>props.deleteHandler(item.id)}>Delete</Button>
        </div> 
          </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default ExpenseList;
