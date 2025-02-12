# IRCTC Railway Management API

This API provides a railway management system similar to IRCTC, allowing users to check train availability, book seats, and manage bookings. Administrators can manage train data.

## Tech Stack

*   **Backend:** Node.js with Express.js
*   **Database:** Supabase (PostgreSQL)
*   **Authentication & Authorization:** JWT, RBAC
*   **Validation:** Joi
*   **Logging:** Winston
*   **Testing:** Jest, Supertest

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-link>
    cd irctc-api
    ```

2.  **Run the Setup Script:**

    *   **Navigate to the project root directory** in your terminal (where you cloned the repository, and where `setup.bat` file is located).
    *   **Execute the `setup.bat` script:**
        *   **On Windows:** Double-click on `setup.bat` file, or run it from the command prompt by typing `setup.bat` and pressing Enter.
        *   **On macOS/Linux (if you want to use a shell script instead of bat, you would need to create a `setup.sh` and run `chmod +x setup.sh` then `./setup.sh`):**  For this project, a `.bat` file is provided assuming a Windows environment. If you are on macOS or Linux, you'd typically use a shell script (`.sh`).  You would need to adapt the commands in `setup.bat` to a `setup.sh` script for macOS/Linux.  *(For simplicity and to directly use the provided `.bat`, you can use a Windows environment or a compatibility layer like Wine on macOS/Linux to execute `.bat` files.)*

    *   **What does `setup.bat` do?**
        *   **Creates Project Structure:** It automatically creates all the necessary folders and files as outlined in the "Folder & File Structure" section of this README.
        *   **Installs Dependencies:** It runs `npm init -y` to initialize a `package.json` file (if one doesn't exist) and then executes `npm install` to download and install all the required Node.js packages listed in `package.json`. These packages are essential for the API to function.
        *   **Creates Empty Files:** It creates empty files within the created folders so you have a basic structure to start with.

    *   **Prerequisites:** Ensure you have **Node.js and npm (Node Package Manager)** installed on your system before running `setup.bat`. You can download them from [nodejs.org](https://nodejs.org/). `npm` comes bundled with Node.js installations.

3.  **Set up Supabase:**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Create a PostgreSQL database within your Supabase project.
    *   Go to Project Settings -> API and copy your **Project URL** and **anon API key**.
    *   In your Supabase project, go to the SQL Editor and run the SQL schema from `Database Schema & Migrations` section below to create the necessary tables (`users`, `trains`, `bookings`).

4.  **Configure environment variables:**
    *   Create a `.env` file in the root directory if it doesn't exist.
    *   Add the following environment variables, replacing the placeholders with your Supabase credentials and desired keys:

        ```
        PORT=3000
        SUPABASE_URL=YOUR_SUPABASE_URL
        SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        JWT_SECRET=YOUR_JWT_SECRET_KEY  # Generate a strong secret key (e.g., using a password generator)
        ADMIN_API_KEY=YOUR_ADMIN_API_KEY # Generate a strong API key for admin routes (e.g., using a password generator)
        ```
        **Important:**
        *   **`SUPABASE_URL` and `SUPABASE_ANON_KEY`**: Get these from your Supabase project's API settings.
        *   **`JWT_SECRET_KEY` and `ADMIN_API_KEY`**:  These are sensitive security keys. Generate strong, random strings for these.  Do not use easily guessable values. You can use online password generators or tools within your operating system to create strong random strings.

5.  **Run the API:**
    ```bash
    npm start
    ```
    or for development with auto-restart:
    ```bash
    npm run dev
    ```

## API Endpoints

See `API Documentation & Testing` section below for a list of endpoints and a Postman collection.

## Testing

This API project includes unit tests to ensure the core functionalities are working correctly.  The tests are written using Jest and Supertest.

**To run the tests:**

1.  **Ensure dependencies are installed:** If you've followed the setup instructions and run `setup.bat` or `npm install`, the testing dependencies (Jest, Supertest) should already be installed.

2.  **Execute the test command:** In your project's root directory, run the following command in your terminal:
    ```bash
    npm test
    ```

3.  **Test Output:** Jest will execute all test files located in the `src/tests` directory (and its subdirectories, if any). You will see output in your terminal indicating whether tests passed or failed, along with details of any failures.

**What the Tests Cover:**

*   **Authentication (`src/tests/auth.test.js`):** Tests user registration and login functionalities.
*   **Train Management (`src/tests/train.test.js`):** Tests adding trains, updating train seats (admin routes), and getting train availability (user routes).
*   **Booking (`src/tests/booking.test.js`):** Tests booking seats and retrieving booking details.
*   **User Profile (`src/tests/user.test.js`):** Tests getting logged-in user's details.

**Test Frameworks:**

*   **Jest:** A popular JavaScript testing framework providing a rich set of features for writing and running tests, including test runners, assertions, and mocking.
*   **Supertest:** A library for testing HTTP servers. It provides a high-level abstraction for making HTTP requests to your API and asserting on the responses.

By running these tests, you can verify that the API's core features are working as expected after you've set up the project.  For a production-ready API, you would typically expand the test suite to include more comprehensive testing, including integration tests and edge cases.

## Deployment

This API can be deployed to various platforms like:

*   **Railway:** Easiest deployment, connect your GitHub repo and Railway will handle the rest. Set environment variables in Railway's settings.
*   **Vercel/Netlify:**  Suitable for serverless deployments, but might require adjustments for database connections.
*   **AWS/DigitalOcean/Heroku:** Requires more manual configuration, but provides more control over the deployment environment. Dockerizing the application is recommended for these platforms for consistent deployments.

**Security Best Practices:**

*   **API Key for Admin Routes:**  Admin endpoints are protected by an API key. Keep `ADMIN_API_KEY` secret and secure.
*   **JWT Authentication:** User authentication uses JWTs, ensuring secure access to user-specific endpoints.  Keep `JWT_SECRET_KEY` secret and strong.
*   **Input Validation:** Joi is used to validate all incoming request bodies to prevent injection attacks and data integrity issues.
*   **CORS:** CORS is configured to allow requests from your frontend domain (adjust as needed).
*   **Helmet:**  Consider adding Helmet middleware for further security headers in a production environment.
*   **Rate Limiting:** Implement rate limiting middleware (e.g., `express-rate-limit`) to prevent brute-force attacks and abuse.
*   **Sanitization:**  Sanitize user inputs before storing them in the database to prevent XSS and other injection attacks.
*   **Environment Variables:**  Use environment variables to manage sensitive information like API keys, database credentials, and secrets. **Do not hardcode these values.**
*   **HTTPS:**  Enforce HTTPS in production to encrypt communication between clients and the server.

## Assumptions

*   **Simplified Seat Availability:** Seat availability is tracked by simply decrementing `available_seats` in the `trains` table upon booking. No complex seat mapping is implemented.
*   **Race Condition Handling:**  Supabase's PostgreSQL database handles concurrency and transactions, which inherently helps in managing race conditions during seat bookings. Explicit locking mechanisms are not implemented in the code but transactions are used to ensure atomicity.
*   **Basic Error Handling:**  Basic error handling middleware is implemented. More robust error handling and logging can be added for production environments.
*   **Testing:**  Unit tests are included for core functionalities. More comprehensive testing, including integration tests, would be beneficial for a production-ready application.
*   **Admin User:**  No dedicated admin user creation endpoint.  An initial admin user can be created directly in the Supabase database if needed, or the first registered user could be designated as admin (implementation choice). For simplicity, admin role is checked based on JWT and role in this example.

---