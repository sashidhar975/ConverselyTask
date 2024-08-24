"# ConverselyTask" 


#Blog App
This is a full-stack Blog Application built with Vite + React for the frontend and Node.js, Express, and MongoDB for the backend.

#Features
User authentication (login/register)
Create, read, update, and delete (CRUD) blog posts
Posts are associated with the logged-in user
Responsive UI using React and Vite
RESTful API built with Express
MongoDB for data storage

#Tech Stack

#Frontend:

Vite + React: Fast and modern development experience with React.
React Router: For routing between pages.
Axios: For making HTTP requests to the backend API.

#Backend:

Node.js + Express: Server-side JavaScript and REST API creation.
MongoDB + Mongoose: Database and object data modeling (ODM) for MongoDB.
JSON Web Tokens (JWT): For secure user authentication.
bcrypt: For hashing user passwords.

# Installation
Clone the repository: 
git clone git@github.com:sashidhar975/ConverselyTask.git
cd ConverselyTask

Install dependencies for both frontend and backend:

# Navigate to the frontend folder
cd frontend
npm install

# Navigate to the backend folder
cd backend
npm install

#Set up environment variables:

Create a .env file in the backend folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

#Run the application:
cd backend
npm start
Start the frontend development server:
npm run dev

Open your browser:
Navigate to http://localhost:5173 to view the application.


Usage
Sign up for a new account or log in with an existing one.
Create, edit, and delete your blog posts.
View all your posts on the home page.

