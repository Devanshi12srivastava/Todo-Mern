import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../service/Todoservice";

const Popmodal = ({
  title,
  setTitle,
  description,
  setdescription,
  showModal,
  setShowModal,
  getusertask,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };
// submit

const handleSubmit=async()=>{
    try{
        const userData=JSON.parse(localStorage.getItem("todoapp"))
        const createdBy=userData && userData.user.id
        const data={title,description,createdBy}

        if(!title || !description){
            return toast.error("provide")
        }
        const todo= await TodoServices.createTodo(data)
        setShowModal(false)
         getusertask();
        toast.success("completed")
        setTitle("")
        setdescription("")

    }
    catch(error){
         toast.error(
        error.response?.data?.message || // backend message if available
        error.message ||                 // Axios message
        "Something went wrong"           // fallback
      );
        
    }
}
  return (
    <>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
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
                <div>
                  <select>
                    <option>Select Status</option>
                    <option>Completed</option>
                    <option>Incomplete</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popmodal;
