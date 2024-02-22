import React, { useState, useContext } from "react";
import MakeButton from "./MakeButton";
import buttonsData from "./buttons.json";
import "./SignUp.css";
import User from './user';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../ThemeContext/ThemeContext';

const SignUp = () => {
  // Accessing theme and toggleTheme from ThemeContext using useContext hook
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Initialize formData state with default values
  const [formData, setFormData] = useState({
    Name: "",
    Password: "",
    ConfirmPassword: "",
    img: null
  });

  // Function to handle input changes
  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Function to handle image selection
  const handleImageChange = (event) => {
    // Check if the file is an image
    const file = event.target.files[0];
    if (file) {

      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        event.target.value = '';
        return;
      }

      // Update state with the selected image
      setFormData({
        ...formData,
        img: URL.createObjectURL(file)
      });
    }
  };
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }

    // Check if the image is selected
    if (!formData.img) {
      alert("Please select an image.");
      return;
    }

    const newUser = new User(formData.Name, formData.NickName, formData.Password, formData.img);
    navigate('/login');
  };

  // Render the SignUp component
  return (
    <div>
      {/* Button to toggle between dark and light mode */}
      <button className="Toggle" onClick={toggleTheme}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {/* Mapping through button data and rendering MakeButton component */}
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
        {/* Input field to select an image */}
        <label id="label" htmlFor="imageInput">Select Image:</label>
        <input type="file" id="imageInput" onChange={handleImageChange} />
        {/* Render the selected image if available */}
        {formData.img && <img src={formData.img} alt="Selected" style={{ maxWidth: '50%', maxHeight: '100px' }} />}
        {/* Submit button */}
        <button id="submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
