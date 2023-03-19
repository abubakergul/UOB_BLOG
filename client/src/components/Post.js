import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import moment from "moment";
import { Comments } from "./index";
const Post = ({ title, topic, user, description, image, createdAt, _id }) => {
  const [readMore, setReadMore] = useState(false);
  const { isModelOpen, isLoading, openModal, setCommentPost } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <div className="posts">
      <BiCommentDetail
        className="btn-comment"
        onClick={() => {
          openModal();
          setCommentPost(_id);
        }}
      />
      <h3 className="title">{title}</h3>

      <img
        className="img-post"
        src={
          image ||
          "https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        }
      />
      <div className="post-info">
        {/* <p className="description">Description: {description}</p> */}

        <p className="description">
          Description:{" "}
          {readMore ? description : `${description.substring(0, 100)}...`}
          <button onClick={() => setReadMore(!readMore)} className="read-more">
            {readMore ? "show less" : "readmore"}
          </button>
        </p>

        <p>Topic : {topic}</p>
        <p>Created At : {date}</p>
        <p>Created By : {user}</p>
      </div>
    </div>
  );
};

export default Post;
