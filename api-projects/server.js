const express = require("express");
const cors = require("cors"); // Permite comunicación entre puertos diferentes
const fs = require("fs"); // File System - leer/escribir archivos (nativo Node.js)
const path = require("path"); // Manejo de rutas multiplataforma (nativo Node.js)

const app = express();
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
}

// Path al archivo JSON (como H2 database)
// __dirname = carpeta actual (/api-projects/)
// '../src/data/projects.json' = subir una carpeta, luego src/data/projects.json
const projectsFile = path.join(__dirname, "../src/data/projects.json");

// Leer proyectos del archivo (como findAll() en Spring Data)
function readProjects() {
	try {
		// fs.readFileSync - lee archivo completo de forma síncrona
		// 'utf8' - codificación de texto para caracteres especiales (ñ, á, etc.)
		const data = fs.readFileSync(projectsFile, "utf8");
		return JSON.parse(data); // Convierte string JSON a objeto JavaScript
	} catch (error) {
		console.error("Error reading projects:", error);
		return []; // Retorna array vacío si hay error
	}
}

// Escribir proyectos al archivo (como save() en Spring Data)
function writeProjects(projects) {
	try {
		// JSON.stringify(projects, null, 2) - convierte a JSON con formato bonito (indentado)
		fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
		return true;
	} catch (error) {
		console.error("Error writing projects:", error);
		return false;
	}
}

// ENDPOINTS (como @GetMapping, @PostMapping...)

// GET /api/projects - Leer todos (como @GetMapping)
app.get("/api/projects", (req, res) => {
	const projects = readProjects();
	res.json(projects);
});

// POST /api/projects - Crear nuevo (como @PostMapping)
app.post("/api/projects", (req, res) => {
	const projects = readProjects();

	// Generate next sequential ID
	const maxId =
		projects.length > 0 ? Math.max(...projects.map((p) => p.id || 0)) : 0;
	const newProject = {
		...req.body,
		id: maxId + 1,
	};
	projects.push(newProject);

	if (writeProjects(projects)) {
		res.status(201).json(newProject);
	} else {
		res.status(500).json({ error: "Failed to create project" });
	}
});

// PUT /api/projects/:id - Actualizar (como @PutMapping)
app.put("/api/projects/:id", (req, res) => {
	const projects = readProjects();
	const id = parseInt(req.params.id);
	const index = projects.findIndex((p) => p.id === id);

	if (index === -1) {
		return res.status(404).json({ error: "Project not found" });
	}

	projects[index] = { ...req.body, id };

	if (writeProjects(projects)) {
		res.json(projects[index]);
	} else {
		res.status(500).json({ error: "Failed to update project" });
	}
});

// DELETE /api/projects/:id - Borrar (como @DeleteMapping)
app.delete("/api/projects/:id", (req, res) => {
	const projects = readProjects();
	const id = parseInt(req.params.id);
	const filteredProjects = projects.filter((p) => p.id !== id);

	if (projects.length === filteredProjects.length) {
		return res.status(404).json({ error: "Project not found" });
	}

	if (writeProjects(filteredProjects)) {
		res.json({ message: "Project deleted successfully" });
	} else {
		res.status(500).json({ error: "Failed to delete project" });
	}
});

// Serve Vue app for any routes not handled by API (SPA fallback)
if (process.env.NODE_ENV === "production") {
	// Handle specific frontend routes that we know exist
	const frontendRoutes = [
		"/",
		"/home",
		"/projects",
		"/contact",
		"/api-projects",
	];

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

app.listen(PORT, () => {
	console.log(`🚀 API Server running on http://localhost:${PORT}`);
	console.log(
		`📡 API endpoints available at http://localhost:${PORT}/api/projects`
	);
});
