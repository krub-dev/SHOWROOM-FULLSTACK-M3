<script setup>
import { ref, computed, onMounted } from "vue";
import SkeletonLoader from "./SkeletonLoader.vue";

const openAccordion = ref(null);
const showOnlyFeatured = ref(true);
const projects = ref([]); // Proyectos paginados desde la API

// Búsqueda y paginación
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(6);
const totalPages = ref(1);
const totalProjects = ref(0);
const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

let searchTimeout = null;

// Función para cargar proyectos desde la API con búsqueda y paginación
async function loadProjects() {
	isLoading.value = true;
	hasError.value = false;
	errorMessage.value = "";
	try {
		// Construir query params
		const params = new URLSearchParams({
			search: searchQuery.value,
			page: currentPage.value.toString(),
			pageSize: pageSize.value.toString(),
		});

		// Agregar filtro de featured si está activo
		if (showOnlyFeatured.value) {
			params.append("featured", "true");
		}

		const response = await fetch(`/api/projects?${params}`);

		if (!response.ok) {
			// Intentar parsear mensaje de error del backend
			let errorMsg = "Error loading projects";
			try {
				const errorData = await response.json();
				errorMsg = errorData.error || errorData.message || errorMsg;
			} catch (e) {
				// Si no hay JSON, usar mensaje por status code
				if (response.status === 404) {
					errorMsg =
						"Projects not found. The server may be unavailable.";
				} else if (response.status === 500) {
					errorMsg =
						"Server error. Please try again in a few moments.";
				} else if (response.status === 400) {
					errorMsg =
						"Invalid request. Please check your search parameters.";
				} else {
					errorMsg = `Error ${response.status}: Unable to load projects`;
				}
			}
			throw new Error(errorMsg);
		}

		const data = await response.json();
		projects.value = data.data;
		totalPages.value = data.meta.totalPages;
		totalProjects.value = data.meta.total;
	} catch (error) {
		console.error("Error loading projects:", error);
		hasError.value = true;
		errorMessage.value =
			error.message || "Failed to load projects. Please try again.";
	} finally {
		isLoading.value = false;
	}
}

// Llama a la función al montar el componente
onMounted(() => {
	loadProjects();
});

function toggleAccordion(index) {
	openAccordion.value = openAccordion.value === index ? null : index;
}

function toggleFeatured() {
	// El v-model ya cambió el valor, solo recargamos
	openAccordion.value = null; // Close any open accordion when switching
	currentPage.value = 1; // Reset a página 1
	loadProjects(); // Recargar proyectos con filtro
}

// Búsqueda con debounce (espera 500ms después de dejar de escribir)
function handleSearch() {
	if (searchTimeout) clearTimeout(searchTimeout);

	searchTimeout = setTimeout(() => {
		currentPage.value = 1; // Reset a página 1 al buscar
		openAccordion.value = null; // Cerrar accordions al buscar
		loadProjects();
	}, 500);
}

// Función para buscar por tecnología (click en tag)
function searchByTech(tech) {
	searchQuery.value = tech;
	currentPage.value = 1;
	openAccordion.value = null;
	loadProjects();
}

// Navegación de páginas
function nextPage() {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
		openAccordion.value = null;
		loadProjects();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}

