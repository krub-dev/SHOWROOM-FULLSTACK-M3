<template>
	<div class="skeleton-container">
		<div
			v-for="n in count"
			:key="n"
			class="skeleton-card"
			:style="{ animationDelay: `${n * 0.1}s` }"
		>
			<!-- Header (simula el título del accordion) -->
			<div class="skeleton-accordion-header">
				<div class="skeleton-title"></div>
				<div class="skeleton-arrow"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SkeletonLoader",
	props: {
		count: {
			type: Number,
			default: 3, // Número de skeletons a mostrar
		},
	},
};
</script>

<style scoped>
.skeleton-container {
	width: 90%;
	margin: 0 auto;
}

.skeleton-card {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #333;
	border-radius: 12px;
	padding: 1.5em 2em;
	margin-bottom: 1.5em;
	animation: fadeIn 0.3s ease-in-out;
}

.skeleton-accordion-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
}

.skeleton-title {
	flex: 1;
	height: 24px;
	background: linear-gradient(90deg, #2d2d2d 0%, #404040 50%, #2d2d2d 100%);
	background-size: 200% 100%;
	animation: shimmer 1.5s ease-in-out infinite;
	border-radius: 6px;
}

.skeleton-arrow {
	width: 20px;
	height: 20px;
	background: linear-gradient(90deg, #2d2d2d 0%, #404040 50%, #2d2d2d 100%);
	background-size: 200% 100%;
	animation: shimmer 1.5s ease-in-out infinite;
	border-radius: 4px;
}

/* Animación de brillo que se mueve (shimmer) */
@keyframes shimmer {
	0% {
		background-position: -200% 0;
	}
	100% {
		background-position: 200% 0;
	}
}

/* Fade in suave al aparecer */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Responsive */
@media (max-width: 768px) {
	.skeleton-card {
		padding: 1rem 1.5rem;
	}

	.skeleton-title {
		height: 20px;
	}
}

@media (max-width: 480px) {
	.skeleton-card {
		padding: 0.8rem 1rem;
	}

	.skeleton-title {
		height: 18px;
	}

	.skeleton-arrow {
		width: 16px;
		height: 16px;
	}
}
</style>
