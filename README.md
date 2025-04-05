```markdown
# Adyog E-commerce Platform

A comprehensive e-commerce platform for stationery and office supplies, built with React, Tailwind CSS, and Vite.  This application features user authentication, product browsing and purchasing, a shopping cart, wishlist functionality, order management, admin panel, and seller management.


## Description

Adyog is a fully functional e-commerce application designed to provide a seamless online shopping experience for stationery and office supplies.  The application includes features for both customers and administrators, allowing for easy product management, order tracking, and user account management.  The application also supports seller accounts.


## Features

* **User Authentication:** Secure user registration and login.
* **Product Browsing:** Browse products by category and search functionality.
* **Shopping Cart:** Add, remove, and update items in the shopping cart.
* **Wishlist:** Save desired products to a wishlist for later purchase.
* **Order Management:** View order history and details, including tracking information.
* **Payment Gateway Integration:** Secure payment processing using Razorpay.
* **Admin Panel:**  Manage users, products, and orders. Includes functionalities to delete, update and add products/users. Seller Approval/Rejection capabilities.
* **Seller Management:**  Seller registration, login, and product management.
* **Search Functionality:** Search for products by name.
* **Responsive Design:**  Adapts to different screen sizes for optimal viewing on various devices.
* **Server-Side Rendering (potential):** Server-side rendering capabilities based on the `vercel.json` configuration.
* **API Integration:** Integrates with a backend API (URL not specified in the provided code).
* **KeepAlive:** Server-side calls to prevent session expiry.
* **AI-Powered Descriptions:** Generation of product descriptions using Google's Gemini AI API.


## Setup/Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd adyog
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```  or  ```bash
   yarn install
   ```

4. **Set Environment Variables:** Create a `.env` file in the project root and add the necessary API URL and API KEY.

    ```
    VITE_API_URL=your_api_url_here
    VITE_API_KEY=your_api_key_here
    ```


## Usage Instructions

1. **Start the development server:**
   ```bash
   npm run dev
   ```  or  ```bash
   yarn dev
   ```

2. **Open your browser and navigate to:** `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```  or  ```bash
   yarn build
   ```

4. **Serve the production build:**
   ```bash
   npm run serve
   ```  or  ```bash
   yarn serve
   ```

## Technologies Used

* React
* React Router DOM
* Tailwind CSS
* Vite
* TypeScript
* Axios
* Razorpay
* @google/generative-ai (Google Gemini AI)
* @vercel/speed-insights
* PostCSS
* Autoprefixer
* Font Awesome


## Author

*Aditya Srivastav*

```
