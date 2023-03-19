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
  UPLOAD_IMAGE_BEGIN,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CLEAR_VALUES,
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
  GET_COMMENTS_BEGIN,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  CLOSE_MODAL,
} from "./action";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      isLoading: false,
      alertText: "Please provide all value",
      alertType: "danger",
      showAlert: true,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      user: action.payload.user,
      token: action.payload.token,
      alertType: "success",
      alertText: "User created redirecting",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      user: action.payload.user,
      token: action.payload.token,
      alertType: "success",
      alertText: "User logged in...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      user: "",
      token: "",
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value, // it will dynamically access the property by name
    };
  }

  if (action.type === HANDLE_CHANGE_IMAGE) {
    return {
      ...state,
      files: action.payload.files, // it will dynamically access the property by name
      isFileSelect: true,
    };
  }

  if (action.type === UPLOAD_IMAGE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPLOAD_IMAGE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Image updated..",
      image: action.payload.image,
    };
  }
  if (action.type === UPLOAD_IMAGE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isUpdating: false,
      post: "",
      comments: "",
      title: "",
      topic: "IT",
      description: "",
      image: "",
      files: "",
    };
    return { ...state, ...initialState };
  }

  if (action.type === CREATE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Post Created..",
    };
  }
  if (action.type === CREATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === SET_UPDATE_POST) {
    const post = state.myPosts.find((post) => post._id === action.payload.id);
    const { _id, title, topic, description, image } = post;
    return {
      ...state,
      isUpdating: true,
      post: _id,
      title,
      topic,
      description,
      image,
    };
  }
  if (action.type === DELETE_POST_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Post Updated!",
    };
  }
  if (action.type === UPDATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ALL_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_ALL_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
      totalPosts: action.payload.totalPosts,
    };
  }
  if (action.type === GET_MY_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_MY_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      myPosts: action.payload.myPosts,
      myTotalPosts: action.payload.myTotalPosts,
    };
  }

  if (action.type === "DELETE_IMAGE") {
    return {
      ...state,
      image: "",
      files: "",
    };
  }

  if (action.type == CREATE_REVIEW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_REVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Review Created..",
    };
  }
  if (action.type === CREATE_REVIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      isModelOpen: !state.isModelOpen,
    };
  }

  if (action.type === SET_COMMENT_POST) {
    const post = state.posts.find((post) => post._id === action.payload.id);
    const { _id, title, topic, description, image } = post;
    return {
      ...state,
      isUpdating: true,
      post: _id,
      title,
      topic,
      description,
      image,
    };
  }

  if (action.type === GET_COMMENTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reviews: action.payload.reviews,
      totalReviews: action.payload.totalReviews,
    };
  }
  if (action.type === GET_COMMENTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
      totalReviews: 0,
    };
  }

  throw new Error(`no action dispatch ${action.type}`);
};
export default reducer;
//remember post:false i change it into from this ""
