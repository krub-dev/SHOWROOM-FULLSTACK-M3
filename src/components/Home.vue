<template>
	<div class="home-container">
		<div class="banner">
			<img
				src="/src/assets/banner-krub.png"
				alt="banner krub"
				width="600"
				height="auto"
			/>
		</div>

		<div class="intro-section">
			<h1>KIKO RUBIO ILLÁN</h1>
			<h2>Full Stack Developer</h2>

			<div class="description">
				<p>Welcome to my development showroom!</p>
				<p>
					I'm a Full Stack developer with experience in modern
					technologies like Vue.js, Java Spring Boot, C, and many
					more.
				</p>
				<p>
					Here you can explore my most outstanding projects and learn
					more about my work.
				</p>
			</div>

			<div class="cta-buttons">
				<div class="main-buttons">
					<router-link to="/projects" class="cta-btn primary"
						>View Projects</router-link
					>
					<router-link to="/contact" class="cta-btn secondary"
						>Get In Touch</router-link
					>
					<a
						href="https://krub.dev"
						target="_blank"
						class="cta-btn tertiary"
						>My Website</a
					>
				</div>
			</div>
			<div class="linkedin">
				<LinkedInButton />
			</div>
		</div>
	</div>
</template>

<script setup>
import LinkedInButton from "./LinkedInButton.vue";
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap");

.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 1rem 2rem 1rem;
	width: 100%;
}

.banner {
	height: 15em;
	will-change: filter;
	transition: filter 300ms;
	filter: drop-shadow(0 1em 2em #1e1e1eaa);
	margin-bottom: 1.5rem;
	margin-top: 0;
	width: 100%;
	text-align: center;
}

.banner img {
	max-width: 100%;
	height: auto;
	width: auto;
	max-height: auto;
	margin-bottom: 2rem;
}

.intro-section {
	text-align: center;
	padding: 4rem;
	width: 100%;
	box-sizing: border-box;
}

h1 {
	color: #1e1e1e;
	font-size: 3em;
	margin: 0.3em 0 0.2em 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 900;
	letter-spacing: 0.08em;
	text-shadow: 2px 4px 12px rgba(30, 30, 30, 0.18);
	text-transform: uppercase;
	border-bottom: 3px solid #1e1e1e;
	display: inline-block;
	animation: fadeInDown 1s cubic-bezier(0.77, 0, 0.18, 1) both;
	white-space: nowrap;
}

h2 {
	color: #1e1e1e;
	font-size: 2em;
	margin: 0.2em 0 1.5em 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	letter-spacing: 0.04em;
	text-shadow: 1px 2px 8px rgba(30, 30, 30, 0.12);
	text-transform: uppercase;
	animation: fadeInUp 1.2s cubic-bezier(0.77, 0, 0.18, 1) both;
}

.description {
	margin: 2rem 0;
	animation: fadeIn 1.5s ease-in-out both;
	padding: 0 1rem;
}

.description p {
	color: #1e1e1e;
	font-size: 1.1em;
	line-height: 1.6;
	margin-bottom: 1rem;
	font-family: "Montserrat", sans-serif;
	font-weight: 400;
}

.cta-buttons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	margin-top: 2rem;
}

.main-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
}

.linkedin {
	margin-top: 1.5rem;
	position: relative;
	display: flex;
	justify-content: center;
	left: 16px;
}


.cta-btn {
	padding: 12px 24px;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	text-decoration: none;
	border-radius: 8px;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.cta-btn.primary {
	background: #1e1e1e;
	color: #f5ca1c;
	border: 2px solid #1e1e1e;
}

.cta-btn.primary:hover {
	background: transparent;
	color: #1e1e1e;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(30, 30, 30, 0.3);
}

.cta-btn.secondary {
	background: transparent;
	color: #1e1e1e;
	border: 2px solid #1e1e1e;
}

.cta-btn.secondary:hover {
	background: #1e1e1e;
	color: #f5ca1c;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(30, 30, 30, 0.3);
}

.cta-btn.tertiary {
	background: #1e1e1e;
	color: #f5ca1c;
	border: 2px solid #1e1e1e;
}

.cta-btn.tertiary:hover {
	background: transparent;
	color: #1e1e1e;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(30, 30, 30, 0.3);
}

@keyframes fadeInDown {
	0% {
		opacity: 0;
		transform: translateY(-40px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInUp {
	0% {
		opacity: 0;
		transform: translateY(40px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

/* Media queries para responsive design */
@media (max-width: 768px) {
	.intro-section {
		padding: 0 1.5rem;
	}

	h1 {
		font-size: 2.2em;
		margin: 0.3em 0 0.2em 0;
	}

	h2 {
		font-size: 1.8em;
	}

	.description {
		padding: 0 0.5rem;
	}
}

@media (max-width: 480px) {
	.intro-section {
		padding: 0 1rem;
	}

	h1 {
		font-size: 1.8em;
		margin: 0.2em 0 0.2em 0;
	}

	h2 {
		font-size: 1.5em;
	}
}
@media (max-width: 630px) {
	.linkedin {
		left: 0;
	}
}
</style>
