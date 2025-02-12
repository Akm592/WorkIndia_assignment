# IRCTC Railway Management API

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  <!-- Optional: Add your license badge -->

## Project Overview

This API provides a backend system for a railway management platform, emulating functionalities similar to IRCTC. It allows users to check train availability between stations, view seat availability, book seats, and manage their bookings after logging in.  Administrators have additional privileges to manage train data, such as adding new trains and updating seat capacities.

This project is designed to handle concurrent requests and race conditions, ensuring data integrity and a smooth user experience. It also incorporates Role-Based Access Control (RBAC) to differentiate between user and administrator functionalities.

## Tech Stack

*   **Backend Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) - A fast and minimalist web application framework for Node.js.
*   **Database:** [Supabase](https://supabase.com/) - A Backend-as-a-Service (BaaS) platform using PostgreSQL as its database.
*   **Authentication & Authorization:** [JSON Web Tokens (JWT)](https://jwt.io/) for secure authentication and Role-Based Access Control (RBAC).
*   **Input Validation:** [Joi](https://joi.dev/) for robust request body validation.
*   **Logging:** [Winston](https://github.com/winstonjs/winston) for comprehensive logging.
*   **Environment Variables:** [dotenv](https://github.com/motdotla/dotenv) for secure configuration management.
*   **Password Hashing:** [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) for secure password storage.
*   **Cross-Origin Resource Sharing (CORS):** [cors](https://github.com/expressjs/cors) for controlled API access from different origins.
*   **Testing:** [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for unit and integration testing.

## Features

**For All Users (including Guest/Unauthenticated):**

*   **Train Availability Check:**
    *   Users can query for trains running between specified source and destination stations.
    *   The API returns a list of trains with their availability.

**For Registered & Logged-in Users (Role: User):**

*   **Seat Booking:**
    *   Logged-in users can book seats on available trains.
    *   The system handles seat availability in real-time and manages race conditions during concurrent bookings.
*   **Booking Details:**
    *   Users can retrieve details of their specific bookings using booking IDs.
*   **User Profile:**
    *   Users can access their profile information (username, role).

**For Administrators (Role: Admin):**

*   **Add New Train:**
    *   Administrators can add new train routes to the system, specifying train name, source, destination, and total seat capacity.
*   **Update Train Seat Capacity:**
    *   Administrators can update the total seat capacity of existing trains.
*   **Access to all User Features:**
    *   Admins can also perform all actions available to regular users, like checking availability and booking seats.

**Security Features:**

*   **API Key Protection for Admin Endpoints:**  Admin-specific API endpoints are protected with a secret API key, preventing unauthorized access and data manipulation.
*   **JWT-Based Authentication for User Endpoints:** User-specific endpoints (booking, profile) are secured using JWT authentication, ensuring only logged-in users with valid tokens can access them.
*   **Role-Based Access Control (RBAC):**  The API enforces RBAC, ensuring that only users with the 'admin' role can access administrative functionalities, and regular users can only access their designated features.
*   **Input Validation:**  All API requests are rigorously validated using Joi to prevent injection attacks and ensure data integrity.
*   **Password Hashing:** User passwords are securely hashed using bcrypt before being stored in the database.

## Setup Instructions

Before you begin, ensure you have the following installed:

### Prerequisites

1.  **Node.js and npm (Node Package Manager):**  Download and install from [nodejs.org](https://nodejs.org/). npm is included with Node.js.
2.  **Git:**  For version control and cloning the repository. Install from [git-scm.com](https://git-scm.com/).
3.  **Supabase Account:** Sign up for a free account at [supabase.com](https://supabase.com/).

### Step-by-Step Setup

1.  **Clone the Repository:**

    Open your terminal or command prompt and navigate to the directory where you want to store the project. Then, clone the repository using Git:

    ```bash
    git clone <repository-link>  # Replace <repository-link> with the actual repository URL
    cd irctc-api
    ```

2.  **Run the Setup Script:**

    In the project directory, execute the `setup.bat` script. This script will:

    *   Create the necessary folder structure (`src`, `controllers`, `routes`, etc.).
    *   Initialize an `npm` project (`package.json`).
    *   Install all required npm dependencies (Express, Supabase, JWT, Joi, Winston, dotenv, bcrypt, cors, Jest, Supertest).

    ```bash
    setup.bat
    ```

3.  **Set up Supabase Database:**

    *   **Create a Supabase Project:** Go to [supabase.com](https://supabase.com/), log in, and create a new project. Choose a name, region, and set a database password.
    *   **Get API Keys:** Once your Supabase project is created, navigate to **Project Settings** -> **API**. Copy the **Project URL** and **anon API key**. You'll need these for your `.env` file.
    *   **Run SQL Schema:** In your Supabase project, go to the **SQL Editor**. Copy and paste the SQL schema provided in the `Database Schema & Migrations` section of the main documentation into the editor and click "Run". This will create the `users`, `trains`, and `bookings` tables in your Supabase database.

4.  **Configure Environment Variables:**

    *   Create a `.env` file in the root directory of your project if it doesn't already exist.
    *   Open the `.env` file and add the following environment variables, replacing the placeholders with your actual values:

        ```
        PORT=3000                      # Port for the API to run on (default: 3000)
        SUPABASE_URL=YOUR_SUPABASE_URL       # Your Supabase Project URL (copied from Supabase dashboard)
        SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY # Your Supabase anon API key (copied from Supabase dashboard)
        JWT_SECRET=YOUR_JWT_SECRET_KEY        #  A strong, randomly generated secret key for JWT signing (e.g., use a password generator)
        ADMIN_API_KEY=YOUR_ADMIN_API_KEY      # A strong, randomly generated API key to protect admin routes (e.g., use a password generator)
        ```

        **Important:**
        *   **`JWT_SECRET_KEY` and `ADMIN_API_KEY` should be kept secret and secure.**  Do not commit these values directly into your code repository. Generate strong, random strings for these keys.
        *   Ensure you have correctly copied the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase project settings.

5.  **Run the API Server:**

    *   **Development Mode (with auto-restart):**  For development, use `nodemon` to automatically restart the server whenever you make code changes.

        ```bash
        npm run dev
        ```

    *   **Production Mode:** For running the API in a production-like environment, use:

        ```bash
        npm start
        ```

    The API server will start running on the port specified in your `.env` file (default is `http://localhost:3000`). You can access the base URL in your browser to verify if the server is running (it should display "IRCTC API is running!").

## API Endpoints

| Endpoint                       | Method | Description                                  | Authentication | Authorization | Request Body                                 | Response Body                                  |
| :----------------------------- | :----- | :------------------------------------------- | :------------- | :-------------- | :------------------------------------------- | :--------------------------------------------- |
| `/api/auth/register`           | POST   | Register a new user                          | Public         | None           | `{ username, password }`                    | `{ message, user }`                            |
| `/api/auth/login`              | POST   | Login user                                   | Public         | None           | `{ username, password }`                    | `{ message, token, user }`                     |
| `/api/trains`                 | POST   | Add a new train (Admin only)                 | API Key        | Admin           | `trainSchema` (see models/trainModel.js)     | `{ message, train }`                           |
| `/api/trains/:trainId/seats`   | PUT    | Update train total seats (Admin only)        | API Key        | Admin           | `{ total_seats }`                            | `{ message, train }`                           |
| `/api/trains/availability`    | GET    | Get train availability between stations      | JWT            | User/Admin      | Query params: `source`, `destination`       | `{ trains: [] }`                               |
| `/api/bookings`               | POST   | Book a seat on a train                      | JWT            | User           | `bookingSchema` (see models/bookingModel.js) | `{ message, booking }`                         |
| `/api/bookings/:bookingId`     | GET    | Get specific booking details                 | JWT            | User           | None                                       | `{ booking }`                                  |
| `/api/users/me`                 | GET    | Get logged-in user's details                 | JWT            | User/Admin      | None                                       | `{ user }`                                     |

**Request and Response Body Schemas:**

Refer to the files in the `src/models` directory (`trainModel.js`, `userModel.js`, `bookingModel.js`) for detailed schemas of request and response bodies where indicated (e.g., `trainSchema`, `bookingSchema`).

## Testing

### Unit Tests

The API includes unit tests written using Jest and Supertest. To run the tests:

```bash
npm test