function prevPage() {
	if (currentPage.value > 1) {
		currentPage.value--;
		openAccordion.value = null;
		loadProjects();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}

function goToPage(page) {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
		openAccordion.value = null;
		loadProjects();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}
</script>

<template>
	<div class="projects-list">
		<div class="projects-main-title">
			<h3 class="projects-title">
				{{ showOnlyFeatured ? "Featured Projects" : "All Projects" }}
			</h3>
		</div>

		<!-- Barra de búsqueda y filtros -->
		<div class="search-and-filters">
			<p class="projects-subtitle" v-if="totalProjects > 0 && !isLoading">
				{{ totalProjects }}
				{{ totalProjects === 1 ? "project" : "projects" }} found
			</p>

			<div class="search-controls">
				<div class="search-container">
					<input
						v-model="searchQuery"
						@input="handleSearch"
						type="text"
						placeholder="🔍 Search projects by title, description or technology..."
						class="search-input"
						:disabled="isLoading"
						aria-label="Search projects by title, description or technology"
					/>
					<button
						v-if="searchQuery"
						@click="
							searchQuery = '';
							handleSearch();
						"
						class="clear-search-btn"
						title="Clear search"
					>
						✕
					</button>
				</div>

				<div class="featured-filter">
					<label for="featured-filter" class="checkbox-label">
						<input
							id="featured-filter"
							type="checkbox"
							v-model="showOnlyFeatured"
							@change="toggleFeatured"
							class="featured-checkbox"
						/>
						<span class="checkbox-text">Featured only</span>
					</label>
				</div>
			</div>
		</div>

		<!-- Estado de loading -->
		<SkeletonLoader v-if="isLoading" :count="3" />

		<!-- Error State -->
		<div v-if="hasError" class="error-state">
			<div class="error-icon">⚠️</div>
			<p class="error-message">{{ errorMessage }}</p>
			<button @click="loadProjects" class="retry-btn">🔄 Retry</button>
		</div>
		<!-- Sin resultados -->
		<div v-else-if="projects.length === 0" class="no-results">
			<p>🔍 No projects found</p>
			<p v-if="searchQuery" class="no-results-hint">
				Try searching with different keywords
			</p>
		</div>

		<!-- Lista de proyectos -->
		<div
			v-else
			v-for="(project, idx) in projects"
			:key="project.id"
			class="project-accordion"
		>
			<div class="accordion-wrapper">
				<button class="accordion-header" @click="toggleAccordion(idx)">
					<span class="project-title">{{ project.title }}</span>
					<span class="arrow" :class="{ open: openAccordion === idx }"
						>&#9660;</span
					>
				</button>
				<div v-if="openAccordion === idx" class="accordion-body">
					<div class="project-info">
						<p>{{ project.description }}</p>
						<div class="tech-list">
							<button
								v-for="tech in project.technologies"
								:key="tech"
								class="tech-chip"
								@click="searchByTech(tech)"
								:title="`Search for ${tech} projects`"
							>
								{{ tech }}
							</button>
						</div>
						<div class="project-img-row">
							<img
								:src="project.image"
								:alt="project.title"
								class="project-img"
							/>
						</div>
						<div class="project-links-row">
							<a
								v-if="project.repo"
								:href="project.repo"
								class="repo-btn"
								target="_blank"
								rel="noopener noreferrer"
							>
								Repo
							</a>
							<div class="rating">
								{{ project.rating }} / 5 ⭐
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Controles de paginación -->
		<div v-if="totalPages > 1 && !isLoading" class="pagination-controls">
			<button
				@click="prevPage"
				:disabled="currentPage === 1"
				class="pagination-btn"
			>
				← Previous
			</button>

			<div class="pagination-info">
				<span class="page-numbers">
					<button
						v-for="page in totalPages"
						:key="page"
						@click="goToPage(page)"
						:class="[
							'page-number',
							{ active: page === currentPage },
						]"
					>
						{{ page }}
					</button>
				</span>
				<span class="page-text">
					Page {{ currentPage }} of {{ totalPages }}
				</span>
			</div>

			<button
				@click="nextPage"
				:disabled="currentPage === totalPages"
				class="pagination-btn"
			>
				Next →
			</button>
		</div>
	</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap");
.projects-title {
	color: #1e1e1e;
	font-size: 2.5em;
	margin: 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 900;
	letter-spacing: 0.08em;
	text-shadow: 2px 4px 12px rgba(30, 30, 30, 0.18);
	text-transform: uppercase;
	display: inline-block;
	animation: fadeInDown 1s cubic-bezier(0.77, 0, 0.18, 1) both;
}

.projects-main-title {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 4em;
	margin-bottom: 1em;
}

.projects-subtitle {
	color: #888;
	font-size: 0.8em;
	margin: 0 0 0.4rem 0;
	font-weight: 500;
	width: 100%;
	text-align: left;
}

/* Barra de búsqueda y filtros */
.search-and-filters {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 1rem;
	width: 90%;
	margin-left: auto;
	margin-right: auto;
}

.search-controls {
	display: flex;
	gap: 1rem;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
}

.search-container {
	flex: 0 1 auto;
	min-width: 280px;
	max-width: 450px;
	position: relative;
	display: flex;
	align-items: center;
}

.search-input {
	width: 100%;
	padding: 0.7rem 2.5rem 0.7rem 1rem;
	font-size: 0.95rem;
	border: 2px solid #ddd;
	border-radius: 8px;
	background: #ffffff;
	color: #1e1e1e;
	transition: all 0.3s ease;
}

.search-input:focus {
	outline: none;
	border-color: #f5ca1c;
	box-shadow: 0 2px 8px rgba(245, 202, 28, 0.2);
}

