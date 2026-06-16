# social-post-platform
A full-stack social media platform built using the MERN stack. The application enables users to create, manage, search, and interact with posts through a secure JWT-based authentication system. It includes Redux Toolkit state management, pagination, responsive design, and secure cookie-based authentication.

## Live Demo

🌐 Live Demo: https://social-post-platform.vercel.app

## Features

- JWT Authentication
- Secure Cookie-Based Authentication
- Create, Edit and Delete Posts
- Image Upload and Storage using Cloudinary
- Search Functionality
- Pagination
- User Profile Management
- Redux Toolkit State Management
- Responsive Design

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Services

- Cloudinary (Image Storage & Management)  

## Screenshots

### Login Page
![Login Page](./Screenshots/Login-page.png)

### User Dashboard
![Dashboard](./Screenshots/Dashboard.png)

### All Posts
![All Posts](./Screenshots/All-posts.png)

### Create Post
![Create Post](./Screenshots/create-post.png)

### Post Details & Comments
![Comments](./Screenshots/Post-Details-and-Comments.png)

## Folder Structure

```text
social-post-platform/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Store/
│   │   └── App.css
│   │
│   ├── public/
│   ├── package.json
│   └── dist/
│
└── README.md
```

## Installation

### Clone Repository

git clone ...

### Frontend

npm install
npm run dev

### Backend

npm install
npm start

## Future Enhancements

- Real-time notifications
- Follow/Unfollow users
- Real-time chat

## Author

Ritik Yadav
