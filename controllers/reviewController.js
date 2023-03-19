import Review from "../models/Review.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createReview = async (req, res) => {
  const { post: postId } = req.body;

  const isValidPost = await Post.findOne({ _id: postId });

  if (!isValidPost) {
    throw new NotFoundError(`No post with id : ${postId}`);
  }

  const alreadySubmitted = await Review.findOne({
    post: postId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError("Already submitted review for this post");
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "post",
      select: "title",
    });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};
// const updateReview = async (req, res) => {
//   const { id: reviewId } = req.params;
//   const { rating, title, comment } = req.body;

//   const review = await Review.findOne({ _id: reviewId });

//   if (!review) {
//     throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
//   }

//   checkPermissions(req.user, review.user);

//   review.rating = rating;
//   review.title = title;
//   review.comment = comment;

//   await review.save();
//   res.status(StatusCodes.OK).json({ review });
// };
// const deleteReview = async (req, res) => {
//   const { id: reviewId } = req.params;

//   const review = await Review.findOne({ _id: reviewId });

//   if (!review) {
//     throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
//   }

//   checkPermissions(req.user, review.user);
//   await review.remove();
//   res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
// };

const getSingleProductReviews = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Review.findOne({ post: postId });
  if (!post) {
    throw new NotFoundError(`No Comments for this post`);
  }

  const reviews = await Review.find({ post: postId }).populate({
    path: "user",
    select: "name",
  });

  res.status(StatusCodes.OK).json({ reviews, totalReviews: reviews.length });
};

export {
  createReview,
  getAllReviews,
  // getSingleReview,
  // updateReview,
  // deleteReview,
  getSingleProductReviews,
};
