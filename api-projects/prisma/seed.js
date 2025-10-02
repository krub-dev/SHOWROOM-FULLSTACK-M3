const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const projects = [
	{
		id: 1,
		title: "Minishell",
		description:
			"A minimal Unix shell written in C for 42 Barcelona. Handles parsing, execution, pipes, redirections, and process management.",
		image: "https://miro.medium.com/0*NsEzq9V2YGD6ocBH",
		technologies: ["C", "Unix", "Shell", "Processes", "42"],
		rating: 5,
		repo: "https://github.com/krub-dev/42-MINISHELL",
		featured: true,
	},
	{
		id: 2,
		title: "sideForge Backend",
		description:
			"RESTful API in Java (Spring Boot) for managing and customizing 3D assets (t-shirts, mugs, etc.) in web apps. Supports user accounts, asset management, and flexible design with colors, materials, logos, and texts.",
		image: "https://github.com/krub-dev/sideForge/blob/main/assets/logo/sideForge-logo-yunque.jpg?raw=true",
		rating: 5,
		repo: "https://github.com/krub-dev/sideForge",
		featured: true,
		technologies: [
			"Java",
			"Spring Boot",
			"MySQL",
			"REST API",
			"Postman",
			"Swagger",
			"IronHack",
		],
	},
	{
		id: 3,
		title: "IronBooking",
		description:
			"Spring Boot backend for managing bookings and reviews of apartments, offices, and studios. Supports owners (listing properties) and clients (making reservations), with endpoints for places, users, and reviews. Focused on RESTful API and backend architecture.",
		image: "https://img.freepik.com/free-vector/flat-hotel-review-background_23-2148161099.jpg",
		technologies: ["Java", "Spring Boot", "MySQL", "IronHack"],
		rating: 5,
		repo: "https://github.com/krub-dev/IronBooking",
		featured: true,
	},
	{
		id: 4,
		title: "Push_Swap",
		description:
			"A 42 project in C. The goal is to sort a stack of integers using a limited set of operations and the smallest possible number of moves. The project involves algorithmic sorting (RadixSort), stack manipulation, and optimization.",
		image: "https://www.crio.do/blog/content/images/2022/02/Sorting-Algorithms.png",
		technologies: ["C", "Algorithms", "Stacks", "Radix", "42"],
		rating: 4,
		repo: "https://github.com/krub-dev/42-PUSH_SWAP",
		featured: false,
	},
	{
		id: 5,
		title: "So_Long",
		description:
			"A simple 2D game developed in C for 42. The player must collect all collectibles and reach the exit while avoiding enemies. Features map parsing, player movement, basic enemy AI, and graphics rendered with MLX42 (CODAM).",
		image: "https://camo.githubusercontent.com/42783b7d03ea9f487526a2a335a832178f0211d30f0941ea59e0ee91d52daa31/68747470733a2f2f69696c692e696f2f326d61593662492e706e67",
		rating: 4,
		repo: "https://github.com/krub-dev/42-SO_LONG",
		featured: false,
		technologies: ["C", "MiniLibX", "MLX42", "CODAM", "Game Dev", "42"],
	},
	{
		id: 6,
		title: "VUE Labs Practice Framework",
		description: "New Framework learn: VUE",
		image: "https://www.proun.es/wp-content/uploads/fly-images/14699/React_native_vs_Vue-1270x0.jpg",
		rating: 5,
		repo: "https://github.com/krub-dev/Ironhack_DWEB_M3_W2_LABS",
		featured: false,
		technologies: ["Vue.js", "JS", "Express.js", "Node.js"],
	},
	{
		id: 7,
		title: "E-commerce Platform",
		description:
			"Full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with MERN stack and Stripe API.",
		image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
		technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
		rating: 5,
		repo: "https://github.com/krub-dev/ecommerce-platform",
		featured: true,
	},
	{
		id: 8,
		title: "Weather Dashboard",
		description:
			"Real-time weather dashboard with forecasts, maps, and weather alerts. Integrates with OpenWeather API for accurate data.",
		image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
		technologies: ["Vue.js", "TypeScript", "Tailwind", "API Integration"],
		rating: 4,
		repo: "https://github.com/krub-dev/weather-dashboard",
		featured: false,
	},
	{
		id: 9,
		title: "Task Management System",
		description:
			"Collaborative task management tool with real-time updates, team workspaces, and Kanban boards. Perfect for agile teams.",
		image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
		technologies: ["React", "Firebase", "Material-UI", "WebSockets"],
		rating: 5,
		repo: "https://github.com/krub-dev/task-manager",
		featured: true,
	},
	{
		id: 10,
		title: "Blog CMS",
		description:
			"Modern content management system for bloggers with markdown support, SEO optimization, and analytics dashboard.",
		image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
		technologies: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
		rating: 4,
		repo: "https://github.com/krub-dev/blog-cms",
		featured: false,
	},
];

async function main() {
	console.log("🌱 Starting seed...");

	// Clear existing data
	await prisma.project.deleteMany();
	console.log("🗑️  Cleared existing projects");

	// Insert projects
	for (const project of projects) {
		await prisma.project.create({
			data: project,
		});
		console.log(`✅ Created project: ${project.title}`);
	}

	console.log("🎉 Seed completed successfully!");
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
