import React from "react";
import loading4 from "../images/loading4.gif";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
      <div className="loading-container">
        <img className="loading-img" src={loading4} alt="Loading ..." />
      </div>
  );
}
