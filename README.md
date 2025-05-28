# 💰 Personal Finance App

> A full-stack personal finance manager built with React, Node.js, and MongoDB. Track your income and expenses, visualize trends, set budgets, and export your data—all in an elegant, responsive interface.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 📸 Screenshots

![Dashboard Screenshot](docs/images/dashboard.png)

![Mobile Screenshot](docs/images/mobile.png)

### Dashboard Overview
![Dashboard](./screenshots/dashboard.png)

### Transaction Management
![Transactions](./screenshots/transactions.png)

### Budget Tracking
![Budget](./screenshots/budget.png)

## ✨ Features

### 💼 **Core Functionality**
- 📝 **Transaction Management**: Create, edit, and delete income and expense entries
- 📊 **Interactive Charts**: Visualize spending and income trends over time  
- 💼 **Budget Tracking**: Categorize transactions and monitor budget usage
- 💾 **Export Options**: Download your data as CSV or PDF reports

### 🔐 **Security & UX**
- 🔒 **JWT Authentication**: Secure login and registration system
- 🌗 **Dark/Light Mode**: Automatically adapts to your system preference
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🔔 **Real-time Notifications**: Toast alerts for all user actions

### 📊 **Analytics & Insights**
- 📈 **Spending Trends**: Visual representation of your financial patterns
- 🏷️ **Category Breakdown**: See where your money goes by category
- 📅 **Monthly/Yearly Reports**: Track your progress over time
- 🎯 **Budget Goals**: Set and monitor spending limits

## 🛠️ Tech Stack

### **Frontend**
- **React** - Modern UI with Hooks & JSX
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing with protected routes
- **Axios** - HTTP client for API communication
- **React-Toastify** - Beautiful notification system
- **Chart.js/Recharts** - Interactive data visualization

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Fast, minimal web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure token-based authentication
- **bcrypt.js** - Password hashing and security

### **DevOps & Tools**
- **Nodemon** - Development server with hot reload
- **Concurrently** - Run multiple scripts simultaneously
- **GitHub Actions** - CI/CD automation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/JD117parra/personal-finance-app.git
cd personal-finance-app
```

### **2. Install Dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### **3. Environment Configuration**
Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/finance-app
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/finance-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Server Configuration
NODE_ENV=development
PORT=5000

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### **4. Database Setup**
```bash
# Make sure MongoDB is running locally
# Or set up MongoDB Atlas and update MONGO_URI in .env

# The app will automatically create the necessary collections
```

### **5. Run the Application**

**Development Mode (Both Frontend & Backend):**
```bash
npm run dev
```

**Backend Only:**
```bash
npm run server
```

**Frontend Only:**
```bash
npm run client
```

### **6. Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs *(if Swagger is configured)*

## 🗂️ Project Structure

```
personal-finance-app/
│
├── 📁 client/                    # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 pages/            # Page components
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📁 services/         # API service functions
│   │   ├── 📁 utils/            # Utility functions
│   │   ├── 📁 styles/           # CSS and styling
│   │   └── App.js               # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── 📁 server/                    # Node.js backend
│   ├── 📁 controllers/          # Request handlers
│   ├── 📁 models/               # MongoDB schemas
│   ├── 📁 routes/               # API routes
│   ├── 📁 middleware/           # Custom middleware
│   ├── 📁 utils/                # Helper functions
│   └── server.js                # Express server setup
│
├── 📁 docs/                      # Documentation
├── 📁 screenshots/               # App screenshots
├── .env.example                  # Environment variables template
├── package.json                  # Root package.json
└── README.md
```

## 🔌 API Endpoints

### **Authentication**
```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/profile      # Get user profile
PUT    /api/auth/profile      # Update user profile
```

### **Transactions**
```http
GET    /api/transactions      # Get all user transactions
POST   /api/transactions      # Create new transaction
GET    /api/transactions/:id  # Get specific transaction
PUT    /api/transactions/:id  # Update transaction
DELETE /api/transactions/:id  # Delete transaction
```

### **Categories & Budgets**
```http
GET    /api/categories        # Get all categories
POST   /api/categories        # Create new category
GET    /api/budgets          # Get user budgets
POST   /api/budgets          # Create/update budget
```

### **Reports & Analytics**
```http
GET    /api/reports/summary   # Get financial summary
GET    /api/reports/trends    # Get spending trends
POST   /api/reports/export    # Export data (CSV/PDF)
```

## 🧪 Testing

### **Run Tests**
```bash
# Backend tests
npm test

# Frontend tests
cd client && npm test

# Run all tests
npm run test:all
```

### **Test Coverage**
```bash
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### **Development Process**
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### **Bug Reports**
If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)

## 📋 Roadmap

### **Upcoming Features**
- [ ] **Recurring Transactions** - Set up automatic income/expense entries
- [ ] **Multi-Currency Support** - Handle different currencies
- [ ] **Savings Goals** - Track progress toward financial goals
- [ ] **Bill Reminders** - Never miss a payment
- [ ] **Investment Tracking** - Monitor stocks and crypto
- [ ] **Family Accounts** - Shared budgets and expenses
- [ ] **Mobile App** - React Native version
- [ ] **Bank Integration** - Connect bank accounts via Plaid API

### **Technical Improvements**
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **Progressive Web App** - Offline functionality
- [ ] **Advanced Analytics** - ML-powered insights
- [ ] **Data Backup** - Automated backups
- [ ] **Two-Factor Authentication** - Enhanced security

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Juan David Parra**
- 💼 LinkedIn: [juan-parra-2358b428b](https://www.linkedin.com/in/juan-parra-2358b428b)
- 🐱 GitHub: [@JD117parra](https://github.com/JD117parra)
- 📧 Email: JhonParra117@outlook.com

## 🙏 Acknowledgments

- **Frontend Mentor** - For design inspiration
- **MongoDB University** - For database optimization techniques
- **React Documentation** - For best practices
- **Node.js Community** - For excellent packages and support
- **AI Tools** - For code optimization and UX improvements

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 20+ React components
- **API Endpoints**: 15+ RESTful endpoints
- **Dependencies**: Modern, well-maintained packages
- **Development Time**: 3-4 weeks
- **Last Updated**: May 2025

---

⭐ **If you find this project helpful, please give it a star on GitHub!**

🚀 **Built with passion for learning and creating practical solutions**
