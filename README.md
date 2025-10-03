# 🚀 SHOWROOM - Projects Portfolio

Professional full-stack web application developed during **Ironhack Web Development Course**. This project showcases a complete Vue.js frontend with Express.js backend, featuring advanced CRUD operations, featured projects system, and elegant dark UI design.

## 🌐 **Live SHOWROOM**

**🚀 Deployed Application:** [https://showroom-fullstack-m3-production.up.railway.app/](https://showroom-fullstack-m3-production.up.railway.app/)

**Platform:** Railway Cloud Deployment  
**Status:** ✅ Production Ready  
**Backend API:** Railway PostgreSQL with Prisma ORM  
**Database:** Managed PostgreSQL 14+ instance

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

-   `App.vue` — Main application shell with responsive hamburger menu navigation.
-   `Home.vue` — Landing page featuring a professional showroom and elegant design.
-   `ProjectList.vue` — Display all/featured projects (consumes /api/projects).
-   `ApiProjects.vue` — CRUD manager with teacher authentication and health check button.
-   `Contact.vue` — Dark theme contact form with LinkedIn integration.
-   `NotFound404.vue` — Custom 404 error page.
-   `LinkedInButton.vue` — Reusable LinkedIn networking component.
-   `vite.config.js` — Dev server proxy: /api → http://localhost:3001 for seamless local development.

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
npx prisma migrate deploy

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
-   Error/loading/success states (skeletons optional)
-   Dark theme, responsive, animations
-   Button to test backend/db connection (`/api/health`)
-   Professional contact form

### Backend

-   RESTful API (Express.js, to be migrated to DB soon)
-   File-based storage (migrating to SQL DB)
-   Featured projects, sequential IDs
-   Teacher authentication (admin key for write ops)
-   Error handling, validation (title required)
-   Health check endpoint
-   Planned: seeds, migrations

---

## 🧪 **Testing**

-   Test of CRUD endpoints (Jest/Supertest **or** Postman collection)
-   Scripts and instructions in README
-   Planned: Seed script for test/demo data

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
-   🔍 **Search & Pagination** - (Planned) Efficient queries with Prisma filters

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
**Deadline:** 6 October 2025  
**Status:** 🚧 In Progress

---

### Lab Origin Reference

This project builds on previous Ironhack labs (Module 3, Week 2), extended and refactored to meet the requirements of the final bootcamp project. See [Labs Repo](https://github.com/krub-dev/Ironhack_DWEB_M3_W2_LABS) for historical previews versions.
