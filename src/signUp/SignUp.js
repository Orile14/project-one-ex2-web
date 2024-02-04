import React, { useState } from "react";
import MakeButton from "./MakeButton";
import buttonsData from "./buttons.json";
import "./SignUp.css"; 
import User from "./user";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Password: "",
    ConfirmPassword: "",
    img: null
  });

  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update state with the selected image
      setFormData({
        ...formData,
        img: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = buttonsData.every((button) => formData[button.id] !== '');
    if (formData.Password !== formData.ConfirmPassword) {
      alert("Password and Confirm Password must be the same");
      isValid = false;
    }  
    
    if (isValid) {
      const newUser = new User(formData.Name, formData.Password, formData.img);
      console.log("Form Data:", formData);
      console.log("New User:", newUser);
      console.log("All Users:", User.allUsers);
      navigate('/login');
    } else {
      alert("Please fill out all required fields before submitting.");
    }
  };

  return (
    <form className="signin-container" onSubmit={handleSubmit}>
      {buttonsData.map((button) => (
        <MakeButton
          key={button.id}
          id={button.id}
          label={button.label}
          type={button.type}
          value={formData[button.id] || ""}
          handleChange={(e) => handleInputChange(button.id, e.target.value)}
          required
        />
      ))}

      {/* File input for image selection */}
      <label htmlFor="imageInput">Select Image:</label>
      <input type="file" id="imageInput" onChange={handleImageChange} />

      {/* Render the selected image */}
      {formData.img && <img src={formData.img} alt="Selected" style={{ maxWidth: '50%', maxHeight: '100px' }} />}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
