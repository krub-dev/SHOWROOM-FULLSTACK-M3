<script setup>
import { ref, computed } from "vue";
import projects from "../data/projects.json";

const openAccordion = ref(null);
const showOnlyFeatured = ref(true);

function toggleAccordion(index) {
	openAccordion.value = openAccordion.value === index ? null : index;
}

function toggleFeatured() {
	showOnlyFeatured.value = !showOnlyFeatured.value;
	openAccordion.value = null; // Close any open accordion when switching
}

const filteredProjects = computed(() => {
	return showOnlyFeatured.value
		? projects.filter((p) => p.featured === true)
		: projects;
});
</script>

<template>
	<div class="projects-list">
		<div class="projects-main-title">
			<h3 class="projects-title">
				{{ showOnlyFeatured ? "Featured Projects" : "All Projects" }}
			</h3>
		</div>

		<div class="projects-controls">
			<button @click="toggleFeatured" class="toggle-btn">
				{{
					showOnlyFeatured
						? "Show All Projects"
						: "Show Featured Only"
				}}
			</button>
		</div>
		<div
			v-for="(project, idx) in filteredProjects"
			:key="project.title"
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
							<span
								v-for="tech in project.technologies"
								:key="tech"
								class="tech-chip"
								>{{ tech }}</span
							>
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
	margin-bottom: 2.5em;
}

.projects-controls {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1.5em;
	padding-right: 2em;
}

.toggle-btn {
	background: #1e1e1e;
	color: #f5ca1c;
	border: 1px solid #1e1e1e;
	padding: 0.5rem 1rem;
	border-radius: 6px;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	font-size: 0.75em;
	text-transform: uppercase;
	letter-spacing: 0.03em;
	cursor: pointer;
	transition: all 0.3s ease;
	opacity: 0.8;
}

.toggle-btn:hover {
	background: transparent;
	color: #1e1e1e;
	border-color: #1e1e1e;
	opacity: 1;
	transform: translateY(-1px);
	box-shadow: 0 2px 8px rgba(30, 30, 30, 0.2);
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
}

.tech-chip:hover {
	transform: translateY(-1px);
	box-shadow: 0 3px 6px rgba(245, 202, 28, 0.3);
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

/* Toggle Button Responsive Styles */
@media (max-width: 768px) {
	.projects-title {
		font-size: 2rem;
	}

	.projects-controls {
		padding-right: 1rem;
		padding-left: 1rem;
		margin-bottom: 1rem;
	}

	.toggle-btn {
		padding: 0.7rem 1.2rem;
		font-size: 0.8em;
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
}

@media (max-width: 480px) {
	.projects-title {
		font-size: 1.8rem;
		text-align: center;
	}

	.projects-main-title {
		margin-top: 2em;
		margin-bottom: 1.5em;
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
}
</style>
