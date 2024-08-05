const Post = require("../models/postModel");


exports.getAllposts= async(req,res,next)=>{
    try {
        const posts = await Post.find();
        res.status(200).json({
            status:'success',
            results:posts.length,
            data:{
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
        })
    }
}

exports.getOneposts= async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status:'success',
            
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
        })
    }
}

exports.createPost= async(req,res,next)=>{
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status:'success',
            
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
        })
    }
}
exports.updateposts= async(req,res,next)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true,
        });
        res.status(200).json({
            status:'success',
            
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
        })
    }
}
exports.deleteposts= async(req,res,next)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'success',
            
            
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
        })
    }
}