import usermodel from "../model/userModel.js";   
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const registerController = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!username||!email||!password) {
      return res.status(400).send({
        success: false,
        message: "Please provide valid info",
      });
    }

    // check existing user
    const existingUser = await usermodel.findOne({ email });
    console.log("Checking user:", email);

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
const salt= await bcrypt.genSalt(10);
const hashpassword= await bcrypt.hash(password,salt);
    const newUser = new usermodel({ username, email, password:hashpassword });
    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Register API error",
      error,
    });
  }
};
//LOGIN
const loginController=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user= await usermodel.findOne({email})
        //validation
        if(!user){
            return res.status(404).send({
                success:true,
                message:'Invalid username or password',

            })
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
          return res.status(500).send({
            success:false,
            message:"inavlid credentials"
          })
        }
        //token

        const token= await JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'})

        res.status(200).send({
            success:true,
            message:'login successfully',
            token,
            user:{
              id:user._id,
              email:user.email,
              username:user.username,
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"login api",
            error
        })
    }
};

export {registerController,loginController};
