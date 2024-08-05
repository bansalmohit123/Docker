const User =require("../models/userModels");
const bcrypt=  require("bcryptjs");

exports.signup=async(req,res)=>{

    const {username,password}=req.body;
    
    try {
        const hasspass=await bcrypt.hash(password,12)
        const newUser = await User.create(
      {      username,
            password:hasspass}
        );
        req.session.user=newUser;
        res.status(201).json({
            status:'success',
            data:{
                user:newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail'
        })
    }
}
exports.login= async (req,res)=>{
    const {username,password}=req.body;
    try {

       const user =await User.findOne({username});

       if(!user){
        return res.status(400).json({
            status:'fail',
            message:'user not found'
        })
       }

       const iscorrect = await bcrypt.compare(password,user.password);
       if(iscorrect){

        req.session.user=user;
        res.status(201).json({
            status:'success',
           
        })
       }
       else{
        res.status(400).json({
            status:'fail',
            message:'Password Incorrect'
           
        })
       }

       
    } catch (error) {
        res.status(400).json({
            status:'fail'
        })
    }

}
