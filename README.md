# Mutual Aid Board

## Project Description

Mutual Aid Board is a full-stack web application that facilitates community mutual aid by connecting people who need help with volunteers ready to assist. Users can post requests for help, browse open requests from their community, claim requests they're willing to help with, and track completed tasks.

This project was built as my term project for CS 297W Website Capstone at Clackamas Community College.

## Personal Background & Inspiration

This term, I have been contending with many health challenges, and I had to let go of many hyper-independent beliefs and really allow myself to be helped. This experience taught me the importance of community support and interdependence.

Mutual Aid Board is my way of creating a digital space where people can both give and receive help without shame. It's based on the principle that we all have value to contribute, and we all deserve support when we need it. Whether it's groceries, transportation, childcare, or healthcare.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JWT with HttpOnly cookies, bcrypt for password hashing
- **Environment Management:** dotenv
- **Frontend:** React with Functional Components
- **Styling:** Custom CSS with Google Fonts (Protest Revolution)
- **State Management:** React Hooks (useState, useEffect)
- **API Communication:** Fetch API

## Features

- **User Registration** - Create an account with username, email, password, and optional phone
- **User Login/Logout** - Secure authentication with HttpOnly cookies
- **Protected Routes** - Only logged-in users can create, claim, complete, or delete requests
- **Make a Request** - Post requests for help with title, description, category, location, and contact info
- **Help Someone** - Browse open requests specifically looking for volunteers
- **View All Requests** - See all requests in the system with filtering and search capabilities
- **Search by Keyword** - Find requests by title or description keywords
- **Filter by Status** - Filter requests by Open, Claimed, or Completed status
- **Filter by Category** - Find requests by category (Groceries, Transportation, Medical, Household, Childcare, Other)
- **Claim Request** - Volunteer to help by claiming a request and providing your contact information
- **Mark Complete** - Update a request status to completed
- **Delete Request** - Remove a request from the board
- **Visual Status Tracking** - Sticky note-style cards with different colors for each status
- **Responsive Design** - Works on mobile, tablet, and desktop devices

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mathiar/mutual_aid_board_capstone.git
   cd mutual_aid_board_capstone
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend/` directory:
   ```
   MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/<your-database>
   JWT_SECRET=your_random_secret_key_here
   PORT=3000
   ```

   Start the backend server:
   ```bash
   node server.js
   ```
   You should see:
   ```
   Server running on port 3000
   DB connection success
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

   Create a `.env` file in the `frontend/` directory:
   ```
   VITE_API_URL=http://localhost:3000
   ```

   Start the frontend dev server:
   ```bash
   npm run dev
   ```
   You should see:
   ```
   Local: http://localhost:5173/
   ```

4. **Open in browser**

   Navigate to [http://localhost:5173](http://localhost:5173) to use the application.

   > **Note:** Both the backend (port 3000) and frontend (port 5173) must be running simultaneously in separate terminals.

## API Routes

### Authentication Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive HttpOnly cookie |
| POST | `/auth/logout` | Logout and clear cookie |

### Requests Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/requests` | Get all requests |
| POST | `/requests` | Create a new request |
| GET | `/requests/:id` | Get a single request by ID |
| PUT | `/requests/:id` | Update a request |
| DELETE | `/requests/:id` | Delete a request |

### Query Parameters

**Filter by status:**
```
GET /requests?status=Open
GET /requests?status=Claimed
GET /requests?status=Completed
```

**Filter by category:**
```
GET /requests?category=Groceries
GET /requests?category=Transportation
```

**Search by keyword:**
```
GET /requests?search=groceries
```

## Database Schema

**Collection:** `users`

**Fields:**
- `_id` (ObjectId) - Unique identifier
- `username` (String, required, unique) - User's username
- `email` (String, required, unique) - User's email
- `password` (String, required) - Hashed password
- `phone` (String) - Optional phone number
- `role` (String, default: "member") - User role (member, admin)

---

**Collection:** `requests`

**Fields:**
- `_id` (ObjectId) - Unique identifier
- `title` (String, required) - Request title
- `description` (String, required) - Detailed description
- `category` (String, required) - Category (Groceries, Transportation, Medical, Household, Childcare, Other)
- `location` (String) - Location of request
- `status` (String, default: "Open") - Status (Open, Claimed, Completed)
- `createdBy` (ObjectId, ref: 'User', required) - User who created the request
- `claimedBy` (ObjectId, ref: 'User') - User who claimed the request
- `createdTimestamp` (Date, default: now) - When request was created
- `claimedTimestamp` (Date) - When request was claimed
- `completedTimestamp` (Date) - When request was marked complete

## Project Structure

```
mutual-aid-board/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── requests.js
│   │   └── auth.js
│   ├── models/
│   │   ├── Request.js
│   │   └── User.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── RequestForm.jsx
│   │   │   ├── RequestList.jsx
│   │   │   ├── RequestCard.jsx
│   │   │   └── FilterSearch.jsx
│   │   ├── styles/
│   │   │   ├── AuthForms.css
│   │   │   ├── RequestList.css
│   │   │   ├── Navigation.css
│   │   │   ├── RequestCard.css
│   │   │   ├── FilterSearch.css
│   │   │   └── RequestForm.css
│   │   ├── utils/
│   │   │   └── authUtils.js
│   │   ├── images/
│   │   │   └── cork.png
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Future Work

- User authentication and accounts
- Profile pages for requestors and helpers
- Rating and review system
- Notifications when requests are claimed
- Map integration to show request locations
- Direct messaging between requestors and helpers
- Request history and analytics
- Admin dashboard for moderation

## Author

**Justin Rybacki**
Clackamas Community College | CS 297W Website Capstone | Spring 2026

## License

This project is for educational purposes as part of a college course.