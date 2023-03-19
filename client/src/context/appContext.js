import React, { useContext, useReducer } from "react";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  HANDLE_CHANGE,
  HANDLE_CHANGE_IMAGE,
  CLEAR_VALUES,
  UPLOAD_IMAGE_BEGIN,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  UPDATE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  SET_UPDATE_POST,
  DELETE_POST_BEGIN,
  GET_ALL_POST_BEGIN,
  GET_ALL_POST_SUCCESS,
  GET_MY_POST_BEGIN,
  GET_MY_POST_SUCCESS,
  CREATE_REVIEW_BEGIN,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  OPEN_MODAL,
  SET_COMMENT_POST,
  CLOSE_MODAL,
  GET_COMMENTS_BEGIN,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
} from "./action";
import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  title: "",
  topic: "IT",
  description: "",
  image: "",
  files: "",
  isFileSelect: false,
  post: false,
  isUpdating: false,
  topicOptions: [
    "IT",
    "Business",
    "Engineering",
    "others",
    "General Knowledge",
  ],
  posts: [],
  totalPosts: 0,
  myPosts: [],
  myTotalPosts: 0,
  search: "",
  comments: "",
  isModalOpen: false,
  reviews: [],
  totalReviews: 0,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        // logoutUser();
        return;
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token } = data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const handleChangeInput = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handleChangeImage = ({ files }) => {
    dispatch({ type: HANDLE_CHANGE_IMAGE, payload: { files } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const uploadImage = async () => {
    dispatch({ type: UPLOAD_IMAGE_BEGIN });
    const formData = new FormData();
    formData.append("image", state.files);
    try {
      const {
        data: {
          image: { src },
        },
      } = await authFetch.post(`/posts/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: { image: src } });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log("image not selected");
    }
  };

  const createPost = async () => {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const { title, topic, description, image } = state;
      await authFetch.post("/posts", { title, topic, description, image });
      dispatch({ type: CREATE_POST_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setUpdatePost = (id) => {
    dispatch({ type: SET_UPDATE_POST, payload: { id } });
  };

  const updatePost = async () => {
    dispatch({ type: UPDATE_POST_BEGIN });
    try {
      const { title, topic, description, image } = state;
      await authFetch.patch(`/posts/${state.post}`, {
        title,
        topic,
        description,
        image,
      });
      dispatch({ type: UPDATE_POST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return;
      }
      // dispatch({
      //   type: UPDATE_POST_ERROR,
      //   payload: { msg: error.response.msg },
      // });
    }
    clearAlert();
  };

  const deletePost = async (id) => {
    dispatch({ type: DELETE_POST_BEGIN });
    try {
      await authFetch.delete(`/posts/${id}`);
      getMyPosts();
    } catch (error) {
      loginUser();
    }
  };

  const getAllPosts = async () => {
    const { search } = state;
    dispatch({ type: GET_ALL_POST_BEGIN });
    let url = `/posts`;
    try {
      if (search) {
        url = url + `?search=${search}`;
      }
      const { data } = await authFetch.get(url);
      const { posts, totalPosts } = data;
      dispatch({
        type: GET_ALL_POST_SUCCESS,
        payload: { posts, totalPosts },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async () => {
    dispatch({ type: GET_MY_POST_BEGIN });
    try {
      const { data } = await authFetch.get("/posts/myPosts");
      const { myPosts, myTotalPosts } = data;
      dispatch({
        type: GET_MY_POST_SUCCESS,
        payload: { myPosts, myTotalPosts },
      });
    } catch (error) {
      if (error.response.status === 401) {
        // logoutUser();
        return;
      }
      console.log(error);
    }
  };

  const createReview = async () => {
    dispatch({ type: CREATE_REVIEW_BEGIN });
    try {
      const { post, comments } = state;
      await authFetch.post("/reviews", { post, comments });
      dispatch({ type: CREATE_REVIEW_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        // logoutUser();
        return;
      }
      dispatch({
        type: CREATE_REVIEW_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const setCommentPost = (id) => {
    dispatch({ type: SET_COMMENT_POST, payload: { id } });
  };
  const getPostComments = async () => {
    dispatch({ type: GET_COMMENTS_BEGIN });
    try {
      const { data } = await authFetch.get(`/reviews/${state.post}`);
      const { reviews, totalReviews } = data;
      console.log(reviews, totalReviews);
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: { reviews, totalReviews },
      });
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();

      console.log(error);
      return;
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        handleChangeInput,
        handleChangeImage,
        clearValues,
        uploadImage,
        createPost,
        setUpdatePost,
        updatePost,
        deletePost,
        getAllPosts,
        getMyPosts,
        createReview,
        openModal,
        setCommentPost,
        getPostComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
