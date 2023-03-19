import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createReview,
  getAllReviews,
  getSingleProductReviews,
  // getSingleReview,
  // updateReview,
  // deleteReview,
} from "../controllers/reviewController.js";

router.route("/").post(auth, createReview).get(getAllReviews);

router.route("/:id").get(getSingleProductReviews);
// .get(getSingleReview)
//   .patch(auth, updateReview)
//   .delete(auth, deleteReview);

export default router;
