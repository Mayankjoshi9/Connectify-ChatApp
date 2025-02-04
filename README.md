

# MERN Chat Application
[Visit Now](https://connectify-chatapp-wg2o.onrender.com)

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO.

## Features

- Real-time messaging with Socket.IO
- User authentication and authorization (JWT)
- Private and group chat functionality
- Infinite scrolling for chat history
- Responsive design

## Tech Stack

- **Frontend:** React, Redux, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO
- **Database:** MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ChatApp.git
   cd ChatApp
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following environment variable:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

### Running the Application

- The backend server will run on `http://localhost:5000`.
- The frontend server will run on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Start chatting in real-time!

## Overall Project Structure

```
mern-chat-app/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   │   └── chatController.js
│   ├── models/
│   │   └── User.js
│   │   └── Message.js
│   ├── routes/
│   │   └── authRoutes.js
│   │   └── chatRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── server.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a pull request.

## Acknowledgments

- [Socket.IO](https://socket.io/)
- [MERN Stack](https://www.mongodb.com/mern-stack)
- [JWT](https://jwt.io/)


