import React, { useState } from 'react'
import Edittodo from '../layout/Edittodo';
import TodoServices from '../service/Todoservice';
import toast from 'react-hot-toast';

const Card = ({ allTask, getusertask }) => {
  const [selectedTask, setSelectedTask] = useState(null); // store selected todo

  const handleEdit = (task) => {
    setSelectedTask(task); // open modal with that task
  };

  const handleClose = () => {
    setSelectedTask(null); // close modal
  };

  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("deleted");
      getusertask();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className='card-container'>
        {allTask?.map((task, i) => (
          <div key={task._id || i} className='card border-primary mb-3' style={{ maxWidth: '18rem' }}>
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
                onClick={() => handleEdit(task)}
              >
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button
                className='btn btn-danger'
                title="DELETE task"
                onClick={() => handleDelete(task?._id)}
              >
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modal only opens for selectedTask */}
      {selectedTask && (
        <Edittodo
          task={selectedTask}
          setShowModal={handleClose}
          getusertask={getusertask}
        />
      )}
    </>
  );
};

export default Card;
