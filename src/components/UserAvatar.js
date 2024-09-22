import React, { useState } from "react";
import axios from "axios";
const UserAvatar = () => {
  const [formData, setFormData] = useState({
    avatar: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("avatar", formData.avatar);
    try {
      const response = await axios.post("", formData);
      if(response){
        
      }
    } catch (error) {}
  };
  return (
    <div>
      <form>
        <button type="file" name="avatar" onClick={handleFileChange}>
          Chnage Profile Picture{" "}
        </button>
      </form>
    </div>
  );
};

export default UserAvatar;
