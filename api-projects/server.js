const express = require("express");
const cors = require("cors"); // Permite comunicación entre puertos diferentes
const path = require("path"); // Manejo de rutas multiplataforma (nativo Node.js)
const { PrismaClient } = require("@prisma/client"); // Prisma ORM client

const app = express();
const prisma = new PrismaClient(); // Initialize Prisma Client
const PORT = process.env.PORT || 3001; // Railway usa variable de entorno PORT

// CORS configuration for development and production
const corsOptions = {
	origin:
		process.env.NODE_ENV === "production"
			? process.env.FRONTEND_URL || "*"
			: "*", // Allow all origins in development
	credentials: true,
};

// Middlewares (como @Configuration en Spring Boot)
app.use(cors(corsOptions)); // Configuración de CORS para desarrollo y producción
app.use(express.json()); // Parsea JSON requests (como @RequestBody)

// Teacher authentication middleware
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || "ironhack2025";

app.use("/api/projects", (req, res, next) => {
	// Allow GET requests (read-only) without authentication
	if (req.method === "GET") {
		return next();
	}

	// For POST, PUT, DELETE - require teacher password
	const teacherKey = req.headers["x-teacher-key"];
	if (teacherKey !== TEACHER_PASSWORD) {
		return res.status(401).json({
			error: "CRUD operations require teacher authentication",
			message: "Please provide teacher access code in frontend",
		});
	}

	next();
});

// Serve static files from Vue build in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../dist")));
} else {
	// In development, inform users to use Vite dev server
	app.get("/", (req, res) => {
		res.json({
			message: "Backend API server running",
			notice: "For development, please access the frontend at http://localhost:5173",
			apiEndpoints: {
				health: "/api/health",
				projects: "/api/projects",
			},
		});
	});
}

// ENDPOINTS (como @GetMapping, @PostMapping...)

// GET /api/health - Health check endpoint
app.get("/api/health", async (req, res) => {
	try {
		// Test database connection with a simple query
		await prisma.$queryRaw`SELECT 1`;
		res.json({
			status: "ok",
			database: "connected",
			timestamp: new Date().toISOString(),
			message: "API and Database are healthy",
		});
	} catch (error) {
		console.error("Health check failed:", error);
		res.status(503).json({
			status: "error",
			database: "disconnected",
			timestamp: new Date().toISOString(),
			message: "Database connection failed",
			error: error.message,
		});
	}
});

