# 🛍️ E-commerce Platform

A comprehensive, full-stack e-commerce solution built with a modern technology stack. This platform provides a seamless shopping experience for users and a powerful management interface for administrators.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)

---

## ✨ Features

###  Frontend (Customer Facing)
-   **Product Discovery:** Browse latest collections and best-selling items.
-   **Detailed Product Pages:** View product details, images, and related products.
-   **Search:** Find products with a powerful search bar.
-   **Shopping Cart:** Add, remove, and manage items in the cart.
-   **User Authentication:** Secure user login and registration.
-   **Order Management:** Place orders and view order history.
-   **Static Pages:** About Us and Contact Us sections.

### Admin Panel
-   **Product Management:** Add, view, and manage all products in the store.
-   **Order Fulfillment:** View and manage customer orders.
-   **Secure Login:** Separate, secure login for administrators.

---

## 🏗️ Project Architecture

The project is a monorepo composed of three distinct parts:

-   **`frontend/`**: A React-based client application for customers, built with Vite and styled with Tailwind CSS.
-   **`backend/`**: A Node.js and Express.js server that provides a RESTful API for data and authentication.
-   **`admin/`**: A separate React application for store administrators, also built with Vite and Tailwind CSS.

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Setup the Backend:**
    -   Navigate to the backend directory: `cd backend`
    -   Install dependencies: `npm install`
    -   Create a `.env` file and add the required environment variables (see [Configuration](#-configuration)).
    -   Start the server: `npm run server`

3.  **Setup the Frontend:**
    -   Navigate to the frontend directory: `cd ../frontend`
    -   Install dependencies: `npm install`
    -   Start the development server: `npm run dev`

4.  **Setup the Admin Panel:**
    -   Navigate to the admin directory: `cd ../admin`
    -   Install dependencies: `npm install`
    -   Start the development server: `npm run dev`

After following these steps, the applications will be available at:
-   **Frontend:** `http://localhost:5173` (or another port if 5173 is in use)
-   **Admin Panel:** `http://localhost:5174` (or another port if the frontend's port is in use)
-   **Backend API:** `http://localhost:4000`

---

## ⚙️ Configuration

The backend requires a `.env` file with credentials for various services. Create a file named `.env` in the `backend/` directory and add the following:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT
JWT_SECRET=your_jwt_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Other configurations as needed...
```

---

## API Endpoints

The backend exposes the following RESTful API routes:

-   `/api/products`: For all product-related operations (GET, POST, DELETE).
-   `/api/users`: For user registration and login.
-   `/api/cart`: For managing the user's shopping cart.

---

## 📜 Available Scripts

Each application (`frontend`, `backend`, `admin`) has the following scripts available:

### Frontend / Admin
-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the source code.
-   `npm run preview`: Previews the production build locally.

### Backend
-   `npm start`: Starts the server in production mode.
-   `npm run server`: Starts the server with `nodemon` for development, enabling auto-reloading.