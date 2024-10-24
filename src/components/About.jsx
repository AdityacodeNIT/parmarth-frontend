import React from "react";

const About = () => {
  return (
    <div className="about-us-section justify-center text-center p-8 bg-gradient-to-r from-blue-50 via-rose-50 to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        About Us
      </h1>
      <p className="text-lg mb-4 text-gray-700">
        ई-Cart is an emerging e-commerce platform dedicated to providing a
        comprehensive range of stationary items to customers across the globe.
      </p>
      <h2 className="text-3xl font-semibold mt-6 text-red-700">Our Mission</h2>
      <p className="text-lg mb-4 text-gray-700">
        Our mission is to simplify the process of purchasing stationary items by
        offering a user-friendly online platform that caters to the needs of
        individuals, educational institutions, and businesses alike.
      </p>
      <h2 className="text-3xl font-semibold mt-6 text-red-700">Our Story</h2>
      <p className="text-lg mb-4 text-gray-700">
        Founded on the principles of quality, convenience, and customer
        satisfaction, Adhyan aims to revolutionize the way stationary items are
        purchased and delivered.
      </p>

      <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="team-member text-center">
          <img
            src="/assets/myImage.jpg" // Direct reference to the public folder
            alt="Team Member"
            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-blue-800"
          />
          <h3 className="text-xl font-semibold text-blue-800">
            Aditya Srivastav
          </h3>
          <p className="text-gray-600">Designer and Developer</p>
        </div>
      </div>
    </div>
  );
};

export default About;
