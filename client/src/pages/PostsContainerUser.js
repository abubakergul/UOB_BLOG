import { Navbar, PostUser } from "../components";
import "../assets/css/PostsContainer.css";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

const PostsContainerUser = () => {
  const { user, getMyPosts, posts, myPosts, myTotalPosts } = useAppContext();
  useEffect(() => {
    if (user) {
      getMyPosts();
    }
  }, []);
  return (
    <section>
      <Navbar />
      {user && <h2 className="title">{myTotalPosts} Posts</h2>}
      <main className="main-container">
        {user &&
          myPosts.map((post) => {
            return <PostUser key={post._id} {...post} />;
          })}
      </main>
    </section>
  );
};

export default PostsContainerUser;
