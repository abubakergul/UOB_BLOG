import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import cloudinarModule from "cloudinary";
import checkPermissions from "../utils/checkPermissions.js";
let public_id;

const createPost = async (req, res) => {
  const { title, topic, description, image } = req.body;

  if (!title || !topic || !description) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.user = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getAllPost = async (req, res) => {
  const { search } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  let result = Post.find(queryObject);

  const posts = await result;
  res.status(StatusCodes.OK).json({ posts, totalPosts: posts.length });
};

const getMyPost = async (req, res) => {
  const myPosts = await Post.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ myPosts, myTotalPosts: myPosts.length });
};

const getPost = async (req, res) => {
  res.send("get Post");
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, topic, description, image } = req.body;
  if (!title || !topic || !description) {
    throw new BadRequestError("Please provide all values");
  }

  const post = await Post.findOne({ _id: postId });
  if (!post) throw new NotFoundError(`NO post with id ${postId}`);
  checkPermissions(req.user, post.user);
  const updatePost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatePost });
};
const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError("no post found");
  }
  checkPermissions(req.user, post.user);
  await post.remove(); //using the instance method
  res.status(StatusCodes.OK).json({ msg: "post deleted" });
};

const uploadImage = async (req, res) => {
  const cloudinary = cloudinarModule.v2;
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  public_id = result.public_id;
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

export {
  createPost,
  getAllPost,
  getMyPost,
  getPost,
  updatePost,
  deletePost,
  uploadImage,
};
