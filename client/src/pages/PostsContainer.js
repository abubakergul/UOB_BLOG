import { Comments, Navbar, Post } from "../components";
import "../assets/css/PostsContainer.css";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

const PostsContainer = () => {
  const { isModelOpen, getAllPosts, posts, totalPosts, search } =
    useAppContext();
  useEffect(() => {
    getAllPosts();
  }, [search]);
  return (
    <section>
      <Navbar />
      {isModelOpen && <Comments />}
      <h2 className="title">{totalPosts} Posts</h2>
      <main className="main-container">
        {posts.map((post) => {
          return <Post key={post._id} {...post} />;
        })}
      </main>
    </section>
  );
};

export default PostsContainer;
