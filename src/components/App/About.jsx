import React, { useState } from "react";
import { FaRocket, FaHistory, FaUserAlt, FaPhone } from "react-icons/fa";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import myImage from "../../assets/images/myImage.png"; // Importing icons

const About = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen((prev) => !prev);
  };

  return (
    <div className="about-us-section p-6 md:p-8 bg-gradient-to-r from-blue-50 via-rose-50 to-blue-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">
        About Us
      </h1>
      <p className="text-lg mb-8 text-gray-700 text-center max-w-3xl mx-auto">
        Parmarth E-com is an emerging e-commerce platform dedicated to providing
        a comprehensive range of stationary items to customers across the globe.
      </p>

      {/* Mission Section */}
      <div className="mission-section flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
        <FaRocket className="text-red-600 text-5xl md:text-6xl transform transition-transform duration-300 hover:scale-110" />
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
        <FaHistory className="text-red-600 text-5xl md:text-6xl transform transition-transform duration-300 hover:scale-110" />
        <div>
          <h2 className="text-3xl font-semibold text-red-700 mb-2">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Founded on the principles of quality, convenience, and customer
            satisfaction, Parmarth E-com aims to revolutionize the way
            stationary items are purchased and delivered.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <div className="team-member text-center">
          <img
            src={myImage}
            alt="Aditya Srivastav, Designer and Developer"
            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-blue-800"
          />
          <h3 className="text-xl font-semibold text-blue-800">
            Aditya Srivastav
          </h3>
          <p className="text-gray-600">Designer and Developer</p>
          <FaUserAlt className="text-blue-600 text-3xl mt-2" />
        </div>
      </div>

      {/* Contact Icon Section */}
      <div className="contact-section flex justify-center items-center mt-2 relative">
        <button
          onClick={toggleContact}
          className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transform transition duration-200 ease-in-out hover:scale-110"
        >
          <FaPhone size={24} />
        </button>

        {/* Dropdown Menu for Social Links */}
        {isContactOpen && (
          <div className="absolute bg-white shadow-lg rounded-md p-4 flex gap-6 flex-wrap justify-center md:gap-8 w-40 md:w-auto">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-all duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-all duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition-all duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
