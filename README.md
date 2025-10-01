# 🚀 SHOWROOM - Projects Portfolio

Professional full-stack web application developed during **Ironhack Web Development Course**. This project showcases a complete Vue.js frontend with Express.js backend, featuring advanced CRUD operations, featured projects system, and elegant dark UI design.

## 🌐 **Live SHOWROOM**

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

### **What is SHOWROOM?**
SHOWROOM is a portfolio-style web app to manage and display your best projects.  
It features a full CRUD system, project search/filter by title and technologies, and real-time admin controls.

### **Key Features**
- Full stack (Vue.js + Express.js)
- Projects CRUD: create, view, edit, delete
- Secure admin actions (teacher key authentication)
- Featured projects system
- List, detail, and admin forms
- Search/filter by title and technologies (tags)
- Server-side paginated project listing
- Responsive design (mobile-first)
- Professional contact form with LinkedIn
- Animated transitions
- Error and loading states in UI
- Button to test backend/database connection
- Deployed in production (Railway)

### **Tech Stack:**

- **Frontend:** Vue.js 3 (Composition API), Vue Router, CSS3, HTML5
- **Backend:** Node.js, Express.js, CORS, File System (to be migrated to a real DB)
- **Data:** **JSON storage** for now *(migrating soon to SQLite/PostgreSQL)*
- **UI/UX:** Dark theme, mobile-first, smooth animations
- **Tools:** Vite, npm, Git, VS Code, Railway

---

## 🏗️ **Directory Structure** TBC!

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

## 🏗️ **Project Structure**

### Frontend Components

- `App.vue` — Main application shell with responsive hamburger menu navigation.
- `Home.vue` — Landing page featuring a professional showroom and elegant design.
- `ProjectList.vue` — Display all/featured projects with search and pagination.
- `ApiProjects.vue` — CRUD manager linked to backend API.
- `Contact.vue` — Dark theme contact form with LinkedIn integration.
- `NotFound404.vue` — Custom 404 error page.
- `LinkedInButton.vue` — Reusable LinkedIn networking component.

### Backend Structure

- `server.js` — Express server with full CRUD REST endpoints and SPA routing support.
- Data operations: JSON file management, sequential ID generation (to be migrated to SQL DB).
- CORS: Production-ready configuration.
- Static file serving and SPA fallback.
- Error handling and logging.
- Data validation (e.g., required title field).

## ⚡ **Quick Start**

### **Prerequisites:**

-   Node.js (v18+)
-   npm

### **1. Clone & Install:**

```bash
git clone <repository-url>
cd SHOWROOM-FULLSTACK-M3

# Install frontend dependencies
npm install

# Install backend dependencies
cd ../backend
npm install
```

### **2. Start Development Servers:**

**Terminal 1 - Frontend (Vue):**

```bash
npm run dev
# → Frontend available at http://localhost:5173
```

**Terminal 2 - Backend (Express API):**

```bash
cd backend
node server.js
# → API available at http://localhost:3001
```

### **3. Access Application:**

-   **Frontend:** http://localhost:5173
-   **API Endpoints:** http://localhost:3001/api/projects

---

## 🚀 **Production Deployment**

### **Railway Deployment Details:**

- **Live URL:** [https://krubshowroom-production.up.railway.app](https://krubshowroom-production.up.railway.app)
- **Deployment:** Railway cloud (autodeploy from main branch)


**Deployment Configuration:**

-   **Platform:** Railway Cloud Platform
-   **Build Process:** Automatic build from Git repository
-   **Frontend:** Vue.js build served as static files
-   **Backend:** Express.js API with JSON file storage
-   **Environment:** Production with NODE_ENV=production
-   **CORS:** Configured for cross-origin requests

- **Build scripts:** See package.json for frontend/backend build commands

```json
{
	"build": "vite build && cd api-projects && npm install",
	"start": "cd api-projects && node server.js"
}
```

## 🧩 **API Endpoints**

| Method   | Endpoint               | Description              | Body           | Notes                      |
|----------|------------------------|--------------------------|----------------|----------------------------|
| GET      | `/api/projects`        | Get all projects         | -              | Supports search, pagination|
| GET      | `/api/projects?search=&page=&pageSize=` | List with search & pagination| - | Filters by title/tags      |
| POST     | `/api/projects`        | Create new project       | Project JSON   | Requires teacher key       |
| PUT      | `/api/projects/:id`    | Update project           | Project JSON   | Requires teacher key       |
| DELETE   | `/api/projects/:id`    | Delete project           | -              | Requires teacher key       |
| GET      | `/api/health`          | Health check             | -              | DB/API connection test     |

**Project Schema Example:**
```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Description...",
  "technologies": ["Vue.js", "Express.js"],
  "featured": true,
  "createdAt": "2025-09-27T10:00:00Z",
  "updatedAt": "2025-09-28T14:00:00Z"
}
```

## 🔍 **Features**

### Frontend
- SPA Routing (Vue Router)
- Featured/all projects toggle
- CRUD admin interface
- Search by title/technologies (tags clickable/filterable)
- Pagination controls (next/prev, page size)
- Error/loading/success states (skeletons optional)
- Dark theme, responsive, animations
- Button to test backend/db connection (`/api/health`)
- Professional contact form

### Backend
- RESTful API (Express.js, to be migrated to DB soon)
- File-based storage (migrating to SQL DB)
- Featured projects, sequential IDs
- Teacher authentication (admin key for write ops)
- Error handling, validation (title required)
- Health check endpoint
- Planned: seeds, migrations

---

## 🧪 **Testing**

- Test of CRUD endpoints (Jest/Supertest **or** Postman collection)
- Scripts and instructions in README
- Planned: Seed script for test/demo data

---

## 🦾 **Accessibility (a11y)**
- Visible focus
- Labels and inputs
- Color contrast ≥ 4.5:1
- Lighthouse score ≥ 90 (planned improvements)

---

## 💡 **Prueba tipo entrevista (README section)**

*You can choose and describe one advanced feature for interview-level demonstration:*
- **Login + rutas protegidas:** Implement authentication with JWT, profile & logout.
- **Optimistic UI + reintentos:** UI updates before response, rollback & retry on error.
- **Ordenación y filtros avanzados:** Sorting by createdAt/title, filtering by tags.
- **Accesibilidad rápida:** Focus management, aria-live, audit with Lighthouse.

---

## 📦 **Deliverables**

- Public repo with code (frontend + backend)
- Clear start instructions, `.env.example`
- Seed script for demo data
- Test collection/instructions
- Screenshots or GIF of list/create/search
- (Optional) URLs for live frontend and backend

---

## 💬 **Tips for development**

- Start with `/api/health` and frontend connection
- Seed data early for real testing
- Handle API errors from the beginning
- Update README as you build
- Keep UI simple (list + form)
- Your project is your personal showroom of Projects!

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

## 👤 **Developer**

- **GitHub:** [@krub-dev](https://github.com/krub-dev)
- **LinkedIn:** [Kiko Rubio Illán](https://linkedin.com/in/krub)
- **Portfolio:** [krub.dev](https://krub.dev)
- **Live Demo:** [krubSHOWROOM](https://krubshowroom-production.up.railway.app)

---

**Ironhack Web Development Bootcamp** - Module 3 Final Project  
**Deadline:** 6 October 2025  
**Status:** 🚧 In Progress  

---

### Lab Origin Reference

This project builds on previous Ironhack labs (Module 3, Week 2), extended and refactored to meet the requirements of the final bootcamp project. See [Labs Repo](https://github.com/krub-dev/Ironhack_DWEB_M3_W2_LABS) for historical previews versions.
