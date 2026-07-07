import { useError } from "../helpers/useError.js";
import chatModelSchema from "../models/chat.model.schema.js";
const creatMessage = async (req, res, next) => {
  try {
    const { role, user, message, status, emoji, image } = req.body;
    const response = await chatModelSchema.create({
      role,
      user: req.user._id,
      message,
      emoji,
      image: req.file?.path 
      || "",
      status: "Not Read"
    });
    res
      .status(201)
      .json({ status: true, message: "User Sent Message", message: response });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};
const getUserMessages=async(req,res,next)=>{
    try {
        const response=await chatModelSchema.find().populate({
    path: "user",
    select: "email avatar name role"
  })
  .populate({
    path: "emoji.user",
    select: "email avatar name role"
  });
        return res.status(200).json({status:true,message:"All User Messages",messages:response})
    } catch (error) {
    return useError(res, 404, `${error}`);
    }
}
const updateMessage=async(req,res,next)=>{
  try {
const {id}=req.params;
    const response=await chatModelSchema.findByIdAndUpdate(id,{
      $push:{
       emoji:{
         type:req.body.type,
        user:req.user._id
       }
      }
    },{new:true})
    return res.status(200).json({status:true,message:"User Emoji Updated Successfully",message:response});
    
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
}
export { creatMessage,getUserMessages,updateMessage };
