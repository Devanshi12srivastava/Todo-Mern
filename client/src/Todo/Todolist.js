import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import TodoServices from '../service/Todoservice';

const Todolist = () => {
  const [todoStatus,setTodoStatus]=useState("");
  const [filterTask,setFiltertask]=useState([]);
    const [allTask,setallTask]=useState([]);


  const userData=JSON.parse(localStorage.getItem('todoapp'))
 const id=userData && userData.user.id
 const getusertask=async()=>{
  try {
    const {data} =await TodoServices.getAlltodo(id)
    console.log(data)
    setallTask(data?.todos);
  } catch (error) {
    console.log(error)
  }
 };

useEffect(()=>{
  const incomplete=allTask?.filter(item=>item?.isCompleted === false)
   const complete=allTask?.filter(item=>item?.isCompleted === true)
   if(todoStatus === 'incomplete'){
    setFiltertask(incomplete)
   }
   else if(todoStatus=== 'completed'){
    setFiltertask(complete)
   }
  
 getusertask();
},[todoStatus])
  return (
    <>
    <Navbar/>
    <div className='filter-container'>
      <h4>Filter Todos By</h4>
      <div className='filter-group'>
        <select className='form-select' onChange={(e)=>setTodoStatus(e.target.value)}>
           {/* <option selected>Select</option> */}
          <option value="incomplete">Incompleted</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <div className='card-container'>
      {filterTask?.length === 0 ?(<h1 className='No-task'>No task found</h1>):(filterTask?.map((task, i) => (
        <React.Fragment key={task._id || i}>
          <div className='card border-primary mb-3' style={{ maxWidth: '18rem' }}>
            <div className='card-header'>
              <div className='chead'>
                <h6>{task?.title.substring(0, 10)}</h6>
                <h6>{task?.isCompleted ? "completed" : "incomplete"}</h6>
              </div>
            </div>
            <div className='card-body'>
              <h6>{task?.title}</h6>
              <p className='card-text'>{task?.description}</p>
              <h6>Date : {task?.createdAt.substring(0, 10)}</h6>
            </div>
            
          </div>

         
        </React.Fragment>
      )))}
      </div>
    </>
  )
}

export default Todolist
