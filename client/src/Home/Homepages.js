import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar.js';
import Popmodal from '../layout/popmodal.js';
import TodoServices from '../service/Todoservice.js';
import Card from "../components/Card";

const Homepages = () => {

  const [showModal,setShowModal]=useState(false);
  const [search,setsearch]= useState("");
  const[title, setTitle]=useState("");
  const[description,setdescription]=useState("");
  const [allTask,setallTask]=useState([]);

  const openModalhandler=()=>{
    setShowModal(true);
  };

  const handleSearch=(e)=>{
    const query=e.target.value
    const filterList=allTask?.filter(item=>item.title.toLowerCase().match(query.toLowerCase()));
    console.log("filter",filterList);
    setsearch(query);
    if(query && filterList.length>0){
      setallTask(filterList && filterList)
    } else{
      getusertask();
    }
  };
  //get user todos
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
 getusertask();
},[])
  return (
    <>
   <Navbar/>
   <div className='container'>
    <div className='add-task'>
      
      <h2 className='task'>Your Task</h2>
      <input type="search" placeholder=' Search your task' value={search} onChange={handleSearch}/>
      <button onClick={openModalhandler}>create</button>
    </div>
{allTask && <Card allTask={allTask} getusertask={getusertask}/>}
    <Popmodal 
    showModal={showModal} 
    setShowModal={setShowModal}
    title={title}
    setTitle={setTitle}
    description={description}
    setdescription={setdescription}
    getusertask={getusertask}
    />
   </div>

    </>
  )
}

export default Homepages;
