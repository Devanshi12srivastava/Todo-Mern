import React, { useState } from 'react'
import Edittodo from '../layout/Edittodo';
import TodoServices from '../service/Todoservice';
import toast from 'react-hot-toast';

const Card = ({ allTask,getusertask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit=()=>{
    setShowModal(true)
  }

  const handleDelete=async(id)=>{
    try {
      await TodoServices.deleteTodo(id);
      toast.success("deleted");
      getusertask()
      
    } catch (error) {
      toast.error(
        error.response?.data?.message || // backend message if available
        error.message ||                 // Axios message
        "Something went wrong"           // fallback
      );
    }
  }
  return (
    <>
    <div className='card-container'>
      {allTask?.map((task, i) => (
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
            <div className='card-footer bg-transparent border-primary'>
              <button
                className='btn btn-warning'
                title="EDIT task"
                onClick={handleEdit}
              >
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button className='btn btn-danger' title="DELETE task" onClick={()=>handleDelete(task?._id)}>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </div>

          {showModal && <Edittodo task={task} setShowModal={setShowModal} getusertask={getusertask} />}
        </React.Fragment>
      ))}
      </div>
    </>
  )
}

export default Card;
