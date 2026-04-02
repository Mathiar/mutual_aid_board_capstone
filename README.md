# Mutual Aid Board

## Project Description

Mutual Aid Board is a full-stack web application that facilitates community mutual aid by connecting people who need help with volunteers ready to assist. Users can post requests for help, browse open requests from their community, claim requests they're willing to help with, and track completed tasks.

This project was built as my term project for CS 234W Full-Stack Web Development II at Clackamas Community College.

## Personal Background & Inspiration

This term, I have been contending with many health challenges, and I had to let go of many hyper-independent beliefs and really allow myself to be helped. This experience taught me the importance of community support and interdependence.

Mutual Aid Board is my way of creating a digital space where people can both give and receive help without shame. It's based on the principle that we all have value to contribute, and we all deserve support when we need it. Whether it's groceries, transportation, childcare, or healthcare.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Environment Management:** dotenv
- **Frontend:** React with Functional Components
- **Styling:** Custom CSS with Google Fonts (Protest Revolution)
- **State Management:** React Hooks (useState, useEffect)
- **API Communication:** Fetch API

## Features

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
   git clone https://github.com/MathiarI/mutual-aid-board.git
   cd mutual-aid-board
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend/` directory:
   ```
   MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/<your-database>
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

**Collection:** `requests`

**Fields:**
- `_id` (ObjectId) - Unique identifier
- `title` (String, required) - Request title
- `description` (String, required) - Detailed description
- `category` (String, required) - Category (Groceries, Transportation, Medical, Household, Childcare, Other)
- `location` (String) - Location of request
- `status` (String, default: "Open") - Status (Open, Claimed, Completed)
- `requestorName` (String, required) - Name of person making request
- `requestorPhone` (String) - Contact phone number
- `requestorEmail` (String) - Contact email address
- `helperName` (String) - Name of volunteer helping
- `helperPhone` (String) - Volunteer's phone number
- `helperEmail` (String) - Volunteer's email address
- `createdTimestamp` (Date, default: now) - When request was created
- `claimedTimestamp` (Date) - When request was claimed
- `completedTimestamp` (Date) - When request was marked complete

## Project Structure

```
mutual-aid-board/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   └── requests.js
│   ├── models/
│   │   └── Request.js
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
│   │   │   ├── RequestForm.jsx
│   │   │   ├── RequestList.jsx
│   │   │   ├── RequestCard.jsx
│   │   │   ├── FilterSearch.jsx
│   │   │   └── ClaimModal.jsx
│   │   ├── styles/
│   │   │   ├── RequestList.css
│   │   │   ├── Navigation.css
│   │   │   ├── RequestCard.css
│   │   │   ├── FilterSearch.css
│   │   │   ├── ClaimModal.css
│   │   │   └── RequestForm.css
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
Clackamas Community College | CS 234W Full-Stack Web Development II | Winter 2026

## License

This project is for educational purposes as part of a college course.