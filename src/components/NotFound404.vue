<template>
	<div class="error-container">
		<div class="error-content">
			<div class="error-code">404</div>
			<h1>Oops! Page Not Found</h1>
			<p>{{ randomMessage }}</p>

			<div class="error-illustration">
				<div class="code-line">
					<span class="keyword">try</span>
					<span class="bracket"> {</span>
				</div>
				<div class="code-line indent">
					<span class="keyword">const</span>
					<span class="variable"> page</span>
					<span class="operator"> = </span>
					<span class="function">findPage</span>
					<span class="bracket">(</span>
					<span class="variable">currentUrl</span>
					<span class="bracket">)</span>
					<span class="semicolon">;</span>
				</div>
				<div class="code-line indent">
					<span class="keyword">if</span>
					<span class="bracket"> (</span>
					<span class="variable">page</span>
					<span class="bracket">) </span>
					<span class="function">renderContent</span>
					<span class="bracket">(</span>
					<span class="variable">page</span>
					<span class="bracket">)</span>
					<span class="semicolon">;</span>
				</div>
				<div class="code-line">
					<span class="bracket">}</span>
					<span class="keyword"> catch</span>
					<span class="bracket">(</span>
					<span class="variable">PageNotFoundError</span>
					<span class="bracket">) {</span>
				</div>
				<div class="code-line indent error-line">
					<span class="comment">// You are here! 🚨</span>
				</div>
				<div class="code-line indent">
					<span class="function">console</span>
					<span class="operator">.</span>
					<span class="function">error</span>
					<span class="bracket">(</span>
					<span class="string">'404: Page vanished into void'</span>
					<span class="bracket">)</span>
					<span class="semicolon">;</span>
				</div>
				<div class="code-line indent">
					<span class="keyword">throw new</span>
					<span class="function"> ExistentialCrisisException</span>
					<span class="bracket">()</span>
					<span class="semicolon">;</span>
				</div>
				<div class="code-line">
					<span class="bracket">}</span>
				</div>
			</div>

			<div class="navigation-buttons">
				<button class="nav-btn primary" @click="goBack">Go Back</button>
				<a
					href="https://krub.dev"
					target="_blank"
					class="nav-btn secondary"
				>
					My Website
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const messages = [
	"This page went on vacation... without notice",
	"404: Page under reality maintenance",
	"Error 404: Page is compiling... eternally",
	"This URL did not pass unit tests",
	"The page you are looking for is in another repository",
	"HTTP 404: Content not found in this universe",
	"Oops! This route got lost in the merge conflict",
	"Page temporarily non-existent (for the past 5 years)",
];

const randomMessage = ref(
	"The page you are looking for seems to have vanished into the code..."
);

onMounted(() => {
	randomMessage.value = messages[Math.floor(Math.random() * messages.length)];
});

const goBack = () => {
	if (window.history.length > 1) {
		window.history.back();
	} else {
		window.location.href = "/";
	}
};
</script>

<style scoped>
.error-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
	padding: 2rem 1rem;
}

.error-content {
	text-align: center;
	max-width: 600px;
	margin: 0 auto;
}

.error-code {
	font-size: 8rem;
	font-weight: 900;
	color: #1e1e1e;
	font-family: "Montserrat", sans-serif;
	margin-bottom: 1rem;
	text-shadow: 4px 4px 8px rgba(30, 30, 30, 0.3);
	animation: bounce 2s infinite;
}

h1 {
	color: #1e1e1e;
	font-size: 2.5em;
	margin: 1rem 0;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

p {
	color: #1e1e1e;
	font-size: 1.2em;
	margin-bottom: 2rem;
	font-family: "Montserrat", sans-serif;
	opacity: 0.8;
}

.error-illustration {
	background: #1e1e1e;
	border-radius: 12px;
	padding: 1.5rem;
	margin: 2rem 0;
	font-family: "Fira Code", monospace;
	text-align: left;
	box-shadow: 0 8px 24px rgba(30, 30, 30, 0.3);
	border: 2px solid #333;
}

.code-line {
	margin: 0.5rem 0;
	font-size: 0.9rem;
	line-height: 1.4;
}

.indent {
	padding-left: 2rem;
}

.error-line {
	background: rgba(245, 202, 28, 0.2);
	padding: 0.2rem;
	border-radius: 4px;
	border-left: 3px solid #f5ca1c;
}

.keyword {
	color: #ff79c6;
}
.variable {
	color: #8be9fd;
}
.function {
	color: #50fa7b;
}
.string {
	color: #f1fa8c;
}
.bracket {
	color: #bd93f9;
}
.operator {
	color: #ff79c6;
}
.semicolon {
	color: #6272a4;
}
.comment {
	color: #6272a4;
	font-style: italic;
}

.navigation-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 2rem;
}

.nav-btn {
	padding: 12px 24px;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	text-decoration: none;
	border-radius: 8px;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	border: none;
	cursor: pointer;
}

.nav-btn.primary {
	background: #1e1e1e;
	color: #f5ca1c;
	border: 2px solid #1e1e1e;
}

.nav-btn.primary:hover {
	background: transparent;
	color: #1e1e1e;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(30, 30, 30, 0.3);
}

.nav-btn.secondary {
	background: transparent;
	color: #1e1e1e;
	border: 2px solid #1e1e1e;
}

.nav-btn.secondary:hover {
	background: #1e1e1e;
	color: #f5ca1c;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(30, 30, 30, 0.3);
}

@keyframes bounce {
	0%,
	20%,
	50%,
	80%,
	100% {
		transform: translateY(0);
	}
	40% {
		transform: translateY(-20px);
	}
	60% {
		transform: translateY(-10px);
	}
}

@media (max-width: 768px) {
	.error-code {
		font-size: 5rem;
	}

	h1 {
		font-size: 1.8em;
	}

	.code-line {
		font-size: 0.8rem;
	}

	.navigation-buttons {
		flex-direction: column;
	}
}
</style>
