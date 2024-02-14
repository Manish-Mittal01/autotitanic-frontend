import React from "react";
import successGif from "../../Assets/Images/successGif.gif";
import { Link } from "react-router-dom";

export default function SuccessScreen() {
  return (
    <div className="text-center h-100">
      <img src={successGif} className="successGif bg-white" />

      <h5>Your post has been sent for review</h5>
      <h6>It will go live in 24 hours once approved</h6>
      <p className="mb-5">
        <Link to="/home">Go to Home</Link>
      </p>
    </div>
  );
}
