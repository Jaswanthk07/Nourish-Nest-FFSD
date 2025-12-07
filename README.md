#  Nourish-Nest  
> A nutrition and diet planning web application for healthy meal tracking

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🎯 Overview

Nourish-Nest is a full-stack web application designed to simplify nutrition planning and healthy eating habits. Built with modern web technologies, it provides users with comprehensive tools to explore recipes, track nutritional intake, monitor calorie goals, and make informed dietary decisions.

Whether you're counting calories, following a specific diet plan, or simply looking to eat healthier, Nourish-Nest offers an intuitive platform with detailed nutritional insights and a rich recipe database to support your wellness journey.

### Key Highlights

- 🔍 **Smart Recipe Search** - Browse thousands of recipes with detailed instructions
- 📊 **Nutritional Intelligence** - Complete macro and micronutrient breakdown
- 📈 **Progress Tracking** - Visual dashboards for calorie and diet goals
- 🎨 **Beautiful UI** - Clean, modern, and fully responsive design
- 🔒 **Secure Platform** - JWT-based authentication and authorization
- ⚡ **Real-time Data** - Live meal information via API integration

---

## ✨ Features

### Core Functionality
- **📱 Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **🔐 Secure Authentication** - User registration and login with JWT-based authorization
- **🍽️ Recipe Database** - Extensive collection of recipes with detailed cooking instructions
- **📊 Nutrition Tracking** - Comprehensive nutritional information including macros and micronutrients
- **🎯 Diet Types** - Support for various diet preferences (Vegan, Keto, Mediterranean, etc.)
- **📈 Calorie Progress** - Visual tracking of daily calorie intake and goals

### Advanced Features
- **🔧 Admin Panel** - Complete administrative control for managing recipes, users, and feedback
- **💬 User Feedback System** - Integrated feedback mechanism for continuous improvement
- **🧮 BMI Calculator** - Built-in tool to calculate and track Body Mass Index
- **🔌 API Integration** - Real-time meal data fetching using Axios
- **📉 Progress Visualization** - Interactive charts and graphs for tracking nutritional goals

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20124919.png?raw=true)

### Responsive Design
![Responsive View](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20125231.png?raw=true)

### Meals Browser
![Meals](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/main/Screenshots/Screenshot%202024-08-17%20124949.png?raw=true)

### Recipe Details
![Recipe](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20125056.png?raw=true)

### Nutrition Information
![Nutrition Details](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20125110.png?raw=true)

### Diet Types & Calorie Tracking
![Diets & Progress](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20125038.png?raw=true)

### Admin Dashboard
![Admin Panel](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/64a2a73808dbfdfbb5526da6e93b4a6865f0b94e/Screenshots/Screenshot%202024-08-17%20125408.png?raw=true)

