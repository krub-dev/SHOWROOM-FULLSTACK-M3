<template>
	<div class="contact-container">
		<header class="contact-header">
			<h1>Get In Touch</h1>
			<div class="code-subtitle">
				<span class="code-comment"
					>// Ready to build something amazing together?</span
				>
				<div class="code-line">
					<span class="code-keyword">const </span
					><span class="code-variable">collaboration </span
					><span class="code-operator">= </span
					><span class="code-function">await </span
					><span class="code-method">startProject</span
					><span class="code-bracket">(</span
					><span class="code-string">"yourIdea"</span
					><span class="code-bracket">);</span>
				</div>
			</div>
		</header>

		<form class="contact-form" @submit.prevent="handleSubmit">
			<div class="form-group">
				<label for="name">Full Name</label>
				<input
					type="text"
					id="name"
					v-model="formData.name"
					placeholder="Your name"
					required
				/>
			</div>

			<div class="form-group">
				<label for="email">Email Address</label>
				<input
					type="email"
					id="email"
					v-model="formData.email"
					placeholder="your.email@example.com"
					required
				/>
			</div>

			<div class="form-group">
				<label for="subject">Subject</label>
				<select id="subject" v-model="formData.subject" required>
					<option value="">Select a topic</option>
					<option value="collaboration">Project Collaboration</option>
					<option value="freelance">Freelance Work</option>
					<option value="consulting">Technical Consulting</option>
					<option value="other">Other</option>
				</select>
			</div>

			<div class="form-group">
				<label for="message">Message</label>
				<textarea
					id="message"
					v-model="formData.message"
					placeholder="Tell me about your project or idea..."
					rows="6"
					required
				></textarea>
			</div>

			<div class="form-actions">
				<button type="submit" class="submit-btn">
					<span>Send Message</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2 12L22 2L15 22L11 13L2 12Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button type="button" @click="clearForm" class="clear-btn">
					Clear Form
				</button>
			</div>
		</form>

		<div class="linkedin-section">
			<LinkedInButton />
		</div>

		<div v-if="showSuccess" class="success-message">
			<h3>🎉 Message Sent Successfully!</h3>
			<p>Thanks for reaching out! I'll get back to you soon.</p>
		</div>
	</div>
</template>

<script>
import LinkedInButton from "./LinkedInButton.vue";

export default {
	name: "Contact",
	components: {
		LinkedInButton,
	},
	data() {
		return {
			showSuccess: false,
			formData: {
				name: "",
				email: "",
				subject: "",
				message: "",
			},
		};
	},
	methods: {
		handleSubmit() {
			// Simulate form submission
			console.log("Form submitted:", this.formData);

			// Show success message
			this.showSuccess = true;

			// Clear form after successful submission
			setTimeout(() => {
				this.clearForm();
				this.showSuccess = false;
			}, 3000);
		},
		clearForm() {
			this.formData = {
				name: "",
				email: "",
				subject: "",
				message: "",
			};
		},
	},
};
</script>

