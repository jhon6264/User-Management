USER MANAGEMENT SYSTEM - DOCUMENTATION
=======================================

PROJECT STACK
-------------
- Frontend: Next.js 14 with Tailwind CSS
- Backend: Next.js API Routes
- Database: MySQL with XAMPP
- HTTP Client: Axios
- Database Driver: mysql2

PREREQUISITES
-------------
1. Node.js (v16 or higher)
2. XAMPP (for MySQL database)
3. Postman (for API testing)

INSTALLATION & SETUP
--------------------

1. Clone/Download the project
2. Install dependencies:
   npm install

3. Database Setup:
   - Start XAMPP Control Panel
   - Start Apache and MySQL
   - Open phpMyAdmin (http://localhost:8080/phpmyadmin)
   - Create database: user_management

4. Create users table:
   Run this SQL in phpMyAdmin:
   
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

5. Configure database connection:
   Update lib/database.js with your MySQL credentials
   (Default XAMPP: user='root', password='')

6. Run the application:
   npm run dev
   Application will run on http://localhost:3000

POSTMAN INSTALLATION & SETUP
----------------------------
1. Download Postman from: https://www.postman.com/downloads/
2. Install and open Postman
3. Create a new collection called "User Management API"
4. Set base URL: http://localhost:3000/api

API TESTING WITH POSTMAN
------------------------

1. GET ALL USERS
   ---------------
   Method: GET
   URL: http://localhost:3000/api/users
   Expected Response: 200 OK with users array
   Test Case: Retrieve all users from database

2. CREATE NEW USER (POST)
   ----------------------
   Method: POST
   URL: http://localhost:3000/api/users
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "name": "John Doe",
     "email": "john@example.com"
   }
   Expected Response: 201 Created with success message

3. UPDATE USER (PUT)
   -----------------
   Method: PUT
   URL: http://localhost:3000/api/users/[ID]
   Replace [ID] with actual user ID
   Body (raw JSON):
   {
     "name": "John Smith",
     "email": "johnsmith@example.com"
   }
   Expected Response: 200 OK with success message

4. DELETE USER (DELETE)
   --------------------
   Method: DELETE
   URL: http://localhost:3000/api/users/[ID]
   Replace [ID] with actual user ID
   Expected Response: 200 OK with success message

ERROR TESTING SCENARIOS
-----------------------
- POST with duplicate email (should return 400)
- POST with missing fields (should return 400)
- PUT/DELETE with invalid ID (should return 404/500)
- GET with server error (simulate DB disconnect)

FRONTEND TESTING PHASE
----------------------

1. USER INTERFACE TESTS
   - Verify responsive design on different screen sizes
   - Check if user table loads correctly
   - Test form validation (empty submissions)
   - Verify real-time updates after CRUD operations

2. FUNCTIONALITY TESTS
   - Add New User:
     * Fill form with name and email
     * Submit and verify user appears in list
     * Test duplicate email validation

   - Edit User:
     * Click edit button on any user
     * Modify name/email in modal
     * Save and verify changes in table

   - Delete User:
     * Click delete button
     * Confirm deletion (if implemented)
     * Verify user removed from list

   - Error Handling:
     * Test with API server stopped
     * Verify error messages display properly

3. PERFORMANCE TESTS
   - Check loading states during API calls
   - Test large number of users in table
   - Verify smooth animations and transitions

TECHNOLOGY EXPLANATIONS
-----------------------

AXIOS
-----
- Promise-based HTTP client for browser and Node.js
- Used for making API requests from frontend
- Features: request/response interceptors, automatic JSON transformation
- Handles errors with try-catch blocks

MYSQL2
------
- MySQL client for Node.js with focus on performance
- Supports prepared statements (security against SQL injection)
- Promise-based API for async/await usage
- Used in lib/database.js for database operations

DATABASE CONFIGURATION
----------------------
Database Name: user_management
Table: users

Table Structure:
- id (INT, Primary Key, Auto Increment)
- name (VARCHAR(100), Not Null)
- email (VARCHAR(100), Not Null, Unique)
- created_at (TIMESTAMP, Default: Current Timestamp)

API ENDPOINTS SUMMARY
---------------------
GET    /api/users          - Get all users
POST   /api/users          - Create new user
PUT    /api/users/[id]     - Update user by ID
DELETE /api/users/[id]     - Delete user by ID

TROUBLESHOOTING
---------------
Common Issues:
1. Database connection failed: Check XAMPP MySQL is running
2. Port 3000 in use: Kill other processes or use different port
3. CORS issues: Next.js handles API routes automatically
4. Module not found: Run npm install again

SUCCESS INDICATORS
------------------
-  All Postman API tests pass
-  Frontend CRUD operations work smoothly
-  No console errors in browser
-  Responsive design on mobile/desktop
-  Proper error handling and user feedback

SUPPORT
-------
For issues, check:
1. Browser console for errors
2. Terminal running Next.js for server errors
3. XAMPP logs for database issues
4. Network tab in browser dev tools for API calls

For more project contact me in FB: Jhon Cristopher Potestas