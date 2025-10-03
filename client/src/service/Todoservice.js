import axios from 'axios';
// get user token
const user= JSON.parse(localStorage.getItem('todoapp'))
axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;


//create todo
const createTodo=(data)=>{
    return axios.post('api/v1/todo/create',data)
}
//gettodo
const getAlltodo=(id)=>{
    return axios.post(`api/v1/todo/getAll/${id}`)
}
const updateTodo=(id,data)=>{
     return axios.patch(`/api/v1/todo/update/${id}`, data);
}
const deleteTodo=(id)=>{
    return axios.delete(`/api/v1/todo/delete/${id}`)
}
const TodoServices={createTodo,getAlltodo,updateTodo,deleteTodo}
export default TodoServices;
