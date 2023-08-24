import React from 'react';
import { ListGroup,Badge } from 'react-bootstrap';

function ExpenseList(props) {
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
            
          </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default ExpenseList;
