<template>
	<a
		class="libutton"
		href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=krub"
		target="_blank"
		rel="noopener noreferrer"
	>
		Follow on LinkedIn
	</a>
</template>

<script>
export default {
	name: "LinkedInButton",
};
</script>

<style scoped>
.libutton {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 7px;
	text-align: center;
	outline: none;
	text-decoration: none !important;
	color: #ffffff !important;
	width: 160px;
	height: 32px;
	border-radius: 8px;
	background-color: #0a66c2;
	font-family: "SF Pro Text", Helvetica, sans-serif;
}

.libutton:hover {
	background-color: #004182;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(10, 102, 194, 0.5);
}
</style>
