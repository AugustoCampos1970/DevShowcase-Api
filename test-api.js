#!/usr/bin/env node
/**
 * Test script for DevShowcase API
 * 
 * This script tests all the main endpoints of the API.
 * Run it after starting the server: `npm run dev`
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
let createdProfileId = null;
let createdTechnologyIds = [];
let createdProjectId = null;
let createdFeedbackId = null;

async function testAPI() {
  console.log('🧪 Testing DevShowcase API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log(`   ✓ Health: ${healthResponse.data.status} - ${healthResponse.data.message}`);

    // Test 2: Create Profile
    console.log('\n2. Creating Profile...');
    const profileData = {
      name: 'Test Developer',
      bio: 'A test developer for API testing',
      githubUrl: 'https://github.com/testdeveloper'
    };

    const profileResponse = await axios.post(`${API_BASE_URL}/profiles`, profileData);
    createdProfileId = profileResponse.data.data.id;
    console.log(`   ✓ Profile created with ID: ${createdProfileId}`);

    // Test 3: Create Technologies
    console.log('\n3. Creating Technologies...');
    const technologies = ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'];
    
    for (const techName of technologies) {
      const techResponse = await axios.post(`${API_BASE_URL}/technologies`, { name: techName });
      createdTechnologyIds.push(techResponse.data.data.id);
      console.log(`   ✓ Technology created: ${techName} (ID: ${techResponse.data.data.id})`);
    }

    // Test 4: Create Project
    console.log('\n4. Creating Project...');
    const projectData = {
      title: 'Test API Project',
      description: 'A test project for API validation',
      repositoryUrl: 'https://github.com/testdeveloper/test-project',
      profileId: createdProfileId,
      technologyIds: createdTechnologyIds
    };

    const projectResponse = await axios.post(`${API_BASE_URL}/projects`, projectData);
    createdProjectId = projectResponse.data.data.id;
    console.log(`   ✓ Project created with ID: ${createdProjectId}`);

    // Test 5: Get All Projects
    console.log('\n5. Getting All Projects...');
    const projectsResponse = await axios.get(`${API_BASE_URL}/projects`);
    console.log(`   ✓ Retrieved ${projectsResponse.data.data.length} projects`);

    // Test 6: Get Project by ID
    console.log('\n6. Getting Project by ID...');
    const projectByIdResponse = await axios.get(`${API_BASE_URL}/projects/${createdProjectId}`);
    console.log(`   ✓ Project found: ${projectByIdResponse.data.data.title}`);

    // Test 7: Upvote Project
    console.log('\n7. Upvoting Project...');
    const upvoteResponse = await axios.put(`${API_BASE_URL}/projects/${createdProjectId}/upvote`);
    console.log(`   ✓ Project upvoted. New like count: ${upvoteResponse.data.data.likes}`);

    // Test 8: Add Feedback
    console.log('\n8. Adding Feedback...');
    const feedbackData = {
      rating: 5,
      comment: 'Excellent test project!',
      authorName: 'Test Reviewer'
    };

    const feedbackResponse = await axios.post(
      `${API_BASE_URL}/projects/${createdProjectId}/feedbacks`, 
      feedbackData
    );
    createdFeedbackId = feedbackResponse.data.data.id;
    console.log(`   ✓ Feedback added with ID: ${createdFeedbackId}`);

    // Test 9: Get Feedbacks for Project
    console.log('\n9. Getting Feedbacks for Project...');
    const feedbacksResponse = await axios.get(`${API_BASE_URL}/projects/${createdProjectId}/feedbacks`);
    console.log(`   ✓ Retrieved ${feedbacksResponse.data.count} feedbacks`);

    // Test 10: Get All Technologies
    console.log('\n10. Getting All Technologies...');
    const technologiesResponse = await axios.get(`${API_BASE_URL}/technologies`);
    console.log(`   ✓ Retrieved ${technologiesResponse.data.count} technologies`);

    // Test 11: Get Profile by ID
    console.log('\n11. Getting Profile by ID...');
    const profileByIdResponse = await axios.get(`${API_BASE_URL}/profiles/${createdProfileId}`);
    console.log(`   ✓ Profile found: ${profileByIdResponse.data.data.name}`);

    // Test 12: Test Error Handling
    console.log('\n12. Testing Error Handling...');
    
    // Invalid ID
    try {
      await axios.get(`${API_BASE_URL}/profiles/999999`);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('   ✓ 404 Error handled correctly');
      }
    }

    // Invalid data
    try {
      await axios.post(`${API_BASE_URL}/profiles`, {});
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('   ✓ 400 Validation Error handled correctly');
      }
    }

    // Test 13: Test Pagination and Filtering
    console.log('\n13. Testing Pagination...');
    const paginatedResponse = await axios.get(`${API_BASE_URL}/projects?page=1&limit=2`);
    console.log(`   ✓ Pagination working. Page: ${paginatedResponse.data.pagination.page}, Limit: ${paginatedResponse.data.pagination.limit}`);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Test Summary:');
    console.log(`   - Created Profile ID: ${createdProfileId}`);
    console.log(`   - Created Project ID: ${createdProjectId}`);
    console.log(`   - Created Feedback ID: ${createdFeedbackId}`);
    console.log(`   - Created Technologies: ${createdTechnologyIds.length}`);
    console.log(`\n🔗 Test the API manually:`);
    console.log(`   - Swagger Docs: http://localhost:3000/docs`);
    console.log(`   - Health Check: http://localhost:3000/health`);
    console.log(`   - Profile: http://localhost:3000/api/profiles/${createdProfileId}`);
    console.log(`   - Project: http://localhost:3000/api/projects/${createdProjectId}`);

  } catch (error) {
    console.error('\n❌ Test failed!');
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Error: ${error.response.data.error || 'Unknown error'}`);
      console.error(`   Message: ${error.response.data.message || 'No message'}`);
      
      if (error.response.data.details) {
        console.error(`   Details:`, error.response.data.details);
      }
    } else if (error.request) {
      console.error('   No response received. Is the server running?');
      console.error('   Start the server with: npm run dev');
    } else {
      console.error(`   Error: ${error.message}`);
    }
    
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;