<style scoped>
.contact-container {
	max-width: 600px;
	margin: 0 auto;
	padding: 1.5rem;
	min-height: calc(100vh - 120px);
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.contact-header {
	text-align: center;
}

.contact-header h1 {
	font-size: 2.5rem;
	font-weight: 700;
	color: #1e1e1e;
	margin-bottom: 0.5rem;
	text-shadow: 2px 2px 4px rgba(245, 202, 28, 0.3);
}

.code-subtitle {
	font-family: "Courier New", "Monaco", "Consolas", monospace;
	font-size: 1rem;
	line-height: 1.6;
	text-align: left;
	max-width: 450px;
	margin: 1rem auto 1rem auto;
	background: #1e1e1e;
	padding: 1.5rem 2rem;
	border-radius: 8px;
	border-left: 3px solid #f5ca1c;
}

.code-comment {
	color: #888;
	font-style: italic;
	display: block;
	margin-bottom: 0.5rem;
}

.code-line {
	display: block;
	margin: 0;
}

.code-keyword {
	color: #ff6b6b;
	font-weight: bold;
}

.code-variable {
	color: #a18aff;
	font-weight: bold;
}

.code-function {
	color: #4dabf7;
	font-weight: bold;
}

.code-method {
	color: #51cf66;
}

.code-operator {
	color: #e9ecef;
}

.code-string {
	color: #ffd43b;
}

.code-bracket {
	color: #e9ecef;
}

.contact-form {
	background: rgba(30, 30, 30, 0.9);
	border: 1px solid #333;
	padding: 3rem 2.5rem;
	border-radius: 12px;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.contact-form:hover {
	border-color: #f5ca1c;
	box-shadow: 0 8px 25px rgba(245, 202, 28, 0.15);
}

.form-group {
	margin-bottom: 1.2rem;
	width: 100%;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form-group label {
	display: block;
	font-weight: 600;
	color: #f5ca1c;
	margin-bottom: 0.5rem;
	font-size: 0.95rem;
	text-align: left;
	width: 100%;
}

.form-group input,
.form-group select,
.form-group textarea {
	width: 100%;
	padding: 0.8rem;
	border: 1px solid #555;
	border-radius: 6px;
	font-size: 1rem;
	background: #2d2d2d;
	color: #fff;
	transition: all 0.3s ease;
	font-family: "Courier New", monospace;
	box-sizing: border-box;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
	outline: none;
	border-color: #f5ca1c;
	box-shadow: 0 0 0 2px rgba(245, 202, 28, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
	color: #888;
}

.form-group textarea {
	resize: vertical;
	min-height: 120px;
}

.form-group select {
	cursor: pointer;
	background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f5ca1c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>");
	background-repeat: no-repeat;
	background-position: right 1rem center;
	background-size: 16px;
	padding-right: 3rem;
}

.form-actions {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 1.5rem;
	width: 100%;
	max-width: 420px;
}

.submit-btn,
.clear-btn {
	padding: 1rem 2rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	min-width: 150px;
	justify-content: center;
}

.submit-btn {
	background: #f5ca1c;
	color: #1e1e1e;
	border: none;
	box-shadow: 0 4px 12px rgba(245, 202, 28, 0.3);
	font-weight: 700;
	transition: all 0.3s ease;
}

.submit-btn:hover {
	background: #ffd43c;
	transform: translateY(-2px);
	box-shadow: 0 6px 16px rgba(245, 202, 28, 0.4);
}

.clear-btn {
	background: transparent;
	color: #f5ca1c;
	border: 1px solid #f5ca1c;
}

.clear-btn:hover {
	background: #f5ca1c;
	color: #1e1e1e;
	transform: translateY(-2px);
}

.success-message {
	margin-top: 1.5rem;
	padding: 1.5rem;
	background: linear-gradient(
		45deg,
		rgba(245, 202, 28, 0.1),
		rgba(245, 202, 28, 0.05)
	);
	border: 2px solid rgba(245, 202, 28, 0.3);
	border-radius: 12px;
	text-align: center;
	animation: slideInUp 0.5s ease;
}

.success-message h3 {
	color: #1e1e1e;
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
}

.success-message p {
	color: #666;
	font-size: 1rem;
	margin: 0;
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Responsive Design */
@media (max-width: 768px) {
	.contact-container {
		padding: 1rem;
	}

	.contact-header h1 {
		font-size: 2rem;
	}

	.contact-form {
		padding: 1.5rem;
	}

	.form-actions {
		flex-direction: column;
		align-items: stretch;
	}

	.submit-btn,
	.clear-btn {
		width: 100%;
	}

	.linkedin-section {
		text-align: center;
	}
}

/* LinkedIn Section */
.linkedin-section {
	text-align: center;
	padding: 0.5rem;
	margin-top: 1rem;
	max-width: 200px;
	margin-left: auto;
	margin-right: auto;
}
</style>
