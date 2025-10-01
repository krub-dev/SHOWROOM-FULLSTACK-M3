# 🚀 Ironhack DWEB - Module 3 Week 2 Labs

Professional full-stack web application developed during **Ironhack Web Development Bootcamp**. This project showcases a complete Vue.js frontend with Express.js backend, featuring advanced CRUD operations, featured projects system, and elegant dark UI design.

## 🌐 **Live Showroom**

**🚀 Deployed Application:** [https://krubshowroom-production.up.railway.app](https://krubshowroom-production.up.railway.app)

**Platform:** Railway Cloud Deployment  
**Status:** ✅ Production Ready

The showroom includes:

-   🏠 **Home** - Landing page with featured projects showcase
-   📋 **Projects** - Complete projects list with featured toggle
-   📞 **Contact** - Professional contact form with LinkedIn integration
-   ⚙️ **API CRUD** - Admin interface for project management
-   📱 **Mobile Responsive** - Hamburger menu and mobile-optimized design

## 📋 **Project Overview**

### **Labs Completed:**

-   **M3_W2_D1_LAB1:** Vue.js component with personal info and featured projects list
-   **M3_W2_D2_LAB1:** SPA routing (Home, Projects, 404) with CSS styling
-   **M3_W2_D2_LAB2:** Contact form component with professional styling
-   **M3_W2_D2_LAB3:** Complete CRUD API integration with Express backend

### **Key Features:**

-   🌟 **Featured Projects System** - Toggle between featured and all projects
-   🔧 **CRUD API Manager** - Complete admin interface for project management
-   🎨 **Elegant Dark UI** - Consistent golden/dark theme across all components
-   📱 **Responsive Design** - Mobile-first approach with hamburger menu
-   ⚡ **Real-time Updates** - Live project filtering and management
-   🔗 **Professional Integration** - LinkedIn button and contact system
-   🔐 **Teacher Authentication** - CRUD protected by password, only teachers can create/edit/delete projects. Public viewing without password.
-   🛡️ **Secure API** - All POST/PUT/DELETE operations require the `x-teacher-key` header with the teacher key.

### **Tech Stack:**

-   **Frontend:** Vue.js 3 (Composition API), Vue Router, CSS3, HTML5
-   **Backend:** Node.js, Express.js, CORS, File System Operations
-   **Data:** JSON file storage with real-time CRUD operations
-   **UI/UX:** Dark theme design, responsive layout, smooth animations
-   **Tools:** Vite, npm, Git, VS Code, Railway

---

## 🏗️ **Architecture**

```
📁 Ironhack_DWEB_M3_W2_LABS/
├── 🖥️ Frontend (Vue.js)           → http://localhost:5173 | Production: Railway
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.vue              # Landing page with responsive design
│   │   │   ├── ProjectList.vue       # Featured/All projects with mobile accordion
│   │   │   ├── ApiProjects.vue       # CRUD Manager with production API URLs
│   │   │   ├── Contact.vue           # Dark theme contact form
│   │   │   ├── NotFound404.vue       # 404 error page
│   │   │   └── LinkedInButton.vue    # Professional networking
│   │   ├── App.vue                   # Main app with hamburger menu
│   │   ├── data/projects.json        # Enhanced with featured & sequential IDs
│   │   └── main.js
│   └── package.json
└── 🌐 Backend (Express API)        → http://localhost:3001 | Production: Railway
    ├── server.js                    # Full CRUD REST API + SPA routing
    └── package.json
```

---

## ⚡ **Quick Start**

### **Prerequisites:**

-   Node.js (v18+)
-   npm

### **1. Clone & Install:**

```bash
git clone <repository-url>
cd Ironhack_DWEB_M3_W2_LABS

# Install frontend dependencies
npm install

# Install backend dependencies
cd api-projects
npm install
cd ..
```

### **2. Start Development Servers:**

**Terminal 1 - Frontend (Vue):**

```bash
npm run dev
# → Frontend available at http://localhost:5173
```

**Terminal 2 - Backend (Express API):**

```bash
cd api-projects
node server.js
# → API available at http://localhost:3001
```

### **3. Access Application:**

-   **Frontend:** http://localhost:5173
-   **API Endpoints:** http://localhost:3001/api/projects

---

## 🚀 **Production Deployment**

### **Railway Deployment Details:**

**Live URL:** [https://krubshowroom-production.up.railway.app](https://krubshowroom-production.up.railway.app)


**Autodeploy:** Every push to the `main` branch triggers an automatic deployment on Railway.

**Deployment Configuration:**

-   **Platform:** Railway Cloud Platform
-   **Build Process:** Automatic build from Git repository
-   **Frontend:** Vue.js build served as static files
-   **Backend:** Express.js API with JSON file storage
-   **Environment:** Production with NODE_ENV=production
-   **CORS:** Configured for cross-origin requests

**Build Scripts:**

```json
{
	"build": "vite build && cd api-projects && npm install",
	"start": "cd api-projects && node server.js"
}
```

**Production Features:**

-   ✅ Static file serving for Vue.js frontend
-   ✅ Express API with production CORS configuration
-   ✅ Environment-based PORT configuration (Railway: 8080)
-   ✅ SPA routing fallback for all frontend routes
-   ✅ Sequential ID system with production data persistence
-   ✅ Automated deployment from Git commits
-   ✅ Full-stack hosting in single Railway service
-   ✅ Teacher authentication system for secure CRUD operations

### **Deployment Commands:**

```bash
# Build and deploy to Railway
npm run build     # Builds frontend and installs backend deps
railway up        # Deploy to Railway cloud platform

# Or deploy directly
railway up        # Automatically detects changes and deploys
```

**Latest Deployment Status:**

-   **Date:** September 27, 2025
-   **API URLs:** Updated from localhost to production Railway URLs
-   **Status:** ✅ Fully deployed and operational

---

## 🌐 **API Endpoints**

### **Base URLs:**

-   **Development:** `http://localhost:3001`
-   **Production:** `https://krubshowroom-production.up.railway.app`

| Method   | Endpoint            | Description        | Body         | Notes                      |
| -------- | ------------------- | ------------------ | ------------ | -------------------------- |
| `GET`    | `/api/projects`     | Get all projects   | -            | Includes featured status   |
| `POST`   | `/api/projects`     | Create new project | Project JSON | Auto-assigns sequential ID |
| `PUT`    | `/api/projects/:id` | Update project     | Project JSON | ID = numeric project ID    |
| `DELETE` | `/api/projects/:id` | Delete project     | -            | ID = numeric project ID    |

### **Enhanced Project Schema:**

```javascript
{
  "id": 1,                                     // Auto-incremental unique identifier
  "title": "Project Title",
  "description": "Detailed description",
  "image": "https://example.com/image.jpg",
  "technologies": ["Vue.js", "Express.js"],
  "rating": 5,
  "repo": "https://github.com/username/project",
  "featured": true  // 🌟 NEW: Featured projects system
}
```

### **Example API Usage:**

```javascript
// Get all projects
const response = await fetch(
	"https://krubshowroom-production.up.railway.app/api/projects"
);
const projects = await response.json();

// Create new project
await fetch("https://krubshowroom-production.up.railway.app/api/projects", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		title: "New Project",
		description: "Project description",
		technologies: ["Vue.js", "Express"],
		rating: 5,
		featured: false,
	}),
});
```

---

## 🎨 **Features**

### **Frontend Features:**

-   ✅ **SPA Routing** - Vue Router navigation with smooth transitions and SPA fallback
-   ✅ **Featured Projects System** - Toggle between featured/all projects view
-   ✅ **CRUD API Manager** - Complete admin interface with production API URLs
-   ✅ **Mobile-First Responsive** - Hamburger menu (44x44px touch targets), mobile accordion
-   ✅ **Dark Theme UI** - Consistent golden/dark color scheme (#f5ca1c)
-   ✅ **Component Architecture** - Reusable Vue components with Composition API
-   ✅ **Professional Styling** - Hover effects, smooth transitions, modern design
-   ✅ **Form Handling** - Advanced forms with validation and custom styling
-   ✅ **LinkedIn Integration** - Professional networking button
-   ✅ **Cross-Device UX** - Optimized for desktop, tablet, and mobile experiences

### **Backend Features:**

-   ✅ **RESTful API** - Standard HTTP methods with proper status codes
-   ✅ **Production CORS** - Cross-origin requests configured for Railway deployment
-   ✅ **File-based Storage** - JSON file persistence with sequential ID management
-   ✅ **SPA Routing Support** - Express middleware for Vue Router fallback
-   ✅ **Error Handling** - Comprehensive error responses and logging
-   ✅ **Featured Projects** - Backend support for featured/regular categorization
-   ✅ **Express Middleware** - Static file serving, JSON parsing, request validation
-   ✅ **Sequential ID System** - Auto-incremental IDs (1-6...) replacing title-based identification
-   ✅ **Railway Integration** - Production-ready deployment with environment configuration
-   🔐 **Teacher Authentication Middleware** - All write operations protected by teacher key

### **Advanced Features:**

-   🌟 **Dynamic Project Filtering** - Real-time toggle between featured and all projects
-   🔧 **Admin Dashboard** - Complete project management with dropdown interface
-   📊 **Color-coded Notifications** - Visual feedback for CRUD operations
-   🎨 **Homogeneous Design** - Consistent styling across all components
-   ⚡ **Real-time Updates** - Instant UI updates after API operations
-   📱 **Mobile Optimization** - Touch-friendly interface with proper spacing

---

## 📁 **Project Structure**

### **Frontend Components:**

-   `App.vue` - Main application with responsive hamburger menu navigation
-   `Home.vue` - Landing page with professional showroom and elegant design
-   `ProjectList.vue` - Featured/All projects toggle with mobile accordion interface
-   `ApiProjects.vue` - Complete CRUD manager with production API connectivity
-   `Contact.vue` - Dark theme contact form with professional styling
-   `NotFound404.vue` - 404 error page with code-themed design
-   `LinkedInButton.vue` - Reusable LinkedIn integration component

### **Backend Structure:**

-   `server.js` - Express server with full CRUD endpoints and SPA routing support
-   Enhanced JSON file operations with sequential ID management
-   Production CORS configuration and static file serving
-   Comprehensive error handling and logging
-   Automatic ID generation and data validation

---

## 🚀 **Development**

### **Frontend Development:**

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Backend Development:**

```bash
cd api-projects
node server.js       # Start API server
# Use Ctrl+C to stop server
```

### **Deployment:**

```bash
railway up          # Deploy to Railway
```

---

## 🎯 **Learning Objectives Achieved**

### **M3_W2_D1_LAB1 - Personal Showroom Component:**

-   ✅ **Component Creation** - Personal info with h1 (name), h2 (job title)
-   ✅ **Project Highlights** - JSON-based featured projects list
-   ✅ **Professional Design** - Header/banner image integration
-   ✅ **External Links** - Professional portfolio with branding (krub.dev)

### **M3_W2_D2_LAB1 - SPA Routing:**

-   ✅ **Vue Router** - Home component at `/home` and `/` routes
-   ✅ **Projects Display** - Component for current/featured projects
-   ✅ **404 Error Handling** - Custom NotFound component for invalid routes
-   ✅ **Professional Styling** - CSS across all components

### **M3_W2_D2_LAB2 - Contact Form:**

-   ✅ **Contact Component** - Professional collaboration inquiry form
-   ✅ **Form Validation** - Input validation and user feedback
-   ✅ **Dark Theme Design** - Elegant styling matching portfolio theme

### **M3_W2_D2_LAB3 - CRUD Integration:**

-   ✅ **Complete CRUD** - Create, Read, Update, Delete operations
-   ✅ **API Integration** - Express.js backend with JSON file storage
-   ✅ **Security Features** - Confirm dialogs for delete operations
-   ✅ **Real-time Updates** - Immediate UI feedback for all operations
-   ✅ **Featured Projects** - Enhanced system beyond basic requirements

### **Bonus Achievements:**

-   🏆 **Mobile Responsive Design** - Hamburger menu and touch-optimized interface
-   🏆 **Production Deployment** - Full Railway cloud deployment
-   🏆 **Sequential ID System** - Professional ID management replacing title-based
-   🏆 **SPA Routing Fallback** - Proper handling of direct URL access

---

## 👨‍💻 **Developer**

-   **GitHub:** [@krub-dev](https://github.com/krub-dev)
-   **LinkedIn:** [Kiko Rubio Illán](https://linkedin.com/in/krub)
-   **Portfolio:** [krub.dev](https://krub.dev)
-   **Live Demo:** [krubSHOWROOM](https://krubshowroom-production.up.railway.app)

---

**Ironhack Web Development Bootcamp** - Module 3, Week 2 Labs  
**Completion Date:** September 27, 2025  
**Status:** ✅ All labs completed with production deployment
