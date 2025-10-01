<script setup>
import { ref } from "vue";

// Estado para controlar el menú móvil
const isMobileMenuOpen = ref(false);

// Función para toggle del menú
const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Función para cerrar menú al hacer clic en un enlace
const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};
</script>

<template>
	<div class="layout-bg">
		<div class="main-container">
			<!-- Barra de navegación -->
			<nav class="navigation">
				<!-- Botón hamburguesa (solo visible en móvil) -->
				<button
					class="mobile-menu-toggle"
					@click="toggleMobileMenu"
					:class="{ active: isMobileMenuOpen }"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<!-- Enlaces de navegación -->
				<div
					class="nav-links"
					:class="{ 'mobile-open': isMobileMenuOpen }"
				>
					<router-link
						to="/"
						class="nav-link"
						active-class="active"
						@click="closeMobileMenu"
						>Home</router-link
					>
					<router-link
						to="/projects"
						class="nav-link"
						active-class="active"
						@click="closeMobileMenu"
						>Projects</router-link
					>
					<router-link
						to="/contact"
						class="nav-link"
						active-class="active"
						@click="closeMobileMenu"
						>Contact</router-link
					>
					<router-link
						to="/api-projects"
						class="nav-link"
						active-class="active"
						@click="closeMobileMenu"
						>API CRUD</router-link
					>
				</div>
			</nav>
			<!-- Aquí se muestran los componentes según la ruta actual -->
			<router-view />
		</div>
	</div>

	<!-- Logo fijo en esquina -->
	<a href="https://krub.dev" target="_blank">
		<img
			src="/src/assets/krub-logo.png"
			alt="Krub logo"
			class="footer-logo"
		/>
	</a>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap");
.banner {
	height: 15em;
	will-change: filter;
	transition: filter 300ms;
	filter: drop-shadow(0 0 2em #1e1e1eaa);
}

.logo:hover {
	filter: drop-shadow(0 0 2em #1e1e1eaa);
}

.footer-logo {
	position: fixed;
	bottom: 20px;
	left: 20px;
	width: 80px;
	z-index: 100;
	opacity: 0.9;
}

.layout-bg {
	min-height: 100vh;
	width: 100vw;
	background: var(--color-bg);
	display: flex;
	justify-content: center;
	align-items: flex-start;
}

.main-container {
	width: 100%;
	max-width: 900px; /* antes 600px */
	min-height: 100vh;
	background: #f5ca1c;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	margin: 0 auto;
	padding: 0;
}
h1 {
	color: #1e1e1e;
	font-size: 3em;
	margin: 0.7em 0 0.2em 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 900;
	letter-spacing: 0.08em;
	text-shadow: 2px 4px 12px rgba(30, 30, 30, 0.18);
	text-transform: uppercase;
	border-bottom: 3px solid #1e1e1e;
	display: inline-block;
	animation: fadeInDown 1s cubic-bezier(0.77, 0, 0.18, 1) both;
}
h2 {
	color: #1e1e1e;
	font-size: 2em;
	margin: 0.2em 0 1em 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	letter-spacing: 0.04em;
	text-shadow: 1px 2px 8px rgba(30, 30, 30, 0.12);
	text-transform: uppercase;
	animation: fadeInUp 1.2s cubic-bezier(0.77, 0, 0.18, 1) both;
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

/* Estilos para la barra de navegación */
.navigation {
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem 1rem 1rem 1rem;
	border-bottom: 2px solid #1e1e1e;
	margin-bottom: 0;
}

/* Botón hamburguesa - oculto por defecto */
.mobile-menu-toggle {
	display: none;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
	background: none;
	border: none;
	cursor: pointer;
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	z-index: 1000;
	padding: 8px;
	border-radius: 8px;
	transition: background 0.3s ease;
}

.mobile-menu-toggle:hover {
	background: rgba(30, 30, 30, 0.1);
}

.mobile-menu-toggle span {
	display: block;
	width: 28px;
	height: 4px;
	background: #1e1e1e;
	margin: 4px 0;
	transition: all 0.3s ease;
	border-radius: 2px;
}

/* Animación del botón hamburguesa cuando está activo */
.mobile-menu-toggle.active span:nth-child(1) {
	transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
	opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
	transform: rotate(-45deg) translate(8px, -8px);
}

/* Enlaces de navegación */
.nav-links {
	display: flex;
	justify-content: center;
	gap: 2rem;
}

.nav-link {
	color: #1e1e1e;
	text-decoration: none;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	font-size: 1.1em;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	padding: 8px 16px;
	border-radius: 6px;
	transition: all 0.3s ease;
	position: relative;
}

.nav-link:hover {
	background: rgba(30, 30, 30, 0.1);
	transform: translateY(-2px);
}

.nav-link.active {
	background: #1e1e1e;
	color: #f5ca1c;
	box-shadow: 0 4px 12px rgba(30, 30, 30, 0.3);
}

.nav-link.active:hover {
	background: #1e1e1e;
	color: #f5ca1c;
}

/* Media queries para responsive */
@media (max-width: 768px) {
	/* Mostrar botón hamburguesa en móvil */
	.mobile-menu-toggle {
		display: flex;
	}

	/* Enlaces de navegación en móvil */
	.nav-links {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #f5ca1c;
		flex-direction: column;
		gap: 0;
		padding: 1rem 0;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border-radius: 0 0 12px 12px;
		transform: translateY(-10px);
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 999;
	}

	.nav-links.mobile-open {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}

	.nav-link {
		padding: 12px 24px;
		text-align: center;
		border-radius: 0;
		color: #1e1e1e;
		font-size: 1rem;
	}

	.nav-link:hover {
		background: rgba(30, 30, 30, 0.1);
		transform: none;
	}

	.nav-link.active {
		background: #1e1e1e;
		color: #f5ca1c;
		box-shadow: none;
	}

	.nav-link.active:hover {
		background: #1e1e1e;
	}

	/* Ajustar padding del navigation en móvil */
	.navigation {
		padding: 1rem;
	}
}

@media (max-width: 480px) {
	.nav-link {
		font-size: 0.9rem;
		padding: 10px 20px;
	}
}
</style>
