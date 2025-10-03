import todoModel from "../model/todomodel.js";

const todoController=async(req,res)=>{
   try {
    const {title,description,createdBy}=req.body
    if(!title || !description){
        return res.status(500).send({
            success:false,
            message:"pleas provide title desc" 
        })
    }
    const todo = new todoModel({title,description,createdBy})
    const result=await todo.save()
    res.status(201).send({
        success:true,
        message:"task created",
        result,
    })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in create todo api",
        error
    })
   }
};

//GET TODO

const gettodoController=async(req,res)=>{
    try{
        const {userId}= req.params
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"No user found "
            })
        }
        //FIND
    const todos=await todoModel.find({createdBy:userId})
    if(!todos){
        return res.status(404).send({
            success:true,
            message:"no todo"
        })
    }
    res.status(200).send({
        success:true,
        message:"your todo",
        todos
    })
    }
    catch(error){
         console.log(error);
    res.status(500).send({
        success:false,
        message:"error in getting",
        error,
    })
    }
};

//delete
const deletetodoController=async(req,res)=>{
try {
    const {id}=req.params
    if(!id){
        return res.status(404).send({
            success:"false",
            message:"no todo"
        })
    }
    const todo= await todoModel.findByIdAndDelete({_id:id});
    if(!todo){
        return res.status(404).send({
            success:false,
            message:"no task",
        })
    }
    res.status(200).send({
        success:true,
        message:"deleted",
    });
} catch (error) {
   console.log(error)
      res.status(500).send({
        success:false,
        message:"error in delete",
        error,
    }) 
}
};

//UPDATE 
const updatetodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Provide todo id",
      });
    }

    const data = req.body;

    // Use findByIdAndUpdate instead of findByIdAndDelete
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true } // returns the updated document
    );

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update",
      error,
    });
  }
};

export {todoController,gettodoController,deletetodoController,updatetodoController};