import React from "react";
import "../styles/components/loader.css";

const Loader = ({ text = "Loading..." }) => (
  <div className="loader">{text}</div>
);

export default Loader;

