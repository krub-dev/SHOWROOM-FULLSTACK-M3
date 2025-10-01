<template>
	<div class="api-projects-container">
		<div class="content-wrapper">
			<header class="projects-header">
				<h1>API Projects Manager</h1>
				<div class="code-subtitle">
					<span class="code-comment"
						>// CRUD operations with Express API</span
					>
					<div class="code-line">
						<span class="code-keyword">const </span>
						<span class="code-variable">apiUrl </span>
						<span class="code-operator">= </span>
						<span class="code-string">"{{ apiUrl }}"</span>
						<!-- Cambia esto -->
						<span class="code-bracket">;</span>
					</div>
				</div>
			</header>

			<!-- Teacher Authentication Panel -->
			<div v-if="!teacherAuthenticated" class="teacher-auth-panel">
				<h3>Teacher Access Required</h3>
				<p>
					To test CRUD operations (Create, Update, Delete), please
					enter the teacher access code:
				</p>
				<div class="auth-input-group">
					<input
						type="password"
						v-model="teacherPassword"
						placeholder="Enter teacher access code"
						@keyup.enter="authenticateTeacher"
						class="teacher-password-input"
					/>
					<button
						@click="authenticateTeacher"
						class="auth-btn"
						:disabled="!teacherPassword"
					>
						🔓 Enable CRUD
					</button>
				</div>
				<div class="read-only-notice">
					<strong>Note:</strong> You can browse and view all projects
					without authentication. Authentication is only required for
					editing operations.
				</div>
			</div>

			<!-- Control Panel -->
			<div v-if="teacherAuthenticated" class="control-panel">
				<div class="project-selector">
					<select
						id="projectSelect"
						v-model="selectedProjectId"
						@change="handleSelection"
					>
						<option value="CREATE_NEW">
							➕ Create New Project
						</option>
						<option disabled>---</option>
						<option
							v-for="project in projects"
							:key="project.id"
							:value="project.id"
						>
							📁 {{ project.title }}
						</option>
					</select>
				</div>

				<!-- Action buttons - only show when a real project is selected -->
				<div v-if="selectedProject" class="action-buttons">
					<button
						@click="editProject(selectedProject)"
						class="action-btn btn-primary"
					>
						Edit Project
					</button>
					<button
						@click="
							deleteProject(
								selectedProject.id || selectedProject.title
							)
						"
						class="action-btn btn-danger"
					>
						Delete Project
					</button>
				</div>
			</div>

			<!-- Project Details (when selected) -->
			<div
				v-if="selectedProject && teacherAuthenticated"
				class="project-details"
			>
				<h3>{{ selectedProject.title }}</h3>
				<div class="project-image" v-if="selectedProject.image">
					<img
						:src="selectedProject.image"
						:alt="selectedProject.title"
					/>
				</div>
				<p class="project-description">
					{{ selectedProject.description }}
				</p>
				<div class="project-technologies">
					<span
						v-for="tech in selectedProject.technologies"
						:key="tech"
						class="tech-tag"
					>
						{{ tech }}
					</span>
				</div>
				<div class="project-meta">
					<div class="project-rating">
						<span
							v-for="n in 5"
							:key="n"
							class="star"
							:class="{ filled: n <= selectedProject.rating }"
						>
							⭐
						</span>
					</div>
					<a
						:href="selectedProject.repo"
						target="_blank"
						class="repo-link"
					>
						Repository
					</a>
				</div>
			</div>

			<!-- Formulario para crear/editar (hidden by default) -->
			<form
				v-if="showForm && teacherAuthenticated"
				class="project-form"
				@submit.prevent="saveProject"
			>
				<div class="form-header">
					<h3>
						{{ editingId ? "Edit Project" : "Add New Project" }}
					</h3>
				</div>
				<div class="form-group">
					<label for="title">Project Title</label>
					<input
						type="text"
						id="title"
						v-model="formData.title"
						placeholder="Enter project title"
						required
					/>
				</div>

				<div class="form-group">
					<label for="description">Description</label>
					<textarea
						id="description"
						v-model="formData.description"
						placeholder="Describe your project..."
						rows="4"
						required
					></textarea>
				</div>

				<div class="form-group">
					<label for="image">Image URL</label>
					<input
						type="url"
						id="image"
						v-model="formData.image"
						placeholder="https://example.com/image.jpg"
					/>
				</div>

				<div class="form-group">
					<label for="technologies"
						>Technologies (comma separated)</label
					>
					<input
						type="text"
						id="technologies"
						v-model="technologiesInput"
						placeholder="Vue.js, Express, Node.js"
						required
					/>
				</div>

				<div class="form-group">
					<label for="rating">Rating (1-5)</label>
					<select id="rating" v-model="formData.rating" required>
						<option value="">Select rating</option>
						<option value="1">⭐ 1</option>
						<option value="2">⭐⭐ 2</option>
						<option value="3">⭐⭐⭐ 3</option>
						<option value="4">⭐⭐⭐⭐ 4</option>
						<option value="5">⭐⭐⭐⭐⭐ 5</option>
					</select>
				</div>

				<div class="form-group">
					<label for="repo">Repository URL</label>
					<input
						type="url"
						id="repo"
						v-model="formData.repo"
						placeholder="https://github.com/username/project"
						required
					/>
				</div>

				<div class="form-actions">
					<button type="submit" class="save-btn" :disabled="loading">
						<span v-if="loading"
							>⏳
							{{
								editingId ? "Updating..." : "Creating..."
							}}</span
						>
						<span v-else>{{
							editingId ? "Update Project" : "Create Project"
						}}</span>
					</button>

					<label class="featured-inline-label">
						<input
							type="checkbox"
							v-model="formData.featured"
							class="featured-checkbox-inline"
						/>
						<span class="featured-text-inline">Featured</span>
					</label>

					<button
						type="button"
						@click="cancelEdit"
						class="cancel-btn"
						v-if="editingId"
					>
						Cancel
					</button>
				</div>
			</form>

			<!-- Loading/Success messages -->
			<div v-if="loading" class="loading">
				<p>Loading...</p>
			</div>

			<!-- Success/Error messages -->
			<div v-if="message" class="message" :class="messageType">
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ApiProjects",
	data() {
		return {
			projects: [],
			formData: {
				title: "",
				description: "",
				image: "",
				technologies: [],
				rating: "",
				repo: "",
				featured: false,
			},
			technologiesInput: "", // String input for technologies
			editingId: null,
			loading: false,
			message: "",
			messageType: "success", // success | error
			// Elimina apiUrl de data
			// New variables for dropdown interface
			selectedProjectId: "CREATE_NEW", // Default to Create New Project
			selectedProject: null,
			showForm: false, // Cambia a false para que el formulario no se muestre antes de autenticarse
			// Teacher authentication
			teacherAuthenticated: false,
			teacherPassword: "",
		};
	},
	computed: {
		apiUrl() {
			// Forzar siempre la URL de producción
			return "https://krubshowroom-production.up.railway.app/api/projects";
		},
	},
	async mounted() {
		// Projects will only load after teacher authentication
		// No automatic loading to protect data access
	},

	methods: {
		// Jarko authentication
		async authenticateTeacher() {
			if (!this.teacherPassword) {
				this.showMessage("Please enter custom Jarko access code", "error");
				return;
			}
			const CORRECT_PASSWORD = "ironhack2025";
			if (this.teacherPassword === CORRECT_PASSWORD) {
				this.teacherAuthenticated = true;
				this.showMessage(
					"Access granted! You can now use all CRUD operations.",
					"success"
				);
				await this.loadProjects(false);
				this.showForm = true; // Muestra el formulario tras autenticación
				this.selectedProjectId = "CREATE_NEW";
				this.selectedProject = null;
				this.editingId = null;
				this.resetForm();
			} else {
				this.showMessage(
					"Invalid teacher access code. Please try again.",
					"error"
				);
				this.teacherPassword = "";
			}
		},

		// READ - Fetch all projects from API
		async loadProjects(showMessage = true) {
			try {
				this.loading = true;
				console.log("API URL used:", this.apiUrl);
				const response = await fetch(this.apiUrl);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				this.projects = await response.json();
				if (showMessage) {
					this.showMessage("Projects loaded successfully", "warning");
				}
			} catch (error) {
				console.error("Error loading projects:", error);
				this.showMessage(
					"Failed to load projects. Check if API server is running.",
					"error"
				);
			} finally {
				this.loading = false;
			}
		},

		// CREATE/UPDATE - Save project to API
		async saveProject() {
			try {
				this.loading = true;

				// Prepare project data
				const projectData = {
					...this.formData,
					technologies: this.technologiesInput
						.split(",")
						.map((tech) => tech.trim()),
					rating: parseInt(this.formData.rating),
				};

				let response;

				if (this.editingId) {
					// UPDATE - PUT request
					response = await fetch(`${this.apiUrl}/${this.editingId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"x-teacher-key": this.teacherPassword,
						},
						body: JSON.stringify(projectData),
					});
				} else {
					// CREATE - POST request
					response = await fetch(this.apiUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"x-teacher-key": this.teacherPassword,
						},
						body: JSON.stringify(projectData),
					});
				}

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				this.showMessage(
					this.editingId
						? "Project updated successfully!"
						: "Project created successfully!",
					this.editingId ? "updated" : "created"
				);

				this.resetForm();
				await this.loadProjects(false); // Reload the list silently
			} catch (error) {
				console.error("Error saving project:", error);
				this.showMessage(
					"Failed to save project. Please try again.",
					"error"
				);
			} finally {
				this.loading = false;
			}
		},

		// DELETE - Remove project (with confirmation as required by lab)
		async deleteProject(id) {
			// Security confirmation as required by lab specification
			const confirmed = confirm(
				"Are you sure you want to delete this project? This action cannot be undone."
			);

			if (!confirmed) {
				return;
			}

			try {
				this.loading = true;

				const response = await fetch(`${this.apiUrl}/${id}`, {
					method: "DELETE",
					headers: {
						"x-teacher-key": this.teacherPassword,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				this.showMessage("Project deleted successfully!", "deleted");
				await this.loadProjects(false); // Reload the list silently

				// Reset to "Create New Project" state after deletion
				this.selectedProjectId = "CREATE_NEW";
				this.selectedProject = null;
				this.showForm = true;
				this.editingId = null;
				this.resetForm();
			} catch (error) {
				console.error("Error deleting project:", error);
				this.showMessage(
					"Failed to delete project. Please try again.",
					"error"
				);
			} finally {
				this.loading = false;
			}
		},

		// Edit project - populate form with existing data
		editProject(project) {
			this.editingId = project.id;
			this.formData = {
				title: project.title,
				description: project.description,
				image: project.image || "",
				rating: project.rating.toString(),
				repo: project.repo,
				featured: project.featured || false,
			};
			this.technologiesInput = project.technologies.join(", ");
			this.showForm = true;

			// Scroll to form
			this.$nextTick(() => {
				const formElement = document.querySelector(".project-form");
				if (formElement) {
					formElement.scrollIntoView({ behavior: "smooth" });
				}
			});
		},

		// Cancel edit mode
		cancelEdit() {
			this.editingId = null;
			this.showForm = false;
			this.resetForm();
		},

		// Reset form to initial state
		resetForm() {
			this.formData = {
				title: "",
				description: "",
				image: "",
				technologies: [],
				rating: "",
				repo: "",
				featured: false,
			};
			this.technologiesInput = "";
		},

		// Show message to user
		showMessage(text, type = "success") {
			this.message = text;
			this.messageType = type;

			// Auto-hide message after 3 seconds
			setTimeout(() => {
				this.message = "";
			}, 3000);
		},

		// New method to handle dropdown selection
		handleSelection() {
			if (this.selectedProjectId === "CREATE_NEW") {
				// Show create form and clear project selection
				this.selectedProject = null;
				this.showForm = true;
				this.editingId = null;
				this.resetForm();
			} else if (this.selectedProjectId) {
				// Select existing project and hide form
				this.selectProject();
				this.showForm = false;
			} else {
				// Clear selection
				this.selectedProject = null;
				this.showForm = false;
			}
		},

		selectProject() {
			this.selectedProject = this.projects.find(
				(p) => p.id == this.selectedProjectId
			);
		},

		showCreateForm() {
			this.showForm = true;
			this.editingId = null;
			this.resetForm();
		},
	},
};
</script>

<style scoped>
/* Container */
.api-projects-container {
	background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
	min-height: 100vh;
	color: #f5ca1c;
	font-family: "Courier New", monospace;
	position: relative;
	width: 100%;
}

/* Content wrapper - adds padding to separate content from edges */
.content-wrapper {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
}

/* Header */
.projects-header {
	text-align: center;
	margin-bottom: 2rem;
}

.projects-header h1 {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	color: #f5ca1c;
}

.code-subtitle {
	font-size: 0.9rem;
	color: #ccc;
	margin-bottom: 1rem;
}

.code-comment {
	color: #6a9955;
}
.code-keyword {
	color: #569cd6;
}
.code-variable {
	color: #9cdcfe;
}
.code-operator {
	color: #d4d4d4;
}
.code-string {
	color: #ce9178;
}
.code-bracket {
	color: #ffd700;
}

/* Form */
.project-form {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #f5ca1c;
	border-radius: 12px;
	padding: 2rem;
	margin-bottom: 3rem;
}

.form-header h3 {
	margin-bottom: 1.5rem;
	color: #f5ca1c;
	font-size: 1.3rem;
}

.form-group {
	margin-bottom: 1.5rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.5rem;
	color: #f5ca1c;
	font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
	width: 100%;
	padding: 0.8rem;
	background: #2d2d2d;
	border: 1px solid #555;
	border-radius: 6px;
	color: #fff;
	font-family: "Courier New", monospace;
	box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
	outline: none;
	border-color: #f5ca1c;
	box-shadow: 0 0 0 2px rgba(245, 202, 28, 0.2);
}

/* Inline Featured Checkbox Styles */
.featured-inline-label {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	cursor: pointer;
	margin: 0;
	padding: 0;
}

.featured-checkbox-inline {
	appearance: none;
	width: 14px;
	height: 14px;
	border: 1.5px solid #f5ca1c;
	border-radius: 2px;
	background: transparent;
	cursor: pointer;
	position: relative;
	margin: 0;
}

.featured-checkbox-inline:checked {
	background: #f5ca1c;
	border-color: #f5ca1c;
}

.featured-text-inline {
	font-size: 0.85rem;
	font-weight: 500;
	color: #f5ca1c;
	white-space: nowrap;
}

.form-actions {
	display: flex;
	gap: 1rem;
	justify-content: center;
	margin-top: 2rem;
}

.save-btn,
.cancel-btn {
	padding: 0.8rem 1.5rem;
	border: none;
	border-radius: 6px;
	font-family: "Courier New", monospace;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
}

.save-btn {
	background: #f5ca1c;
	color: #1e1e1e;
}

.save-btn:hover:not(:disabled) {
	background: #e6b800;
	transform: translateY(-2px);
}

.save-btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.cancel-btn {
	background: transparent;
	color: #ccc;
	border: 1px solid #666;
}

.cancel-btn:hover {
	background: #666;
	color: #fff;
}

/* Projects List */
.projects-list h2 {
	margin-bottom: 2rem;
	color: #f5ca1c;
	text-align: center;
}

.loading,
.no-projects {
	text-align: center;
	padding: 3rem;
	color: #ccc;
	font-size: 1.1rem;
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 2rem;
}

/* Project Cards */
.project-card {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #333;
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.3s ease;
	position: relative;
}

.project-card:hover {
	border-color: #f5ca1c;
	transform: translateY(-5px);
	box-shadow: 0 8px 25px rgba(245, 202, 28, 0.2);
}

.project-card.editing {
	border-color: #f5ca1c;
	box-shadow: 0 0 0 2px rgba(245, 202, 28, 0.3);
}

.project-image {
	max-height: 400px;
	overflow: hidden;
}

.project-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.project-content {
	padding: 1.5rem;
}

.project-content h3 {
	margin-bottom: 1rem;
	color: #f5ca1c;
	font-size: 1.2rem;
}

.project-description {
	color: #ccc;
	line-height: 1.5;
	margin-bottom: 1rem;
}

.project-technologies {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.tech-tag {
	background: #f5ca1c;
	color: #1e1e1e;
	padding: 0.2rem 0.5rem;
	border-radius: 4px;
	font-size: 0.8rem;
	font-weight: 600;
}

.project-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.project-rating .star {
	font-size: 0.8rem;
	opacity: 0.3;
}

.project-rating .star.filled {
	opacity: 1;
}

.repo-link {
	color: #f5ca1c;
	text-decoration: none;
	font-size: 0.9rem;
}

.repo-link:hover {
	text-decoration: underline;
}

.project-actions {
	padding: 1rem 1.5rem;
	background: rgba(245, 202, 28, 0.05);
	display: flex;
	gap: 1rem;
	justify-content: center;
}

.edit-btn,
.delete-btn {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	font-family: "Courier New", monospace;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
}

.edit-btn {
	background: #4a90e2;
	color: white;
}

.edit-btn:hover {
	background: #357abd;
}

.delete-btn {
	background: #e74c3c;
	color: white;
}

.delete-btn:hover {
	background: #c0392b;
}

/* Messages */
.message {
	position: fixed;
	top: 20px;
	right: 20px;
	padding: 1rem 1.5rem;
	border-radius: 6px;
	font-weight: 600;
	z-index: 1000;
	animation: slideIn 0.3s ease;
}

.message.success {
	background: #27ae60;
	color: white;
}

.message.error {
	background: #e74c3c;
	color: white;
}

.message.warning {
	background: #f5ca1c;
	color: #1e1e1e;
	font-weight: bold;
}

.message.created {
	background: #2ecc71;
	color: white;
	border-left: 4px solid #27ae60;
}

.message.updated {
	background: #3498db;
	color: white;
	border-left: 4px solid #2980b9;
}

.message.deleted {
	background: #e74c3c;
	color: white;
	border-left: 4px solid #c0392b;
}

.message.warning {
	background: #f5ca1c;
	color: #1e1e1e;
	font-weight: bold;
}

.message.created {
	background: #2ecc71;
	color: white;
	border-left: 4px solid #27ae60;
}

.message.updated {
	background: #3498db;
	color: white;
	border-left: 4px solid #2980b9;
}

.message.deleted {
	background: #e74c3c;
	color: white;
	border-left: 4px solid #c0392b;
}

@keyframes slideIn {
	from {
		transform: translateX(100%);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}

/* Responsive */
@media (max-width: 768px) {
	.api-projects-container {
		padding: 1rem;
	}

	.form-actions {
		flex-direction: column;
	}

	.project-actions {
		flex-direction: column;
	}

	.control-panel .project-selector {
		flex-direction: column;
	}

	.control-panel .action-buttons {
		flex-direction: column;
	}
}

/* New styles for dropdown interface */
.control-panel {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #f5ca1c;
	border-radius: 12px;
	padding: 1.5rem;
	margin-bottom: 2rem;
}

.control-panel h3 {
	color: #f5ca1c;
	margin-bottom: 1rem;
	font-size: 1.2rem;
}

.project-selector {
	display: flex;
	justify-content: center;
	margin-bottom: 1.5rem;
}

.project-selector select {
	padding: 0.75rem 1rem;
	background: #2d2d2d;
	border: 2px solid #f5ca1c;
	border-radius: 8px;
	color: #f5ca1c;
	font-family: "Courier New", monospace;
	font-size: 1rem;
	transition: all 0.3s ease;
	cursor: pointer;
}

.project-selector select:hover {
	border-color: #ffdd44;
	box-shadow: 0 0 10px rgba(245, 202, 28, 0.3);
}

.project-selector select:focus {
	outline: none;
	border-color: #ffdd44;
	box-shadow: 0 0 15px rgba(245, 202, 28, 0.4);
}

.project-selector select option {
	background: #2d2d2d;
	color: #f5ca1c;
	padding: 0.5rem;
}

.project-selector select option:disabled {
	color: #666;
	font-style: italic;
}

.action-buttons {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(245, 202, 28, 0.3);
}

.action-btn {
	padding: 0.75rem 1.5rem;
	border: 2px solid;
	border-radius: 8px;
	background: transparent;
	font-family: "Courier New", monospace;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.95rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	position: relative;
	overflow: hidden;
}

.action-btn::before {
	content: "";
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.1),
		transparent
	);
	transition: left 0.5s;
}

.action-btn:hover::before {
	left: 100%;
}

.action-btn.btn-primary {
	border-color: #4a90e2;
	color: #4a90e2;
	background: linear-gradient(
		135deg,
		transparent 0%,
		rgba(74, 144, 226, 0.1) 100%
	);
}

.action-btn.btn-primary:hover {
	background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
	color: white;
	transform: translateY(-2px);
	box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
}

.action-btn.btn-danger {
	border-color: #e74c3c;
	color: #e74c3c;
	background: linear-gradient(
		135deg,
		transparent 0%,
		rgba(231, 76, 60, 0.1) 100%
	);
}

.action-btn.btn-danger:hover {
	background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
	color: white;
	transform: translateY(-2px);
	box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
}

.project-details {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #f5ca1c;
	border-radius: 12px;
	padding: 1.5rem;
	margin-bottom: 2rem;
}

.project-details h3 {
	color: #f5ca1c;
	margin-bottom: 1rem;
	font-size: 1.4rem;
}

.project-details p {
	color: #ccc;
	margin-bottom: 0.8rem;
	line-height: 1.6;
}

.project-details .technologies {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 1rem 0;
}

.project-details .tech-tag {
	background: rgba(245, 202, 28, 0.2);
	border: 1px solid #f5ca1c;
	color: #f5ca1c;
	padding: 0.3rem 0.8rem;
	border-radius: 15px;
	font-size: 0.8rem;
	font-weight: 600;
}

.project-details .rating {
	color: #f5ca1c;
	font-size: 1.1rem;
	font-weight: bold;
}

.project-details .project-links {
	margin-top: 1rem;
}

.project-details .project-links a {
	display: inline-block;
	padding: 0.5rem 1rem;
	background: transparent;
	border: 1px solid #4a90e2;
	color: #4a90e2;
	text-decoration: none;
	border-radius: 6px;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	transition: all 0.3s ease;
	font-family: "Courier New", monospace;
	font-weight: 600;
}

.project-details .project-links a:hover {
	background: #4a90e2;
	color: white;
}

.no-project-selected {
	text-align: center;
	color: #666;
	font-style: italic;
	padding: 2rem;
}

/* Teacher Authentication Styles */
.teacher-auth-panel {
	background: rgba(245, 202, 28, 0.1);
	border: 2px solid #f5ca1c;
	border-radius: 8px;
	padding: 1.5rem;
	margin-bottom: 2rem;
	text-align: center;
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;
}

.teacher-auth-panel h3 {
	color: #f5ca1c;
	margin-bottom: 1rem;
}

.teacher-auth-panel p {
	color: #ccc;
	margin-bottom: 1.5rem;
}

.auth-input-group {
	display: flex;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
}

@media (max-width: 600px) {
	.teacher-auth-panel {
		padding: 1rem;
		max-width: 98vw;
	}
	.auth-input-group {
		flex-direction: column;
		gap: 0.5rem;
		align-items: stretch;
	}
	.teacher-password-input {
		min-width: 0;
		width: 100%;
		font-size: 1rem;
		box-sizing: border-box;
	}
	.auth-btn {
		width: 100%;
		font-size: 1rem;
		box-sizing: border-box;
	}
}

.teacher-password-input {
	background: #2d2d2d;
	border: 2px solid #f5ca1c;
	border-radius: 6px;
	padding: 0.75rem;
	color: #f5ca1c;
	font-family: inherit;
	min-width: 250px;
}

.teacher-password-input:focus {
	outline: none;
	border-color: #f5ca1c;
	box-shadow: 0 0 0 2px rgba(245, 202, 28, 0.2);
}

.auth-btn {
	background: #f5ca1c;
	color: #1e1e1e;
	border: none;
	border-radius: 6px;
	padding: 0.75rem 1.5rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
}

.auth-btn:disabled {
	background: #666;
	cursor: not-allowed;
}

.auth-btn:not(:disabled):hover {
	background: #e6b71a;
	transform: translateY(-2px);
}

.read-only-notice {
	background: rgba(245, 202, 28, 0.05);
	border: 1px solid rgba(245, 202, 28, 0.3);
	border-radius: 6px;
	padding: 1rem;
	color: #f5ca1c;
	font-size: 0.9rem;
}

.control-panel.read-only {
	opacity: 0.7;
}
</style>
