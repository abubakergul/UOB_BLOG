import {
  Landing,
  Error,
  CreatePost,
  Register,
  PostsContainer,
  PostsContainerUser,
  ProtectedRoute,
} from "./pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/posts" element={<PostsContainer />}></Route>
        <Route
          path="/createPost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/myPosts" element={<PostsContainerUser />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
