import React from "react";
// this functiion creates the input fields for the form
const MakeButton = ({ id, label, type, value, handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type} 
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={`${label}`}
        required
      />
    </div>
  );
};

export default MakeButton;