### User Feedback
![Feedback System](https://github.com/KoushikReddy9963/Nourish-Nest-Phase-2/blob/main/Screenshots/Screenshot%202024-08-17%20125419.png?raw=true)

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- EJS (Embedded JavaScript Templates)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Libraries & Tools:**
- Axios - HTTP client for API requests
- JWT - JSON Web Tokens for authentication
- Bcrypt - Password hashing and security

### Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Frontend      │      │   Backend        │      │   Database      │
│   (EJS/CSS/JS)  │ ───> │   (Node/Express) │ ───> │   (MongoDB)     │
│                 │ <─── │                  │ <─── │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
         │                       │
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │  External   │
              │  Recipe API │
              └─────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **npm** or **yarn** package manager

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/jaswanthk07/Nourish-Nest-Phase-2.git
cd Nourish-Nest-Phase-2

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nourish-nest
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nourish-nest

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# API Keys (if required)
RECIPE_API_KEY=your_api_key_here
```

### Database Setup

If using local MongoDB:
```bash
# Start MongoDB service
mongod

# The application will automatically create the database
```

If using MongoDB Atlas:
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Replace `MONGODB_URI` in `.env` with your connection string

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### Default Admin Credentials

For testing the admin panel:
```
Username: admin@nourish.com
Password: admin123
```
> ⚠️ **Important:** Change these credentials in production!

---

## 💻 Usage

### For Regular Users

#### Getting Started
1. **Create Account** - Register with your email and password
2. **Set Goals** - Enter your dietary goals and preferences
3. **Browse Recipes** - Explore the recipe database
4. **Track Nutrition** - Monitor your daily intake
5. **Check Progress** - View your achievements and statistics

#### Key Features Guide

**🔍 Finding Recipes**
- Use the search bar to find specific recipes
- Filter by diet type (Vegan, Keto, etc.)
- Sort by calories, protein, or other nutrients

**📊 Tracking Your Diet**
- Add meals to your daily log
- View nutritional breakdown
- Monitor calorie progress
- Check macronutrient distribution

**🧮 Using the BMI Calculator**
- Navigate to Health Tools
- Enter your height and weight
- Get instant BMI results
- Track changes over time

### For Administrators

#### Admin Panel Access
1. Login with admin credentials
2. Navigate to Admin Dashboard
3. Access management features

#### Admin Capabilities

**📝 Recipe Management**
- Add new recipes with full details
- Edit existing recipe information
- Remove outdated or incorrect recipes
- Manage recipe categories

**👥 User Management**
- View all registered users
- Monitor user activity
- Manage user permissions
- Handle user reports

**💬 Feedback Management**
- Review user feedback
- Respond to suggestions
- Track improvement requests
- Monitor platform health

---

## 📁 Project Structure

```
Nourish-Nest-Phase-2/
│
├── 📂 public/                    # Static assets
│   ├── css/                      # Stylesheets
│   ├── js/                       # Client-side JavaScript
│   ├── images/                   # Image assets
│   └── fonts/                    # Font files
│
├── 📂 views/                     # EJS templates
│   ├── partials/                 # Reusable components
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── pages/                    # Main pages
│   │   ├── home.ejs
│   │   ├── recipes.ejs
│   │   ├── nutrition.ejs
│   │   └── dashboard.ejs
│   └── admin/                    # Admin pages
│       └── dashboard.ejs
│
├── 📂 routes/                    # Express routes
│   ├── index.js                  # Main routes
│   ├── auth.js                   # Authentication routes
│   ├── recipes.js                # Recipe routes
│   ├── admin.js                  # Admin routes
│   └── api.js                    # API routes
│
├── 📂 models/                    # MongoDB models
│   ├── User.js                   # User schema
│   ├── Recipe.js                 # Recipe schema
│   ├── Feedback.js               # Feedback schema
│   └── NutritionLog.js           # Nutrition tracking schema
│
├── 📂 controllers/               # Route controllers
│   ├── authController.js
│   ├── recipeController.js
│   ├── nutritionController.js
│   └── adminController.js
│
├── 📂 middleware/                # Custom middleware
│   ├── auth.js                   # Authentication middleware
│   ├── validation.js             # Input validation
│   └── errorHandler.js           # Error handling
│
├── 📂 config/                    # Configuration files
│   ├── database.js               # Database connection
│   ├── passport.js               # Passport config
│   └── constants.js              # App constants
│
├── 📂 utils/                     # Utility functions
│   ├── apiHelper.js              # API helper functions
│   ├── validators.js             # Data validators
│   └── helpers.js                # General helpers
│
├── 📂 Screenshots/               # Project screenshots
│
├── 📄 index.js                   # Application entry point
├── 📄 package.json               # Dependencies
├── 📄 .env.example               # Environment template
├── 📄 .gitignore                 # Git ignore rules
└── 📄 README.md                  # Documentation
```

---

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- auth

# Run tests with coverage
npm run test:coverage
```

### Manual Testing Checklist

- User registration and login
- Recipe search and filtering
- Nutrition tracking functionality
- BMI calculator accuracy
- Admin panel operations
- Responsive design on mobile
- API integration
- Form validations

---

## 🚀 Deployment

### Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Environment Variables for Production

Ensure these are set in your hosting platform:
- `NODE_ENV=production`
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`

---

## 🤝 Contributing

We welcome contributions from the community! This project was created for educational purposes, and we're excited to see it grow.

### How to Contribute

1. **Fork the Repository**
2. **Clone Your Fork**
   ```bash
   git clone https://github.com/Jaswanthk07/Nourish-Nest-FFSD
   cd Nourish-Nest-FFSD
   ```
3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed
5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```
6. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Add comments to complex code sections
- Test your changes thoroughly
- Be respectful and constructive

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Contributors

This project was developed as a collaborative group effort to explore and implement full-stack web development concepts and best practices.

**Repository Maintainer:**
- GitHub: [@jaswanthk07](https://github.com/jaswanthk07)

---

## 🙏 Acknowledgments

We would like to express our gratitude to:

- **Recipe Data Sources** - External APIs providing comprehensive recipe information
- **Nutritional Databases** - USDA and other nutrition data providers
- **Open Source Community** - For the amazing libraries and tools
- **Our Users** - For valuable feedback and suggestions

### Technologies & Libraries Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [EJS](https://ejs.co/) - Templating engine
- [Axios](https://axios-http.com/) - HTTP client
- [JWT](https://jwt.io/) - Authentication
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing

---

### ⭐ Show Your Support

If you found this project helpful for learning or if you're using it, please consider giving it a star! ⭐

**Note:** This project was developed for educational and learning purposes to demonstrate full-stack web development skills including frontend design, backend architecture, database management, API integration, and modern web development best practices.

---

Made with ❤️ for learning and healthy living
