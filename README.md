# BreezeBnB

BreezeBnB is an Airbnb-like web application built using the MERN stack. It allows users to explore, list, and manage vacation rental properties seamlessly. The application includes various functionalities to provide a user-friendly and dynamic experience.

## Features

### User Management

- **Signup**: New users can register with their credentials.
- **Login & Logout**: Users can securely log in and out of their accounts.

### Listing Management

- **Add New Listing**: Users can add rental properties with details such as title, description, price, and location.
- **Update Listing**: Existing listings can be edited to reflect updated information.
- **Delete Listing**: Unwanted listings can be removed from the platform.

### Search and Filter

- **Search Functionality**: Users can search for listings by entering keywords related to the title, description, or location of the properties. The search feature ensures users can quickly find relevant results.
- **Filter Options**: Users can filter listings based on categories such as price range, location, and specific property types like "Rooms," "Beaches," or "Mountains." This dynamic filtering enhances the user experience by allowing them to narrow down their choices efficiently.

### Reviews

- **Add Reviews**: Users can leave reviews for listings.
- **Delete Reviews**: Users can delete their own reviews.

### Map Preview

- **Location Visualization**: View the precise location of listings on an interactive map for better convenience.

### Booking System (Upcoming)

- **Reserve Listings**: Users will soon be able to reserve listings directly through the platform.
- **Payment Integration**: Plans to integrate a secure payment gateway for seamless transactions are underway.

## Technologies Used

### Backend

- **Node.js**: The backend is powered by Express.js, a minimal and flexible Node.js web application framework.
- **RESTful API**: Implemented to handle user management, listing management, and dynamic features like search and filtering.
- **MongoDB**: Used as the database, leveraging its schema-less nature and aggregation framework for complex queries, including search and filter operations.
- **File Uploads**: Multer middleware is used for handling file uploads, allowing users to upload images for their listings.
- **Authentication**: Sessions and cookies are managed securely to maintain user state.
- **Error Handling**: Comprehensive error handling to ensure robustness and provide meaningful error messages to users.

### Frontend

- **EJS (Embedded JavaScript Templates)**: Used for rendering dynamic content on the server-side.
- **Responsive Design**: Built with mobile-first design principles to ensure accessibility across devices.
- **Dynamic Forms**: Forms for listings and reviews include real-time validation to enhance user experience.
- **Interactive Elements**: Features like dropdowns and modals are integrated to improve usability.

### Deployment

- **Render**: The application is deployed on Render for live usage.
- **Continuous Integration**: Automated deployment pipelines are set up for seamless updates.

## Live Demo

Experience BreezeBnB live: [BreezeBnB on Render](https://breezebnb-r4nk.onrender.com)
