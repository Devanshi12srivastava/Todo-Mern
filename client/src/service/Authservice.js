import axios from 'axios';

const registerUser = (data) => axios.post("/api/v1/user/register", data);
const loginUser = (data) => axios.post("/api/v1/user/login", data);

const AuthService = { registerUser, loginUser };
export default AuthService;
