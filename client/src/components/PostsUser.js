import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import moment from "moment";
const PostUser = ({ title, topic, description, image, createdAt, _id }) => {
  const { user, isLoading, setUpdatePost, deletePost } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <div className="posts">
      <h3 className="title">{title}</h3>

      <img
        className="img-post"
        src={
          image ||
          "https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        }
      />
      <div className="post-info">
        <p className="description">Description: {description}</p>
        <p>Topic : {topic}</p>
        <p>Created At : {date}</p>
        <p>Created By : {user.name}</p>
      </div>
      <div className="post-controllers">
        <Link to="/createPost" onClick={() => setUpdatePost(_id)}>
          <GrUpdate className="post-update" />
        </Link>
        <MdDelete onClick={() => deletePost(_id)} className="post-delete" />
      </div>
    </div>
  );
};

export default PostUser;
