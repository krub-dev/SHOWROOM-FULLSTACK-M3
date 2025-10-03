# 🚀 SHOWROOM - Projects Portfolio

Professional full-stack web application developed during **Ironhack Web Development Course**. This project showcases a complete Vue.js frontend with Express.js backend, featuring advanced CRUD operations, featured projects system, and elegant dark UI design.

## 🌐 **Live SHOWROOM**

**🚀 Deployed Application:** [https://showroom-fullstack-m3-production.up.railway.app/](https://showroom-fullstack-m3-production.up.railway.app/)

**Platform:** Railway Cloud Deployment  
**Status:** ✅ Production Ready  
**Backend API:** Railway PostgreSQL with Prisma ORM  
**Database:** Managed PostgreSQL 14+ instance

The showroom includes:

-   🏠 **Home** (`/`) - Landing page with featured projects showcase
-   📋 **Projects** (`/projects`) - Complete projects list with search, pagination, and featured filter
-   📞 **Contact** (`/contact`) - Professional contact form with LinkedIn integration
-   ⚙️ **Admin Panel** (`/crud`) - Secure CRUD interface with teacher authentication and health check
-   📱 **Mobile Responsive** - Hamburger menu and mobile-optimized design

## 📋 **Project Overview**

### **What is SHOWROOM?**

SHOWROOM is a portfolio-style web app to manage and display your best projects.  
It features a full CRUD system, project search/filter by title and technologies, and real-time admin controls.

### **Key Features**

-   Full stack (Vue.js + Express.js)
-   Projects CRUD: create, view, edit, delete
-   Secure admin actions (teacher key authentication)
-   Featured projects system
-   List, detail, and admin forms
-   Search/filter by title and technologies (tags)
-   Server-side paginated project listing
-   Responsive design (mobile-first)
-   Professional contact form with LinkedIn
-   Animated transitions
-   Error and loading states in UI
-   Button to test backend/database connection
-   Deployed in production (Railway)

### **Tech Stack:**

-   **Frontend:** Vue.js 3 (Composition API), Vue Router, CSS3, HTML5
-   **Backend:** Node.js, Express.js, CORS
-   **Database:** PostgreSQL 14+ with Prisma ORM
-   **Data Layer:** Prisma Client, Migrations, Seeding
-   **UI/UX:** Dark theme, mobile-first, smooth animations
-   **Tools:** Vite, npm, Git, VS Code, Railway
-   **Deployment:** Railway (Frontend + Backend + PostgreSQL Database)

---

## 🏗️ **Directory Structure**

```
📁 SHOWROOM-FULLSTACK-M3/
├── 🖥️ Frontend (Vue.js)                     → http://localhost:5173 | Production: Railway
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.vue                    # Landing page with responsive design
│   │   │   ├── ProjectList.vue             # Projects list with search, pagination, skeleton loader
│   │   │   ├── ApiProjects.vue             # CRUD Manager with health check
│   │   │   ├── Contact.vue                 # Dark theme contact form
│   │   │   ├── NotFound404.vue             # 404 error page with animations
│   │   │   ├── LinkedInButton.vue          # Professional networking button
│   │   │   └── SkeletonLoader.vue          # Loading skeleton with shimmer effect
│   │   ├── router/
│   │   │   └── index.js                    # Vue Router configuration (/, /projects, /contact, /crud)
│   │   ├── assets/
│   │   │   ├── banner-krub.png             # Profile banner
│   │   │   ├── banner-showroom.png         # Project banner
│   │   │   └── krub-logo.png               # Logo image
│   │   ├── App.vue                         # Main app with hamburger menu navigation
│   │   ├── main.js                         # Vue app entry point
│   │   └── style.css                       # Global styles (focus-visible, prefers-reduced-motion)
│   ├── public/
│   │   └── krub-logo.png                   # Public assets
│   ├── index.html                          # HTML entry point
│   ├── vite.config.js                      # Vite config with /api proxy
│   └── package.json                        # Frontend dependencies
├── 🌐 Backend (Express API)                → http://localhost:3001 | Production: Railway
│   ├── prisma/
│   │   ├── schema.prisma                   # Database schema (Project model)
│   │   ├── seed.js                         # Database seeding with 10 projects
│   │   └── migrations/                     # Migration history (auto-generated)
│   ├── tests/
│   │   ├── server.test.js                  # Integration tests (Jest + Supertest)
│   │   └── run-tests.sh                    # Automated test runner script
│   ├── scripts/
│   │   └── (utility scripts)               # Helper scripts
│   ├── server.js                           # Express server with CRUD + SPA routing
│   ├── .env                                # Local environment variables (gitignored)
│   ├── .env.example                        # Environment template
│   └── package.json                        # Backend dependencies
├── Showroom_API.postman_collection.json    # Postman collection with 8 endpoints + tests
├── README.md                               # This file
└── .gitignore                              # Git ignore rules
```

---

## 🏗️ **Project Structure**

### Frontend Components

-   `App.vue` — Main application shell with responsive hamburger menu navigation.
-   `Home.vue` — Landing page featuring a professional showroom and elegant design.
-   `ProjectList.vue` — Display all/featured projects with search, pagination, error handling, and skeleton loader.
-   `ApiProjects.vue` — CRUD manager with teacher authentication, health check button, and comprehensive error handling.
-   `SkeletonLoader.vue` — Reusable loading skeleton component with shimmer animation effect.
-   `Contact.vue` — Dark theme contact form with LinkedIn integration.
-   `NotFound404.vue` — Custom 404 error page with animated elements.
-   `LinkedInButton.vue` — Reusable LinkedIn networking component.
-   `router/index.js` — Vue Router configuration with routes: `/`, `/projects`, `/contact`, `/crud`, and 404 fallback.
-   `style.css` — Global styles including focus-visible states and prefers-reduced-motion support.
-   `vite.config.js` — Dev server proxy: `/api` → `http://localhost:3001` for seamless local development.

### Backend Structure

-   `server.js` — Express server with full CRUD REST endpoints and SPA routing support.
-   `prisma/schema.prisma` — Database schema with Project model definition.
-   `prisma/seed.js` — Database seeding script with 10 sample projects.
-   `prisma/migrations/` — Database migration history (auto-generated).
-   `.env` — Local environment variables (DATABASE_URL, PORT, etc.)
-   `.env.example` — Template for environment configuration.
-   Data operations: Prisma ORM with PostgreSQL, full ACID compliance.
-   Authentication: Teacher key middleware for write operations.
-   CORS: Production-ready configuration.
-   Static file serving and SPA fallback.
-   Error handling and logging.
-   Data validation with Prisma (required fields, types).
-   Health check endpoint for monitoring.

## ⚡ **Quick Start**

### **Prerequisites:**

-   Node.js (v18+)
-   npm
-   PostgreSQL 14+ (local installation or Docker)

### **1. Clone & Install:**

```bash
git clone https://github.com/krub-dev/SHOWROOM-FULLSTACK-M3.git
cd SHOWROOM-FULLSTACK-M3

# Install frontend dependencies
npm install

# Install backend dependencies
cd api-projects
npm install
```

### **2. Database Setup (Local PostgreSQL):**

**Option A: Native PostgreSQL Installation (Recommended)**

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and set password
sudo -u postgres psql
CREATE DATABASE showroom;
ALTER USER postgres PASSWORD 'ironhack2025';
\q

# Verify connection
psql -U postgres -d showroom -h localhost
```

**Option B: Docker (Alternative)**

```bash
docker run --name showroom-postgres \
  -e POSTGRES_PASSWORD=ironhack2025 \
  -e POSTGRES_DB=showroom \
  -p 5432:5432 \
  -d postgres:16-alpine

# Verify container is running
docker ps
```

### **3. Configure Environment:**

```bash
# In api-projects/ directory
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://postgres:ironhack2025@localhost:5432/showroom"
```

### **4. Run Prisma Migrations & Seed:**

```bash
cd api-projects

# Generate Prisma Client
npx prisma generate

# Apply migrations (creates Project table)
npx prisma migrate dev

# Seed database with 10 sample projects
npm run seed

# Optional: Open Prisma Studio (visual database GUI)
npx prisma studio
# → Opens at http://localhost:5555
```

**Expected output:**

```
Starting seed...
Cleared existing projects
Created project: Minishell
Created project: sideForge Backend
...
Seed completed successfully!
```

### **5. Start Development Servers:**

**Terminal 1 - Frontend (Vue):**

```bash
# From project root
npm run dev
# → Frontend available at http://localhost:5173
```

**Terminal 2 - Backend (Express API):**

```bash
cd api-projects
npm run dev
# → API available at http://localhost:3001
```

### **6. Verify Everything Works:**

**Test Backend:**

```bash
# Health check
curl http://localhost:3001/api/health
# Expected: {"status":"ok","database":"connected",...}

# List projects
curl http://localhost:3001/api/projects | jq
# Expected: Array with 10 projects
```

**Access Points:**

-   **Frontend:** http://localhost:5173
-   **Backend API:** http://localhost:3001/api/projects
-   **Health Check:** http://localhost:3001/api/health
-   **Prisma Studio:** http://localhost:5555 (if running `npx prisma studio`)

---

## 🚀 **Production Deployment (Railway)**

### **Live Application:**

-   **Frontend + Backend:** [https://showroom-fullstack-m3-production.up.railway.app](https://showroom-fullstack-m3-production.up.railway.app)
-   **API Health:** [https://showroom-fullstack-m3-production.up.railway.app/api/health](https://showroom-fullstack-m3-production.up.railway.app/api/health)
-   **Projects Endpoint:** [https://showroom-fullstack-m3-production.up.railway.app/api/projects](https://showroom-fullstack-m3-production.up.railway.app/api/projects)

### **Deployment Setup:**

**1. Create PostgreSQL Database in Railway:**

-   Add "PostgreSQL" service to your Railway project
-   Railway automatically provides `DATABASE_URL` variable

**2. Configure Backend Service:**

Add these environment variables in Railway:

```bash
DATABASE_URL=<provided by Railway PostgreSQL service>
NODE_ENV=production
TEACHER_PASSWORD=<your-secure-password>
```

**3. Set Start Command:**

```bash
cd api-projects && npx prisma migrate deploy && node server.js
```

This command:

-   Applies database migrations on deploy
-   Starts the Express server

**4. Seed Production Database:**

Connect via Railway SSH:

```bash
railway ssh --project=<project-id> --environment=<env-id> --service=<service-id>

# Inside SSH session:
cd api-projects
export DATABASE_URL="<your-railway-database-url>"
npm run seed
```

**5. Verify Deployment:**

```bash
curl https://your-app.up.railway.app/api/health
curl https://your-app.up.railway.app/api/projects
```

### **Build Configuration:**

```json
{
	"build": "vite build && cd api-projects && npm install",
	"start": "cd api-projects && npx prisma migrate deploy && node server.js"
}
```

## 🧩 **API Endpoints**

| Method | Endpoint                                | Description                   | Auth Required | Notes                       |
| ------ | --------------------------------------- | ----------------------------- | ------------- | --------------------------- |
| GET    | `/api/projects`                         | Get all projects              | No            | Supports search, pagination |
| GET    | `/api/projects?search=&page=&pageSize=` | List with search & pagination | No            | Filters by title/tags       |
| POST   | `/api/projects`                         | Create new project            | Yes           | x-teacher-key header        |
| PUT    | `/api/projects/:id`                     | Update project                | Yes           | x-teacher-key header        |
| DELETE | `/api/projects/:id`                     | Delete project                | Yes           | x-teacher-key header        |
| GET    | `/api/health`                           | Health check                  | No            | DB/API connection test      |

**Request Body Schema (POST/PUT):**

```json
{
	"title": "Project Title", // Required: string
	"description": "Project description", // Required: string
	"image": "https://...", // Optional: string (URL)
	"technologies": ["Vue.js", "Node.js"], // Required: array of strings
	"rating": 5, // Optional: integer (default: 5)
	"repo": "https://github.com/...", // Optional: string (URL)
	"featured": false // Optional: boolean (default: false)
}
```

**Response Schema:**

```json
{
	"id": 1, // Auto-generated
	"title": "Project Title",
	"description": "Project description",
	"image": "https://...",
	"technologies": ["Vue.js", "Node.js"],
	"rating": 5,
	"repo": "https://github.com/...",
	"featured": false,
	"createdAt": "2025-10-03T10:00:00.000Z", // Auto-generated
	"updatedAt": "2025-10-03T10:00:00.000Z" // Auto-updated
}
```

**Authentication Header (for POST/PUT/DELETE):**

```bash
x-teacher-key: <your-teacher-password>
```

## 🔍 **Features**

### Frontend

-   SPA Routing (Vue Router)
-   Featured/all projects toggle
-   CRUD admin interface
-   Search by title/technologies (tags clickable/filterable)
-   Pagination controls (next/prev, page size)
-   **Error/loading/success states** with skeleton loaders
-   **Robust error handling** (see Error Handling section below)
-   Dark theme, responsive, animations with `prefers-reduced-motion`
-   Button to test backend/db connection (`/api/health`)
-   Professional contact form
-   **Accessibility features**: ARIA labels, focus-visible, WCAG 2.0 AA contrast

### Backend

-   RESTful API (Express.js with PostgreSQL + Prisma ORM)
-   Database persistence with migrations and seeding
-   Featured projects system
-   Teacher authentication (admin key for write operations)
-   **Comprehensive error handling** with specific HTTP status codes
-   Input validation (title required, rating 1-5, etc.)
-   Health check endpoint (`/api/health`)
-   Search with case-insensitive PostgreSQL queries
-   Server-side pagination with metadata

---

## 🛡️ **Error Handling**

The application implements comprehensive error handling as required, with **clear and recoverable error messages** for different HTTP status codes:

### **HTTP Status Codes Handled:**

| Status  | Scenario              | User Message                                                            | Recovery Action                            |
| ------- | --------------------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| **400** | Invalid request data  | "Invalid data. Please check all required fields."                       | Form preserved, user can correct and retry |
| **401** | Authentication failed | "Authentication failed. Please verify your teacher access code."        | User can re-enter correct password         |
| **404** | Resource not found    | "Not found. Server may be unavailable / Project may have been deleted." | Retry button available                     |
| **500** | Server error          | "Server error. Please try again in a few moments."                      | Retry button available                     |

### **Error Handling Features:**

**ProjectList.vue (Public view):**

-   ⚠️ Large error icon with descriptive message
-   🔄 **Retry button** to attempt loading again
-   Preserves search query and filter state
-   Graceful degradation when backend is unavailable

**ApiProjects.vue (Admin panel):**

-   **Form data preserved** on error (no data loss)
-   Specific error messages for create/update/delete operations
-   Visual feedback with color-coded alerts
-   Prevents accidental data loss

**Backend error responses:**

-   Structured JSON error messages
-   Appropriate HTTP status codes
-   Detailed error information in development mode
-   Sanitized error messages in production

### **Testing Error Scenarios:**

```bash
# Test 500 - Backend unavailable
pkill -f "node.*server.js"
# Visit http://localhost:5173 → See error message + retry button

# Test 401 - Wrong authentication
# Go to /crud → Enter wrong password → See auth error

# Test 404 - Non-existent project
curl http://localhost:3001/api/projects/99999

# Test 400 - Invalid data
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "x-teacher-key: ironhack2025" \
  -d '{"description":"Missing title"}'
```

---

## 🧪 **Testing**

### **Postman Collection**

A complete Postman collection is included: **`Showroom_API.postman_collection.json`**

**Features:**

-   ✅ All CRUD endpoints (GET, POST, PUT, DELETE)
-   ✅ Health check endpoint
-   ✅ Search and pagination examples
-   ✅ Featured filter example
-   ✅ Automated test scripts for each request
-   ✅ Pre-configured environment variables
-   ✅ Authentication headers setup

**Endpoints included:**

1. **Health Check** - Verify API and database connection
2. **Get All Projects** - With pagination support
3. **Search Projects** - By title, description, or technology
4. **Get Featured Projects** - Filter by featured status
5. **Create Project** - POST with authentication
6. **Update Project** - PUT with authentication
7. **Delete Project** - DELETE with authentication
8. **Test Auth Required** - Negative test (should fail without auth)

**How to use:**

1. Import `Showroom_API.postman_collection.json` to Postman
2. Collection variables are pre-configured:
    - `base_url`: Railway production URL (change to `http://localhost:3001` for local)
    - `teacher_key`: `ironhack2025`
3. Run individual requests or use Postman's Collection Runner
4. All requests include automated tests that verify responses

**Running tests:**

```bash
# Install Newman (Postman CLI) - optional
npm install -g newman

# Run collection from command line
newman run Showroom_API.postman_collection.json
```

### **Integration Tests (Jest + Supertest)**

The project includes automated integration tests that validate all CRUD operations against a real API server and PostgreSQL database.

**Test Suite Coverage:**

-   ✅ Health check endpoint validation
-   ✅ GET all projects with pagination (11 passing tests)
-   ✅ Search functionality
-   ✅ Featured projects filter
-   ✅ Authentication validation (401 errors)
-   ✅ Input validation (400 errors)
-   ✅ Not found errors (404 errors)
-   ⚠️ Create/Update/Delete operations (require sequence reset in test environment)

**Running integration tests:**

```bash
cd api-projects

# Option 1: Use the automated test runner script (recommended)
npm run test:integration

# Option 2: Use the shell script directly
cd tests && ./run-tests.sh

# Option 3: Manual approach
# Start server in one terminal
npm start

# Run tests in another terminal
npm test
```

**Test Results:**

```
✅ 11/14 tests passing (79% coverage)
   - All GET operations ✓
   - Authentication validation ✓
   - Error handling ✓
   - Input validation ✓
```

**Note:** The integration tests run against a real PostgreSQL database. The POST/PUT/DELETE tests currently encounter ID sequence issues in the test environment, but all core CRUD operations work correctly in development and production environments.

---

## 🦾 **Accessibility (a11y)**

-   Visible focus
-   Labels and inputs
-   Color contrast ≥ 4.5:1
-   Lighthouse score ≥ 90 (planned improvements)

---

## 💡 **Prueba tipo entrevista (README section)**

_You can choose and describe one advanced feature for interview-level demonstration:_

-   **Login + rutas protegidas:** Implement authentication with JWT, profile & logout.
-   **Optimistic UI + reintentos:** UI updates before response, rollback & retry on error.
-   **Ordenación y filtros avanzados:** Sorting by createdAt/title, filtering by tags.
-   **Accesibilidad rápida:** Focus management, aria-live, audit with Lighthouse.

---

## 📦 **Deliverables**

-   Public repo with code (frontend + backend)
-   Clear start instructions, `.env.example`
-   Seed script for demo data
-   Test collection/instructions
-   Screenshots or GIF of list/create/search
-   (Optional) URLs for live frontend and backend

---

## 💬 **Tips for development**

-   Start with `/api/health` and frontend connection
-   Seed data early for real testing
-   Handle API errors from the beginning
-   Update README as you build
-   Keep UI simple (list + form)
-   Your project is your personal showroom of Projects!

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
-   ✅ **PostgreSQL Database** - Robust, production-grade database with ACID compliance
-   ✅ **Prisma ORM** - Type-safe database client with migrations and seeding
-   ✅ **SPA Routing Support** - Express middleware for Vue Router fallback
-   ✅ **Error Handling** - Comprehensive error responses and logging
-   ✅ **Featured Projects** - Backend support for featured/regular categorization
-   ✅ **Express Middleware** - Static file serving, JSON parsing, request validation
-   ✅ **Auto-incremental IDs** - Database-managed primary keys
-   ✅ **Railway Integration** - Production-ready deployment with managed PostgreSQL
-   ✅ **Database Seeding** - Pre-populated with 10 sample projects
-   ✅ **Prisma Studio** - Visual database management tool
-   ✅ **Teacher Authentication Middleware** - All write operations protected by teacher key (x-teacher-key header)
-   ✅ **Health Check Endpoint** - `/api/health` returns database connection status
-   ✅ **Data Validation** - Title required on POST/PUT; schema-level constraints
-   ✅ **Graceful Shutdown** - Proper Prisma client disconnection on server stop
-   ✅ **Independent Environments** - Local and production databases are completely separate
-   ✅ **Search & Pagination** - Case-insensitive PostgreSQL queries with server-side pagination (6 items per page)
-   ✅ **Skeleton Loader** - Shimmer loading effect during data fetching for improved UX

### **Advanced Features:**

-   🌟 **Dynamic Project Filtering** - Real-time toggle between featured and all projects
-   🔧 **Admin Dashboard** - Complete project management with dropdown interface
-   📊 **Color-coded Notifications** - Visual feedback for CRUD operations
-   🎨 **Homogeneous Design** - Consistent styling across all components
-   ⚡ **Real-time Updates** - Instant UI updates after API operations
-   📱 **Mobile Optimization** - Touch-friendly interface with proper spacing

---

## 👤 **Developer**

-   **GitHub:** [@krub-dev](https://github.com/krub-dev)
-   **LinkedIn:** [Kiko Rubio Illán](https://linkedin.com/in/krub)
-   **Portfolio:** [krub.dev](https://krub.dev)
-   **Live Demo:** [krubSHOWROOM](https://krubshowroom-production.up.railway.app)

---

**Ironhack Web Development Bootcamp** - Module 3 Final Project  
**Completed:** 4 October 2025  
**Status:** ✅ Production Ready & Deployed

---

### Lab Origin Reference

This project builds on previous Ironhack labs (Module 3, Week 2), extended and refactored to meet the requirements of the final bootcamp project. See [Labs Repo](https://github.com/krub-dev/Ironhack_DWEB_M3_W2_LABS) for historical previews versions.
