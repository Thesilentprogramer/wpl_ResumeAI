# AI Resume Analyzer + Chatbot

A complete MERN stack application where users can upload their resume (PDF/DOCX), get AI-powered analysis, and chat with an AI assistant.

## 🎯 Features

- **📄 Resume Upload**: Support for PDF and DOCX files
- **📊 AI Analysis**: Get comprehensive resume analysis including ATS score, skills, strengths, weaknesses, and suggestions
- **💬 Chatbot Modal**: Interactive AI chatbot as an overlay
- **🎨 Modern UI**: Beautiful design matching the provided HTML reference
- **💾 MongoDB Storage**: Saves all analysis and chat history
- **👔 Recruiter Dashboard**: Complete job posting and candidate matching system for recruiters

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **TailwindCSS** - Styling (matching provided design)
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **Google Gemini AI** - AI integration (gemini-1.5-flash)

## 📁 Project Structure

```
resume-analyzer-ai/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatModal.js
│   │   │   ├── JobForm.jsx
│   │   │   └── TopMatches.jsx
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Analysis.js
│   │   │   ├── Dashboard.js
│   │   │   └── RecruiterDashboard.jsx
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/              # Node.js backend
│   ├── models/
│   │   ├── Resume.js
│   │   ├── Analysis.js
│   │   ├── Chat.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── resumeRoutes.js
│   │   ├── chatRoutes.js
│   │   └── jobRoutes.js
│   ├── controllers/
│   │   ├── resumeController.js
│   │   ├── chatController.js
│   │   └── jobController.js
│   ├── utils/
│   │   ├── pdfParser.js
│   │   ├── geminiClient.js
│   │   ├── jobMatcher.js
│   │   └── matchResumes.js
│   ├── uploads/
│   └── server.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Backend Dependencies**
```bash
cd server
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

### Configuration

Create `server/.env` file:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Visit: http://localhost:3000

## 📡 API Endpoints

### Upload Resume
- **POST** `/api/resume/upload`
- Upload PDF/DOCX resume
- Returns AI analysis

### Chat
- **POST** `/api/chat`
- Send message to AI chatbot
- Requires: `message`, `resumeText`

### Jobs (Recruiter)
- **POST** `/api/jobs` - Create a new job posting
  - Requires: `title`, `description`, `recruiterId`, `requiredSkills` (array), `location`, `employmentType`, `experienceLevel`
- **GET** `/api/jobs` - Get all jobs (optionally filtered by `recruiterId` query param)
- **GET** `/api/jobs/:id` - Get a single job by ID
- **GET** `/api/jobs/:jobId/matches` - Get top matching candidates for a job
  - Query params: `useAI` (true/false) for AI-enhanced matching
- **PUT** `/api/jobs/:id` - Update a job posting
- **DELETE** `/api/jobs/:id` - Delete a job posting

## ✨ Key Features

### Resume Analysis
- Extract text from PDF/DOCX
- AI-powered analysis with Google Gemini
- ATS score calculation
- Skills extraction
- Identifies strengths and weaknesses
- Provides actionable suggestions
- Missing keywords detection

### AI Chatbot
- Modal overlay (not separate page)
- Context-aware responses
- Chat history saved to MongoDB
- Quick question buttons

### Data Persistence
- MongoDB collections:
  - `resumes` - Upload metadata
  - `analyses` - Analysis results
  - `chats` - Chat history
  - `jobs` - Job postings and recruiter information

### Recruiter Dashboard
The recruiter page (`/recruiter`) provides a comprehensive job posting and candidate matching system:

- **Job Posting Management**:
  - Create new job postings with detailed information (title, description, required skills, location, employment type, experience level)
  - View all posted jobs in a clean, organized dashboard
  - Delete jobs as needed
  - Auto-extract skills from job descriptions if not explicitly provided

- **AI-Powered Candidate Matching**:
  - View top matching candidates for each job posting
  - Match candidates based on skills, experience, and qualifications
  - Optional AI enhancement using Google Gemini for semantic matching
  - Match scores displayed with color-coded indicators (green for 80%+, yellow for 60-79%, red below 60%)
  - View matched skills and all candidate skills
  - Display candidate experience level and years of experience

- **Candidate Information**:
  - View candidate contact information (email)
  - Access full resume details for each candidate
  - Direct contact functionality via email links
  - AI-generated insights explaining why candidates are a good match (when AI enhancement is enabled)

- **User Experience**:
  - Clean, modern interface with dark mode support
  - Easy navigation back to main dashboard
  - Responsive design for all screen sizes
  - Real-time job creation and deletion

## 🎨 Design

The UI matches the provided HTML design with:
- Custom color palette (primary, backgrounds, highlights)
- Material Symbols icons
- Clean, modern layout
- Responsive design
- Light/dark mode support

## 📝 License

MIT License

