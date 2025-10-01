import { createRouter, createWebHistory } from "vue-router";

// Importamos los componentes que usaremos como páginas
import Home from "../components/Home.vue";
import ProjectList from "../components/ProjectList.vue";
import Contact from "../components/Contact.vue";
import ApiProjects from "../components/ApiProjects.vue";
import NotFound404 from "../components/NotFound404.vue";

// Definimos las rutas de nuestra aplicación
const routes = [
	{
		path: "/", // La URL raíz "/"
		name: "Home", // Nombre de la ruta
		component: Home, // Componente que se muestra
	},
	{
		path: "/home", // URL alternativa "/home"
		redirect: "/", // Redirige automáticamente a "/"
	},
	{
		path: "/projects", // URL "/projects"
		name: "Projects", // Nombre de la ruta
		component: ProjectList,
	},
	{
		path: "/contact", // URL "/contact"
		name: "Contact", // Nombre de la ruta
		component: Contact,
	},
	{
		path: "/api-projects", // URL "/api-projects" - CRUD con API Express
		name: "ApiProjects", // Nombre de la ruta
		component: ApiProjects,
	},
	{
		// Ruta comodín: captura cualquier URL que no coincida con las anteriores
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: NotFound404,
	},
];

// Creamos el router con nuestras rutas
const router = createRouter({
	// Usamos el historial del navegador (URLs limpias sin #)
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