// GET /api/projects - Leer todos con búsqueda y paginación
app.get("/api/projects", async (req, res) => {
	try {
		// Extract query parameters with defaults
		const search = req.query.search || "";
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 6;
		const featuredOnly = req.query.featured === "true"; // Filtro de featured

		// Build where clause for search (title or technologies)
		// For case-insensitive array search in PostgreSQL, we need to use raw SQL
		let where = {};
		let projects;
		let total;

		if (search) {
			const searchLower = search.toLowerCase();

			// Dos queries diferentes según featured o no
			if (featuredOnly) {
				// Con filtro featured
				projects = await prisma.$queryRaw`
					SELECT * FROM "Project"
					WHERE 
						featured = true
						AND (
							LOWER(title) LIKE ${`%${searchLower}%`}
							OR LOWER(description) LIKE ${`%${searchLower}%`}
							OR EXISTS (
								SELECT 1 FROM unnest(technologies) AS tech
								WHERE LOWER(tech) LIKE ${`%${searchLower}%`}
							)
						)
					ORDER BY id ASC
					LIMIT ${pageSize}
					OFFSET ${(page - 1) * pageSize}
				`;

				const countResult = await prisma.$queryRaw`
					SELECT COUNT(*)::int as count FROM "Project"
					WHERE 
						featured = true
						AND (
							LOWER(title) LIKE ${`%${searchLower}%`}
							OR LOWER(description) LIKE ${`%${searchLower}%`}
							OR EXISTS (
								SELECT 1 FROM unnest(technologies) AS tech
								WHERE LOWER(tech) LIKE ${`%${searchLower}%`}
							)
						)
				`;
				total = countResult[0].count;
			} else {
				// Sin filtro featured
				projects = await prisma.$queryRaw`
					SELECT * FROM "Project"
					WHERE 
						LOWER(title) LIKE ${`%${searchLower}%`}
						OR LOWER(description) LIKE ${`%${searchLower}%`}
						OR EXISTS (
							SELECT 1 FROM unnest(technologies) AS tech
							WHERE LOWER(tech) LIKE ${`%${searchLower}%`}
						)
					ORDER BY id ASC
					LIMIT ${pageSize}
					OFFSET ${(page - 1) * pageSize}
				`;

				const countResult = await prisma.$queryRaw`
					SELECT COUNT(*)::int as count FROM "Project"
					WHERE 
						LOWER(title) LIKE ${`%${searchLower}%`}
						OR LOWER(description) LIKE ${`%${searchLower}%`}
						OR EXISTS (
							SELECT 1 FROM unnest(technologies) AS tech
							WHERE LOWER(tech) LIKE ${`%${searchLower}%`}
						)
				`;
				total = countResult[0].count;
			}
		} else {
			// No search - use regular Prisma queries con filtro featured
			const whereClause = featuredOnly ? { featured: true } : {};

			total = await prisma.project.count({ where: whereClause });
			projects = await prisma.project.findMany({
				where: whereClause,
				skip: (page - 1) * pageSize,
				take: pageSize,
				orderBy: {
					id: "asc",
				},
			});
		}

		// Return data with pagination metadata
		res.json({
			data: projects,
			meta: {
				total,
				page,
				pageSize,
				totalPages: Math.ceil(total / pageSize),
				hasNextPage: page < Math.ceil(total / pageSize),
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		console.error("Error fetching projects:", error);
		res.status(500).json({ error: "Failed to fetch projects" });
	}
});

// POST /api/projects - Crear nuevo (como @PostMapping con Prisma)
app.post("/api/projects", async (req, res) => {
	try {
		// Validar que title sea obligatorio
		if (!req.body.title) {
			return res.status(400).json({ error: "Title is required" });
		}

		const newProject = await prisma.project.create({
			data: {
				title: req.body.title,
				description: req.body.description || "",
				image: req.body.image || null,
				technologies: req.body.technologies || [],
				rating: req.body.rating || 5,
				repo: req.body.repo || null,
				featured: req.body.featured || false,
			},
		});

		res.status(201).json(newProject);
	} catch (error) {
		console.error("Error creating project:", error);
		res.status(500).json({ error: "Failed to create project" });
	}
});

// PUT /api/projects/:id - Actualizar (como @PutMapping con Prisma)
app.put("/api/projects/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		// Validar que title sea obligatorio
		if (!req.body.title) {
			return res.status(400).json({ error: "Title is required" });
		}

		// Check if project exists
		const existingProject = await prisma.project.findUnique({
			where: { id },
		});

		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}

		const updatedProject = await prisma.project.update({
			where: { id },
			data: {
				title: req.body.title,
				description: req.body.description,
				image: req.body.image,
				technologies: req.body.technologies,
				rating: req.body.rating,
				repo: req.body.repo,
				featured: req.body.featured,
			},
		});

		res.json(updatedProject);
	} catch (error) {
		console.error("Error updating project:", error);
		res.status(500).json({ error: "Failed to update project" });
	}
});

// DELETE /api/projects/:id - Borrar (como @DeleteMapping con Prisma)
app.delete("/api/projects/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		// Check if project exists
		const existingProject = await prisma.project.findUnique({
			where: { id },
		});

		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}

		await prisma.project.delete({
			where: { id },
		});

		res.json({ message: "Project deleted successfully" });
	} catch (error) {
		console.error("Error deleting project:", error);
		res.status(500).json({ error: "Failed to delete project" });
	}
});

// Serve Vue app for any routes not handled by API (SPA fallback)
if (process.env.NODE_ENV === "production") {
	// Handle specific frontend routes that we know exist
	const frontendRoutes = ["/", "/home", "/projects", "/contact", "/crud"];

	frontendRoutes.forEach((route) => {
		app.get(route, (req, res) => {
			res.sendFile(path.join(__dirname, "../dist/index.html"));
		});
	});
}

// Start server (como main method)

// Catch-all para rutas no gestionadas por la API ni por las rutas frontend conocidas
if (process.env.NODE_ENV === "production") {
	app.get(/.*/, (req, res) => {
		res.sendFile(path.join(__dirname, "../dist/index.html"));
	});
}

// Graceful shutdown - Close Prisma connection on server shutdown
process.on("SIGINT", async () => {
	console.log("\nClosing Prisma connection...");
	await prisma.$disconnect();
	console.log("Prisma disconnected");
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("\nClosing Prisma connection...");
	await prisma.$disconnect();
	console.log("Prisma disconnected");
	process.exit(0);
});

app.listen(PORT, () => {
	console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
	console.log(`📊 Database: PostgreSQL with Prisma ORM`);
	console.log(`\n🔗 API Endpoints:`);
	console.log(`   Health: http://localhost:${PORT}/api/health`);
	console.log(`   Projects: http://localhost:${PORT}/api/projects`);

	if (process.env.NODE_ENV !== "production") {
		console.log(`\n⚠️  DEVELOPMENT MODE:`);
		console.log(`   Frontend (Vite): http://localhost:5173`);
		console.log(`   Backend (Express): http://localhost:${PORT}`);
		console.log(`   👉 Access the app at: http://localhost:5173\n`);
	}
});
