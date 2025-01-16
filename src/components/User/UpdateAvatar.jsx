import React from "react";
import axios from "axios";
import { useState } from "react";

const UpdateAvatar = () => {
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateAvatar`,
        formDataToSend,



        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (!response) {
        console.error("check the image  it is unable to update");
      }
      if (response.status >= 200 && response.status < 300) {
        // document.cookie = `accessToken=${response.data.data.accessToken}; path=/`;
        getUserDetail(response.data);

        navigate("/user");
      }
    } catch (error) {
      console.error("Issue in updates", error);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <div>
        <input
          type="file"
          name="avatar"
          //   value={formData.avatar}
          onChange={handleFileChange}
          required
          className="mb-4 p-2 w-full border-2 border-rose-400 rounded-md transition duration-200 bg-gray-600  focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-bold rounded-md transition duration-200 hover:bg-rose-700"
        >
          Change Avatar
        </button>
      </div>
    </form>
  );
};

export default UpdateAvatar;
