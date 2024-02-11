import React, { useState, useContext } from "react";
import MakeButton from "./MakeButton";
import buttonsData from "./buttons.json";
import "./SignUp.css";
import User from "./user";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../ThemeContext/ThemeContext';

const SignUp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); 
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
    <div>
      <button className="Toggle" onClick={toggleTheme}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'} 
      </button>
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

        <label id="label" htmlFor="imageInput">Select Image:</label>
        <input type="file" id="imageInput" onChange={handleImageChange} />

        {formData.img && <img src={formData.img} alt="Selected" style={{ maxWidth: '50%', maxHeight: '100px' }} />}

        <button id= "submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
