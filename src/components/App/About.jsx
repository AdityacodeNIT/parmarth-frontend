import React from "react";
import { FaRocket, FaHistory, FaUserAlt } from "react-icons/fa";
import myImage from "../../assets/images/myImage.png"; // Importing icons

const About = () => {
  return (
    <div className="about-us-section p-8 bg-gradient-to-r from-blue-50 via-rose-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        About Us
      </h1>
      <p className="text-lg mb-8 text-gray-700 text-center max-w-2xl mx-auto">
        Parmarth E-com is an emerging e-commerce platform dedicated to providing
        a comprehensive range of stationary items to customers across the globe.
      </p>

      {/* Mission Section */}
      <div className="mission-section flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
        <FaRocket className="text-red-600 text-4xl" />
        <div>
          <h2 className="text-3xl font-semibold text-red-700 mb-2">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Our mission is to simplify the process of purchasing stationary
            items by offering a user-friendly online platform that caters to the
            needs of individuals, educational institutions, and businesses
            alike.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="story-section flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
        <FaHistory className="text-red-600 text-4xl" />
        <div>
          <h2 className="text-3xl font-semibold text-red-700 mb-2">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Founded on the principles of quality, convenience, and customer
            satisfaction, Adhyan aims to revolutionize the way stationary items
            are purchased and delivered.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="team-member text-center">
          <img
            src={myImage} // Direct reference to the public folder
            alt="Team Member"
            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-blue-800"
          />
          <h3 className="text-xl font-semibold text-blue-800">
            Aditya Srivastav
          </h3>
          <p className="text-gray-600">Designer and Developer</p>
          <FaUserAlt className="text-blue-600 text-3xl mt-2" />
        </div>
      </div>
    </div>
  );
};

export default About;
