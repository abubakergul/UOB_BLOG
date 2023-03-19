import React from "react";

const DisplayComments = ({ comments, createdAt, user }) => {
  // const propertyNames = Object.keys(user);
  return (
    <div className="comment-info">
      <div className="comment-heading">
        <h4 className="user-icon">{user}</h4> <p>{comments}</p>{" "}
        <p className="date">{createdAt}</p>
      </div>
    </div>
  );
};

export default DisplayComments;
