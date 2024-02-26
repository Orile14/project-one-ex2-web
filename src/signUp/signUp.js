import React, { useState, useContext } from "react";
import MakeButton from "./makeButton";
import buttonsData from "./buttons.json";
import "./signUp.css";
import User from './user';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../themeContext/themeContext';


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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.Password !== formData.ConfirmPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }
  
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
  
    let base64Image = "";
    if (document.getElementById('imageInput').files[0]) {
      base64Image = await readFileAsBase64(document.getElementById('imageInput').files[0]);
    } else {
      alert("Please select an image.");
      return;
    }
  
    const userData = {
      username: formData.Name,
      password: formData.Password,
      nick: formData.NickName,
      img: base64Image
    };
  
    try {
      const response = await fetch('http://localhost:12345/api/users', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create user.');
    }
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
