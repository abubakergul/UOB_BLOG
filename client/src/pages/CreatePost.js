import React from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { Alert, Navbar } from "../components/index.js";
import { FormRow, FormRowSelect } from "../components";
import "../assets/css/CreatePost.css";
import { useState } from "react";
import { useAppContext } from "../context/appContext";

const CreatePost = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    createPost,
    token,
    topicOptions,
    handleChangeInput,
    handleChangeImage,
    uploadImage,

    title,
    topic,
    description,
    image,
    files,
    isFileSelect,
    isUpdating,
    updatePost,
    clearValues,
  } = useAppContext();

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
        return;
      }
      return Promise.reject(error);
    }
  );

  const onChangeImage = async (e) => {
    const files = e.target.files[0];
    handleChangeImage({ files });
    console.log(files.name);
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    if (isFileSelect) {
      uploadImage();
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChangeInput({ name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !topic || !description) {
      displayAlert();
      return;
    }
    // if (isFileSelect) {
    //   uploadImage();
    // }
    if (isUpdating) {
      updatePost();
      return;
    }
    createPost();
  };

  const resetFileInput = (e) => {
    e.preventDefault();
    let inputImage =
      document.querySelector(".image-container").firstChild.lastChild;
    inputImage.value = null;
  };

  return (
    <>
      <Navbar />
      <section className="create-post">
        <form className="form">
          <h3> {isUpdating ? "Update Post" : "Create Post"} </h3>
          {showAlert && <Alert />}
          <FormRow
            handleChange={handleChange}
            name="title"
            type="text"
            value={title}
          />
          <FormRowSelect
            handleChange={handleChange}
            name="topic"
            type="text"
            list={topicOptions}
            value={topic}
          />
          <FormRow
            handleChange={handleChange}
            name="description"
            type="text"
            value={description}
          />
          <div className="image-container">
            <FormRow
              handleChange={onChangeImage}
              type="file"
              name="image"
              accept="image/*"
            />
            {isFileSelect && (
              <div className="image-controller">
                <button className="btn-upload" onClick={uploadHandler}>
                  Upload
                </button>

                <button className="btn-remove" onClick={resetFileInput}>
                  Remove
                </button>
              </div>
            )}
          </div>

          <button type="submit" onClick={onSubmit} className="btn btn-create">
            Submit
          </button>

          <button
            className="btn clear"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            Clear values
          </button>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
