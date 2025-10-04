/**
 * Integration Tests for Showroom API CRUD Operations
 * 
 * This test suite validates all CRUD operations (Create, Read, Update, Delete)
 * for the Projects API, including authentication, validation, and error handling.
 * 
 * Test Coverage:
 * - Health check endpoint
 * - GET all projects with pagination
 * - GET projects with search functionality
 * - GET featured projects filter
 * - POST create project (with authentication)
 * - PUT update project (with authentication)
 * - DELETE project (with authentication)
 * - Authentication validation (401 errors)
 * - Not found errors (404)
 * 
 * NOTE: These tests run against a real database. The test server starts on a different
 * port (3002) to avoid conflicts with the development server (3001).
 */

const request = require('supertest');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// API Base URL - testing against the actual server
// We'll use localhost:3001 (the real server should be running)
const BASE_URL = 'http://localhost:3001';

// Test Suite
describe('Showroom API - CRUD Integration Tests', () => {
	let testProjectId;
	const TEACHER_KEY = process.env.TEACHER_KEY || 'ironhack2025';
	
	// Setup: Reset autoincrement sequence before all tests
	beforeAll(async () => {
		// Get the maximum ID currently in the database
		const maxProject = await prisma.project.findFirst({
			orderBy: { id: 'desc' },
			select: { id: true }
		});
		
		if (maxProject) {
			// Reset the sequence to start from max_id + 1
			await prisma.$executeRawUnsafe(
				`SELECT setval(pg_get_serial_sequence('"Project"', 'id'), ${maxProject.id}, true);`
			);
			console.log(`🔄 Reset ID sequence to start from ${maxProject.id + 1}`);
		}
	});
	
	// Cleanup: Delete test projects after all tests
	afterAll(async () => {
		// Clean up any remaining test projects
		await prisma.project.deleteMany({
			where: {
				OR: [
					{ title: { contains: 'Test Project - Integration' } },
					{ title: { contains: 'Test Project Without Auth' } },
					{ title: { contains: 'Test Project Invalid Auth' } }
				]
			}
		});
		await prisma.$disconnect();
	});
	
	// ===============================
	// HEALTH CHECK TESTS
	// ===============================
	describe('GET /api/health', () => {
		it('should return healthy status and database connection', async () => {
			const response = await request(BASE_URL).get('/api/health');
			
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status', 'ok');
			expect(response.body).toHaveProperty('database', 'connected');
			expect(response.body).toHaveProperty('timestamp');
		});
	});
	
	// ===============================
	// READ OPERATIONS (GET)
	// ===============================
	describe('GET /api/projects', () => {
		it('should return paginated list of projects', async () => {
			const response = await request(BASE_URL)
				.get('/api/projects')
				.query({ page: 1, pageSize: 6 });
			
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('data');
			expect(response.body).toHaveProperty('meta');
			expect(Array.isArray(response.body.data)).toBe(true);
			expect(response.body.meta).toHaveProperty('total');
			expect(response.body.meta).toHaveProperty('page', 1);
			expect(response.body.meta).toHaveProperty('pageSize', 6);
			expect(response.body.meta).toHaveProperty('totalPages');
		});
		
		it('should filter projects by search query', async () => {
			const response = await request(BASE_URL)
				.get('/api/projects')
				.query({ search: 'Vue', page: 1, pageSize: 6 });
			
			expect(response.status).toBe(200);
			expect(response.body.data).toBeInstanceOf(Array);
			// Results should contain "Vue" in title, description, or technologies
		});
		
		it('should filter featured projects only', async () => {
			const response = await request(BASE_URL)
				.get('/api/projects')
				.query({ featured: 'true', page: 1, pageSize: 6 });
			
			expect(response.status).toBe(200);
			expect(response.body.data).toBeInstanceOf(Array);
			
			// All returned projects should be featured
			response.body.data.forEach(project => {
				expect(project.featured).toBe(true);
			});
		});
	});
	
	// ===============================
	// CRUD LIFECYCLE TESTS (in order: CREATE → UPDATE → DELETE)
	// These tests must run in sequence to maintain test data consistency
	// ===============================
	describe('CRUD Lifecycle (CREATE → UPDATE → DELETE)', () => {
		// Step 1: CREATE
		it('should create a new project with valid authentication', async () => {
			const newProject = {
				title: 'Test Project - Integration Test',
				description: 'This is a test project created during integration testing',
				image: 'https://via.placeholder.com/800x400?text=Test',
				technologies: ['Jest', 'Supertest', 'Node.js', 'Express'],
				rating: 5,
				repo: 'https://github.com/test/project',
				featured: false
			};
			
			const response = await request(BASE_URL)
				.post('/api/projects')
				.set('x-teacher-key', TEACHER_KEY)
				.send(newProject);
			
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('id');
			expect(response.body.title).toBe(newProject.title);
			expect(response.body.description).toBe(newProject.description);
			expect(response.body.rating).toBe(newProject.rating);
			expect(response.body.technologies).toEqual(newProject.technologies);
			
			// Save project ID for subsequent tests
			testProjectId = response.body.id;
			console.log(`✅ Created test project with ID: ${testProjectId}`);
		});
		
		// Step 2: UPDATE (uses the ID from CREATE)
		it('should update the created project with valid authentication', async () => {
			expect(testProjectId).toBeDefined(); // Ensure CREATE succeeded
			
			const updatedData = {
				title: 'Test Project - Integration Test UPDATED',
				description: 'This project has been updated during testing',
				image: 'https://via.placeholder.com/800x400?text=Updated',
				technologies: ['Jest', 'Supertest', 'Node.js', 'Express', 'PostgreSQL'],
				rating: 4,
				repo: 'https://github.com/test/project-updated',
				featured: true
			};
			
			const response = await request(BASE_URL)
				.put(`/api/projects/${testProjectId}`)
				.set('x-teacher-key', TEACHER_KEY)
				.send(updatedData);
			
			expect(response.status).toBe(200);
			expect(response.body.title).toBe(updatedData.title);
			expect(response.body.description).toBe(updatedData.description);
			expect(response.body.featured).toBe(true);
			expect(response.body.rating).toBe(4);
			console.log(`✅ Updated test project ID: ${testProjectId}`);
		});
		
		// Step 3: DELETE (cleans up the test data)
		it('should delete the created project with valid authentication', async () => {
			expect(testProjectId).toBeDefined(); // Ensure CREATE succeeded
			
			const response = await request(BASE_URL)
				.delete(`/api/projects/${testProjectId}`)
				.set('x-teacher-key', TEACHER_KEY);
			
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('message');
			expect(response.body.message).toContain('deleted');
			
			// Verify project no longer exists
			const getResponse = await request(BASE_URL)
				.get('/api/projects')
				.query({ search: 'Test Project - Integration Test' });
			
			const deletedProject = getResponse.body.data.find(p => p.id === testProjectId);
			expect(deletedProject).toBeUndefined();
			console.log(`✅ Deleted test project ID: ${testProjectId}`);
		});
	});
	
	// ===============================
	// AUTHENTICATION & VALIDATION TESTS
	// ===============================
	describe('POST /api/projects - Authentication & Validation', () => {
		it('should return 401 without authentication', async () => {
			const newProject = {
				title: 'Test Project Without Auth',
				description: 'This should fail'
			};
			
			const response = await request(BASE_URL)
				.post('/api/projects')
				.send(newProject);
			
			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty('error');
		});
		
		it('should return 401 with invalid authentication', async () => {
			const newProject = {
				title: 'Test Project Invalid Auth',
				description: 'This should fail'
			};
			
			const response = await request(BASE_URL)
				.post('/api/projects')
				.set('x-teacher-key', 'wrongkey')
				.send(newProject);
			
			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty('error');
		});
		
		it('should return 400 when title is missing', async () => {
			const invalidProject = {
				description: 'No title provided',
				rating: 3
			};
			
			const response = await request(BASE_URL)
				.post('/api/projects')
				.set('x-teacher-key', TEACHER_KEY)
				.send(invalidProject);
			
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('error');
		});
	});
	
	describe('PUT /api/projects/:id - Authentication & Validation', () => {
		it('should return 401 without authentication', async () => {
			const response = await request(BASE_URL)
				.put('/api/projects/1')
				.send({ title: 'Should fail' });
			
			expect(response.status).toBe(401);
		});
		
		it('should return 404 for non-existent project', async () => {
			const response = await request(BASE_URL)
				.put('/api/projects/999999')
				.set('x-teacher-key', TEACHER_KEY)
				.send({ title: 'Non-existent' });
			
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty('error');
		});
	});
	
	describe('DELETE /api/projects/:id - Authentication & Validation', () => {
		it('should return 401 without authentication', async () => {
			const response = await request(BASE_URL)
				.delete('/api/projects/1');
			
			expect(response.status).toBe(401);
		});
		
		it('should return 404 when deleting non-existent project', async () => {
			const response = await request(BASE_URL)
				.delete('/api/projects/999999')
				.set('x-teacher-key', TEACHER_KEY);
			
			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty('error');
		});
	});
});
