const express = require("express");

const postController = require("../controllers/postController");
const protect =require("../Middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect,postController.getAllposts)
  .post(protect,postController.createPost);

router
  .route("/:id")
  .get(protect,postController.getOneposts)
  .patch( protect,postController.updateposts)
  .delete(protect,postController.deleteposts);


  module.exports=router;