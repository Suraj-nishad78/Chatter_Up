# Chatter Up 💬

Chatter Up is a real-time chatting application built with **Node.js, Express.js, Socket.IO, and MongoDB**. It allows users to chat instantly, view connected users, see typing notifications, and access previously stored messages.

## ✨ Features

- Real-time messaging using Socket.IO
- Username-based chat joining
- Online users list with connected user count
- Typing indicators and join/leave notifications
- Message history stored in MongoDB
- User avatars and message timestamps
- Sound notification for incoming messages
- Responsive frontend for desktop and mobile

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.IO
- **Database:** MongoDB with Mongoose
- **Environment Variables:** dotenv
- **Frontend:** HTML, CSS, JavaScript

## 📁 Project Structure

```text
Chatter-Up/
├── public/
│   ├── index.html
│   ├── index.css
│   └── script.js
├── database/
│   ├── mongodb.js
│   └── message.schema.js
├── index.js
├── package.json
├── package-lock.json
└── .env
```
## 🔗 Project Links

- **Live Demo:** [View Hosted Project](https://chatter-up-elpc.onrender.com/)
- **GitHub Repository:** [View Source Code](https://github.com/Suraj-nishad78/Chatter_Up)


## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd Chatter-Up
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your `.env` file:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

   Use the MongoDB environment variable name expected by your `database/mongodb.js` file.

5. Start the server:

   ```bash
   node index.js
   ```

## 🚀 Deployment

The backend can be deployed on [Render](https://render.com/).

- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- Configure the MongoDB connection string in the environment variables.
- Ensure the server listens on `process.env.PORT`.

## 📞 Contact
- **Author:** Suraj Nishad
- **Email:** iamsuraj0737@gmail.com
