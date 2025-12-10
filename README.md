# Study Resource Organizer

A web-based platform for managing and organizing educational resources. This application allows administrators to upload study materials and students to access and download them based on categories.

## Features

### Admin Features
- Add new study resources with file uploads
- Categorize resources (Notes, Videos, Assignments, Books, Practice)
- Delete existing resources
- View all uploaded resources

### Student Features
- Browse all available study resources
- Filter resources by category
- Download study materials
- User-friendly dashboard interface

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NightOwl366/study-resource-organizer.git
   cd STUDY-RESOURCE-ORGANIZER
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

   The server will start on `http://localhost:5000`

5. **Open the application**
   
   Navigate to the frontend folder and open the HTML files in your browser:
   - Login: Open `frontend/login.html`
   - Sign Up: Open `frontend/signUp.html`

## Project Structure

```
STUDY-RESOURCE-ORGANIZER/
│
├── backend/
│   ├── routes/
│   │   ├── resourceRoutes.js    # Resource management routes
│   │   └── userRoutes.js        # User authentication routes
│   ├── uploads/                  # Directory for uploaded files
│   ├── package-lock.json
│   ├── package.json
│   └── server.js                 # Main server file
│
├── frontend/
│   ├── add-resource.css         # Add resource styling
│   ├── add-resource.html        # Add resource page
│   ├── add-resource.js          # Add resource logic
│   ├── admin-dashboard.css      # Admin dashboard styling
│   ├── admin-dashboard.html     # Admin dashboard
│   ├── admin-dashboard.js       # Admin dashboard logic
│   ├── login.html               # Login page
│   ├── script.js                # Auth logic
│   ├── signUp.html              # Sign up page
│   ├── style.css                # Auth pages styling
│   ├── user-dashboard.css       # User dashboard styling
│   ├── user-dashboard.html      # Student dashboard
│   └── user-dashboard.js        # User dashboard logic
│
├── .gitignore
└── README.md
```

## Default Admin Credentials

An admin account is automatically created when the server starts:

- **Email:** `admin@study.com`
- **Password:** `admin123`

## Usage

### For Students:
1. Sign up for a new account
2. Log in with your credentials
3. Browse resources by category
4. Download materials you need

### For Administrators:
1. Log in using admin credentials
2. Add new resources with files
3. Manage existing resources
4. Delete outdated materials

## API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - User login

### Resources
- `GET /resources` - Get all resources
- `POST /resources` - Add new resource (Admin only)
- `DELETE /resources/:id` - Delete resource (Admin only)

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String (admin/user)
}
```

### Resource Schema
```javascript
{
  title: String,
  description: String,
  category: String,
  filePath: String,
  fileName: String,
  createdAt: Date
}
```

## Security Notes

⚠️ **Important:** This is a college mini-project for educational purposes. For production use, consider implementing:
- Password hashing (bcrypt)
- JWT authentication
- Input validation and sanitization
- File type restrictions
- Rate limiting
- HTTPS

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available

**File Upload Issues:**
- Verify `uploads/` directory exists
- Check file size limits (current: 10MB)

**CORS Errors:**
- Make sure backend is running on port 5000
- Check frontend API_URL configuration

## Future Enhancements

- Search functionality
- User profiles
- Comments/ratings on resources
- Email notifications
- Resource versioning
- Advanced filters (date, subject, etc.)

## License

This project is created for educational purposes.

## Contributing

This is a college mini-project. Feel free to fork and modify for your own learning!
