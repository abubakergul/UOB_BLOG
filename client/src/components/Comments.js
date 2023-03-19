import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Comments.css";
import { useAppContext } from "../context/appContext";
import Alert from "./Alert";
import { DisplayComments, FormRow } from "./index";

const Comments = () => {
  const {
    user,
    isModalOpen,
    openModal,
    handleChangeInput,
    comments,
    displayAlert,
    createReview,
    post,
    showAlert,
    getPostComments,
    reviews,
    totalReviews,
  } = useAppContext();

  useEffect(() => {
    getPostComments();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChangeInput({ name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!comments || !post) {
      displayAlert();
      return;
    }
    createReview();
  };

  return (
    <section className={`${isModalOpen ? "comments " : "comments show-modal"}`}>
      <div class="modal ">
        {showAlert && <Alert />}
        <button class="close-modal" onClick={() => openModal()}>
          &times;
        </button>
        <main className="main-comment">
          <form className="form form-comments">
            <h2> {totalReviews} Comments</h2>
            <FormRow
              type="text"
              name="post"
              value={post}
              handleChange={handleChange}
              disabled={true}
            />
            <FormRow
              type="text"
              name="comments"
              handleChange={handleChange}
              value={comments}
            />
            {!user && (
              <div className="">
                <Link className="btn" to="/register">
                  Add comment
                </Link>
              </div>
            )}

            {user && (
              <button type="submit" onClick={onSubmit} className="btn">
                Add comment
              </button>
            )}
          </form>
          <div className="display-comments">
            {totalReviews > 0 &&
              reviews.map((review) => {
                return (
                  <DisplayComments
                    key={review._id}
                    user={review.user.name}
                    comments={review.comments}
                    createdAt={review.createdAt}
                  />
                );
              })}{" "}
            {totalReviews === 0 && <h3>No comments</h3>}
          </div>
        </main>
        {/* <h4>No comments yet...</h4> */}
      </div>
      <div class="overlay "></div>
    </section>
  );
};

export default Comments;
// you need product id