.search-input:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.clear-search-btn {
	position: absolute;
	right: 0.5rem;
	background: none;
	border: none;
	color: #999;
	font-size: 1.2rem;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	transition: all 0.2s ease;
}

.clear-search-btn:hover {
	background: #f0f0f0;
	color: #1e1e1e;
}

.checkbox-label {
	display: flex;
	align-items: center;
	gap: 0.6rem;
	cursor: pointer;
	user-select: none;
	padding: 0.7rem 1rem;
	border-radius: 8px;
	background: transparent;
	border: 2px solid transparent;
	transition: all 0.2s ease;
}

.checkbox-label:hover {
	background: rgba(255, 255, 255, 0.1);
}

.featured-checkbox {
	width: 1.2rem;
	height: 1.2rem;
	cursor: pointer;
	accent-color: #f5ca1c;
	transition: transform 0.2s ease;
}

.featured-checkbox:hover {
	transform: scale(1.1);
}

.checkbox-text {
	font-size: 0.9rem;
	font-weight: 600;
	color: #1e1e1e;
	white-space: nowrap;
	font-family: "Montserrat", sans-serif;
}

/* Estados de loading/error */
.loading-state,
.error-state,
.no-results {
	text-align: center;
	padding: 3em 2em;
	color: #888;
}

.spinner {
	width: 50px;
	height: 50px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #f5ca1c;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 0 auto 1em;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.error-icon {
	font-size: 3em;
	margin-bottom: 0.5em;
}

.error-message {
	color: #d32f2f;
	font-weight: 600;
	margin-bottom: 1em;
	font-size: 1.1em;
}

.retry-btn {
	background: #d32f2f;
	color: white;
	border: none;
	padding: 0.7em 1.5em;
	border-radius: 6px;
	cursor: pointer;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	transition: all 0.3s ease;
}

.retry-btn:hover {
	background: #b71c1c;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(211, 47, 47, 0.3);
}

.no-results {
	font-size: 1.2em;
}

.no-results-hint {
	font-size: 0.9em;
	color: #999;
	margin-top: 0.5em;
}

.projects-list {
	width: 90%;
	margin: 0 auto;
}

.project-accordion {
	margin-bottom: 1.5em;
}

.accordion-wrapper {
	width: 90%;
	margin: 0 auto;
	border-radius: 12px;
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #333;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	transition: all 0.3s ease;
}

.accordion-wrapper:hover {
	border-color: #f5ca1c;
	transform: translateY(-3px);
	box-shadow: 0 6px 20px rgba(245, 202, 28, 0.15);
}

.accordion-header {
	width: 100%;
	background: #2d2d2d;
	color: #f5ca1c;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	font-size: 1.2em;
	padding: 1.5em 2em;
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
}

.accordion-header:hover {
	background: #333;
	color: #fff;
}

.project-title {
	letter-spacing: 0.05em;
	font-weight: 700;
}

.arrow {
	transition: transform 0.3s ease;
	font-size: 1.2em;
	color: #f5ca1c;
}

.arrow.open {
	transform: rotate(180deg);
}

.accordion-body {
	background: #1e1e1e;
	color: #e0e0e0;
	padding: 2em;
	border-top: 1px solid #333;
}

.project-img-row {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1.2em 0 0.5em 0;
}

.project-img {
	width: 90%;
	max-width: 450px;
	max-height: 250px;
	object-fit: cover;
	border-radius: 12px;
	background: #eee;
	box-shadow: 0 2px 8px rgba(30, 30, 30, 0.18);
	display: block;
}

.project-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
	min-height: 80px;
	justify-content: space-between;
}

.project-links-row {
	display: flex;
	flex: 1;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	margin-top: 1.2em;
	gap: 1em;
}
.repo-btn {
	background: #f5ca1c;
	color: #1e1e1e;
	font-weight: 700;
	font-family: "Montserrat", sans-serif;
	border: none;
	border-radius: 6px;
	padding: 0.4em 1.1em;
	text-decoration: none;
	font-size: 1em;
	box-shadow: 0 1px 4px rgba(30, 30, 30, 0.1);
	transition: background 0.2s, color 0.2s;
	cursor: pointer;
}
.repo-btn:hover {
	background: #ffd738;
	color: #232323;
}

.project-info p {
	margin: 0 0 0.5em 0;
	color: #ccc;
	text-align: left;
	line-height: 1.6;
	font-size: 0.95rem;
}

.tech-list {
	margin-bottom: 1.2em;
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em 0.5em;
}

