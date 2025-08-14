# 🚀 AI Study Assistant

![Vite](https://img.shields.io/badge/Vite-6.3.5-blueviolet.svg?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-green.svg?style=for-the-badge&logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg?style=for-the-badge&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.8-teal.svg?style=for-the-badge&logo=tailwindcss)

This is a full-stack AI-powered study assistant designed to help users learn more effectively. The application features a modern and responsive frontend built with React and Vite, coupled with a powerful Node.js and Express backend that serves the AI functionalities.

The backend is structured to support dedicated routes for user management (`/user`) and AI-powered features (`/ai`).

## ✨ Tech Stack

### Frontend
- **Build Tool**: Vite
- **Framework**: React
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: GSAP
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose connection)
- **Middleware**: `cors`, `cookie-parser`, `dotenv`

## 🏁 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
-   Node.js (v18 or newer recommended)
-   npm (Node Package Manager)
-   MongoDB (either a local instance or a cloud-based service like MongoDB Atlas)

### Installation & Configuration

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Nand24/AI-Study-Assistant.git]
    cd your-AI-Study-Assistant
    ```

2.  **Install dependencies**
    This project uses a single `package.json` file for both frontend and backend dependencies.
    ```sh
    npm install
    ```

3.  **Create an environment file**
    Create a `.env` file in the root directory of the project. Add the following configuration variables. This file is ignored by Git by default.

    ```env
    # Port for the backend server
    PORT=8000

    # Your MongoDB connection string
    MONGO_URI="your_mongodb_connection_string"
    ```

## 🖥️ Usage

This project contains a frontend client and a backend server that must be run concurrently in separate terminal sessions.

### Available Scripts

#### Backend
-   **Start the backend server:**
    This command starts the Express server, which will listen on the port defined in your `.env` file.
    ```sh
    node server.js
    ```

#### Frontend
The following scripts are available for managing the frontend application:
-   **Run the frontend in development mode:**
    Starts the Vite development server with Hot Module Replacement (HMR).
    ```sh
    npm run dev
    ```

-   **Build the frontend for production:**
    Bundles the React app for production into the `dist` folder.
    ```sh
    npm run build
    ```

-   **Lint the project files:**
    Runs ESLint to analyze the code for potential errors.
    ```sh
    npm run lint
    ```

-   **Preview the production build:**
    Serves the production-ready files from the `dist` folder.
    ```sh
    npm run preview
    ```

## 🗂️ Project Structure

The project is organized in a monorepo style with key configuration files in the root directory.


.
├── src/               # Contains all frontend source code (React components)
├── app.js             # Core Express application setup and middleware
├── server.js          # Backend server entry point
├── package.json       # Lists all dependencies and project scripts
├── vite.config.js     # Vite configuration file for the frontend
├── tailwind.config.js # Tailwind CSS configuration
├── eslint.config.js   # ESLint configuration for code linting
├── index.html         # The HTML entry point for the Vite application
└── .gitignore         # Specifies files and folders to be ignored by Git


## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the project, please fork the repository and create a pull request, or open an issue with the "enhancement" tag.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

