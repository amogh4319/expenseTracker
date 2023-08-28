import React, { useState } from 'react';
import { ListGroup,Badge, Button } from 'react-bootstrap';
import premiumImg from '../assets/premium.png';


function ExpenseList(props) {
  const [show,setShow]=useState(false);

  
  
  
  return (
    <div>
       <ListGroup as="ol"  style={{width:'60%',margin:'auto'}} className='mt-3 ' >
        {props.items.map((item) => (

          <ListGroup.Item
          
          as="li"
          variant='info'
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
        {item.money>=10000 &&
        (<Button variant='info'><img src={premiumImg} alt="premium" height={'60px'} width={'60px'}/></Button>)}
        </div>
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