.tech-chip {
	background: #f5ca1c;
	color: #1e1e1e;
	border-radius: 6px;
	padding: 0.4em 0.8em;
	margin-right: 0.6em;
	font-size: 0.85em;
	font-weight: 600;
	box-shadow: 0 2px 4px rgba(245, 202, 28, 0.2);
	transition: all 0.2s ease;
	cursor: pointer;
	border: none;
	font-family: "Montserrat", sans-serif;
}

.tech-chip:hover {
	transform: translateY(-1px);
	box-shadow: 0 3px 6px rgba(245, 202, 28, 0.3);
	background: #ffd738;
}

.rating {
	font-size: 1em;
	color: #f5ca1c;
	font-weight: 600;
	margin-top: 1.5em;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.repo-link {
	display: inline-block;
	color: #f5ca1c;
	text-decoration: none;
	font-weight: 600;
	padding: 0.6rem 1.2rem;
	background: rgba(245, 202, 28, 0.1);
	border: 1px solid #f5ca1c;
	border-radius: 6px;
	transition: all 0.3s ease;
	margin-top: 1rem;
}

.repo-link:hover {
	background: #f5ca1c;
	color: #1e1e1e;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(245, 202, 28, 0.3);
}

/* Paginación */
.pagination-controls {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1em;
	margin: 3em auto 2em;
	flex-wrap: wrap;
}

.pagination-btn {
	background: #1e1e1e;
	color: #f5ca1c;
	border: 1px solid #1e1e1e;
	padding: 0.7em 1.5em;
	border-radius: 6px;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9em;
}

.pagination-btn:hover:not(:disabled) {
	background: #333;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(30, 30, 30, 0.2);
}

.pagination-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.pagination-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5em;
}

.page-numbers {
	display: flex;
	gap: 0.5em;
}

.page-number {
	background: white;
	color: #1e1e1e;
	border: 1px solid #ddd;
	width: 35px;
	height: 35px;
	border-radius: 6px;
	cursor: pointer;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.page-number:hover {
	border-color: #f5ca1c;
	background: #fffbf0;
}

.page-number.active {
	background: #f5ca1c;
	color: #1e1e1e;
	border-color: #f5ca1c;
}

.page-text {
	font-size: 0.9em;
	color: #888;
	font-weight: 500;
}

/* Toggle Button Responsive Styles */
@media (max-width: 768px) {
	.projects-title {
		font-size: 2rem;
	}

	.search-and-filters {
		flex-direction: column;
		width: 90%;
		margin: 0 auto 1.5rem;
	}

	.search-container {
		width: 100%;
		min-width: auto;
		max-width: 100%;
	}

	.search-input {
		font-size: 0.9em;
		padding: 0.9em 2.5em 0.9em 0.9em;
	}

	.checkbox-label {
		padding: 0.7rem 1rem;
	}

	.accordion-header {
		padding: 1rem 1.5rem;
		font-size: 1rem;
	}

	.accordion-body {
		padding: 1rem 1.5rem;
	}

	.project-info p {
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.tech-chip {
		padding: 0.3rem 0.6rem;
		font-size: 0.7rem;
	}

	.project-img {
		max-width: 100%;
		height: auto;
		border-radius: 6px;
	}

	.pagination-controls {
		gap: 0.5em;
	}

	.pagination-btn {
		padding: 0.5em 1em;
		font-size: 0.8em;
	}

	.page-number {
		width: 30px;
		height: 30px;
		font-size: 0.85em;
	}
}

@media (max-width: 480px) {
	.projects-title {
		font-size: 1.8rem;
		text-align: center;
	}

	.projects-main-title {
		margin-top: 2em;
		margin-bottom: 1em;
	}

	.search-input {
		font-size: 0.85em;
	}

	.accordion-header {
		padding: 0.8rem 1rem;
		font-size: 0.9rem;
	}

	.project-title {
		font-size: 0.9rem;
	}

	.accordion-body {
		padding: 0.8rem 1rem;
	}

	.project-info p {
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.tech-list {
		gap: 0.4rem;
		margin-bottom: 1rem;
	}

	.tech-chip {
		padding: 0.25rem 0.5rem;
		font-size: 0.65rem;
	}

	.project-links-row {
		flex-direction: column;
		gap: 0.8rem;
		align-items: flex-start;
	}

	.repo-btn {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
		align-self: stretch;
		text-align: center;
	}

	.rating {
		font-size: 0.9rem;
		margin-top: 0;
	}

	.pagination-controls {
		flex-direction: column;
		gap: 1em;
	}

	.pagination-btn {
		width: 100%;
		max-width: 200px;
	}
}
</style>
