import React from "react";
import "./Card.css"; // Assuming you are using an external CSS file.

const Card = ({id,title,tag} ) => {
  
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <img
          className="card-avatar"
          src="https://via.placeholder.com/40" // Replace with actual avatar URL
          alt="User avatar"
        />
      </div>
      <div className="card-title-container">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-footer">
        <div className="card-status">
          <span className="status-label">{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
