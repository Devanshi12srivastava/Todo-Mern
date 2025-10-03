import React, { useState } from 'react'
import TodoServices from '../service/Todoservice';
import toast from 'react-hot-toast';

const Edittodo = ({ task, setShowModal, getusertask }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setdescription] = useState(task?.description || "");
  const [isCompleted, setisCompleted] = useState(task?.isCompleted || false);

  const handleClose = () => {
    setShowModal(null);
  };

  const handleChange = (e) => {
    setisCompleted(e.target.value === "true");
  };

  const id = task?._id;

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy, isCompleted: Boolean(isCompleted) };

      if (!title || !description) {
        return toast.error("Please provide all fields");
      }

      await TodoServices.updateTodo(id, data);
      toast.success("Updated successfully");
      setTitle("");
      setdescription("");
      setShowModal(null);
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
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update task</h5>
            <button className="btn-close" aria-label="close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                id="floatigTextarea"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
              <label htmlFor="floatigTextarea">Description</label>
            </div>
            <div className='my-3'>
              <select
                className='form-select'
                value={isCompleted ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="" disabled>Select Status</option>
                <option value="true">Completed</option>
                <option value="false">Incomplete</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittodo;
