import express from "express";
import auth from "../middleware/auth.js";
import {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  uploadImage,
  getMyPost,
} from "../controllers/postController.js";
const router = express.Router();
router.route("/").post(auth, createPost).get(getAllPost);
router.route("/uploadImage").post(auth, uploadImage);

router.route("/myPosts").get(auth, getMyPost);
router
  .route("/:id")
  .delete(auth, deletePost)
  .patch(auth, updatePost)
  .get(auth, getPost);
export default router;
