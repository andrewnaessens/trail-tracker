# Trail Tracker

## Project Description
Trail Tracker is a full stack node web application for listing and managing hiking trail information.

## Features
- **Data Persistance**: Multi-store support (MongoDB, JSON, In-Memory) with automated database seeding.
- **User Dashboard**: User dashboard with category and trail views.
- **Admin Dashboard**: Admin dashboard for managing users and viewing analytics.
- **User Profile**: User profile for managing user information and viewing analytics.
- **Image Management**: Seamless image uploads for trail categories integrated with **Cloudinary**.
- **Secure Authentication**: Custom JWT (JSON Web Token) implementation for protected API routes and authentication via sessions.
- **API Documentation**: Fully interactive **Swagger** UI for testing and exploring endpoints.

## Tech Stack
- **Backend**: Node.js, Hapi.js
- **Frontend**: Handlebars (HBS), Bulma CSS, Font Awesome
- **Database**: MongoDB Atlas (Mongoose)
- **Security and Validation**: JWT, Joi
- **Image Storage**: Cloudinary

## Prerequisites
- Node.js
- MongoDB Atlas Account
- Cloudinary Account
- Font Awesome Account

## Getting Started

Follow the below steps to get a local copy of the project up and running.

### Installation
- Clone the repository:
  `git clone https://github.com/andrewnaessens/trail-tracker`
- Navigate to the project directory:
  `cd repository-name`
- Install the dependencies:
  `npm install`

### Configuration
- Copy the template file:
  `cp .env_example .env`
- Open `.env` and fill in your credentials.

### Development
- To start the development server, run:
  `npm run dev`
  