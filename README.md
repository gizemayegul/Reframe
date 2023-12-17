
# ReFrame Project
Overview
Welcome to the "ReFrame" project! This is a web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The project aims to provide users with a platform to document their thoughts, experiences, and daily activities through a diary-like interface. Users can sign up, log in, edit their account details, write gratitude,and diary entries, and explore a timeline of their past entries.

## Project Design
The project's design is based on the Figma design provided here.

## Getting Started
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/avaiva/mm-l.git
Install dependencies for the entire project:
```
bash
Copy code
cd mm-l
npm install
Navigate to the backend directory and install backend dependencies:
```
```
bash
Copy code
cd backend
npm install
Navigate to the frontend directory and install frontend dependencies:
```
```
bash
Copy code
cd ../frontend
npm install
Running the Application
To run the application locally, use the following command:
```
```
bash
Copy code
npm run fullstack
This command uses concurrently to run both the backend and frontend servers concurrently.

```

Backend
To start the backend server in development mode:
```
bash
Copy code
npm --prefix backend run dev
Frontend
To start the frontend server in development mode:
```
```
bash
Copy code
npm --prefix frontend run dev
Project Structure
backend: Contains the server-side code written in Node.js using Express.js. Handles API routes, authentication, and interacts with MongoDB.
```
Dependencies:
```
axios
bcryptjs
cookie-parser
cors
dotenv
express
jsonwebtoken
mongoose
morgan
```
frontend: Contains the client-side code written in React.js. Implements various pages such as account, edit diary, inner support, signup, login, today entry, and timeline.

Dependencies:
```
axios
bootstrap
cors
install
jwt-decode
react
react-bootstrap
react-dom
react-icons
react-jwt
react-router-dom
```
Dev Dependencies:
```
@types/react
@types/react-dom
@vitejs/plugin-react
eslint
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-react-refresh
vite
```
 ### Project Features
Authentication: The project uses JSON Web Tokens (JWT) for user authentication. The auth route handles user authentication.

### Gratitude: Users can create, edit, and view their gratitude entries. The diary route is responsible for managing gratitude-related functionalities.

### Diary: Users can create, edit, and view their diary entries. The diary route is responsible for managing diary-related functionalities.

### Profile: Users can edit their account details. The profile route manages user profile information.

### Timeline: Users can view a timeline of their past entries. The timeline route handles the display of chronological entries.

Contact and Issues
If you encounter any issues or have questions, feel free to open an issue on the GitHub repository.

Thank you for using "ReFrame"! Enjoy documenting your journey!
