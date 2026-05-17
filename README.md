# ClubNest 🏛️
### "Find Your Community. Join Your Club."

ClubNest is a web-based student club recruitment platform where university clubs can post recruitment notices and students can apply to join clubs online.

---

## 📌 Problem Description

University students struggle to discover clubs and apply to join them. Club admins have no centralized way to post notices or manage applications. ClubNest solves this by providing a structured REST API backend that connects clubs and students.

---

## 💡 Proposed Solution

A RESTful backend system built with Node.js, Express.js, and MongoDB that allows:
- Clubs to register and post recruitment notices
- Students to view notices and submit applications
- Full CRUD operations for all three entities

---

## ✨ Features

**Clubs can:**
- Add recruitment notices
- View notices
- Edit notices
- Delete notices

**Students can:**
- View all club recruitment notices
- Apply to join clubs

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment variables |
| body-parser | Parse incoming requests |
| nodemon | Auto-restart during development |
| Postman | API testing |
| GitHub | Version control |

---

## 📁 Project Structure

```
ClubNest/
├── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── Model/
│   ├── clubModel.js
│   ├── recruitmentModel.js
│   └── applicationModel.js
├── Controller/
│   ├── clubController.js
│   ├── recruitmentController.js
│   └── applicationController.js
└── Route/
    ├── clubRoute.js
    ├── recruitmentRoute.js
    └── applicationRoute.js
```

---

## 🔗 API Endpoints

### Clubs — `/api/clubs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/clubs/create` | Add a new club |
| GET | `/api/clubs/getallclubs` | Get all clubs |
| GET | `/api/clubs/getclub/:id` | Get one club by ID |
| PUT | `/api/clubs/update/:id` | Update club details |
| DELETE | `/api/clubs/delete/:id` | Delete a club |

**POST /api/clubs/create — Example Body:**
```json
{
  "name": "IEEE Student Branch",
  "description": "Technology and engineering club",
  "category": "Technology",
  "contactEmail": "ieee@university.lk"
}
```

---

### Recruitments — `/api/recruitments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recruitments/create` | Post a recruitment notice |
| GET | `/api/recruitments/getallrecruitments` | Get all notices |
| GET | `/api/recruitments/getrecruitment/:id` | Get one notice by ID |
| GET | `/api/recruitments/getbyclub/:clubId` | Get all notices by club |
| PUT | `/api/recruitments/update/:id` | Update a notice |
| DELETE | `/api/recruitments/delete/:id` | Delete a notice |

**POST /api/recruitments/create — Example Body:**
```json
{
  "clubId": "665f1c2e4f1a2b3c4d5e6f7a",
  "title": "New Member Recruitment 2025",
  "description": "We are looking for passionate students",
  "requirements": "Open to all faculties, GPA 3.0+",
  "deadline": "2025-07-01",
  "slots": 10
}
```

---

### Applications — `/api/applications`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications/apply` | Student submits application |
| GET | `/api/applications/getallapplications` | Get all applications |
| GET | `/api/applications/getapplication/:id` | Get one application by ID |
| GET | `/api/applications/getbyrecruitment/:recruitmentId` | Get applications by recruitment |
| PUT | `/api/applications/update/:id` | Update application status |
| DELETE | `/api/applications/delete/:id` | Delete an application |

**POST /api/applications/apply — Example Body:**
```json
{
  "recruitmentId": "665f1c2e4f1a2b3c4d5e6f7b",
  "studentName": "Kavindu Perera",
  "studentEmail": "kavindu@university.lk",
  "studentId": "IT22100234",
  "faculty": "Faculty of Computing",
  "whyJoin": "I am passionate about technology and want to grow my skills"
}
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas)
- Postman (for testing)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/clubnest.git
cd clubnest
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your `.env` file**
```bash
cp .env.example .env
```
Then edit `.env`:
```
PORT = 5000
MONGO_URL = "mongodb://localhost:27017/clubnest"
```

**4. Start MongoDB** (if running locally)
```bash
mongod
```

**5. Run the server**
```bash
npm start
```

Server will run at: `http://localhost:5000`

---

## 🚀 How to Run the Project

```bash
npm start
```

You should see:
```
Database connected successfully.
ClubNest server is running on port: 5000
```

Open Postman and start testing the endpoints listed above.

---

## 👨‍💻 Author

- **Name:** [Your Name]
- **Index:** [Your Index Number]
- **Module:** IT2234 - Web Services and Technology
- **Level:** 2nd Year IT
