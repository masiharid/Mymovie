# Mymovie App

Mymovie is a web application that allows users to browse and book movie tickets. The app provides a seamless experience for users to view movie details, select seats, and make payments for their bookings. It is built using modern web technologies such as React, Redux, and Ant Design.

## Features

- **Browse Movies**: Users can browse a list of available movies, view details such as title, language, and poster.
- **Book Tickets**: Users can select a movie, choose a showtime, and book tickets by selecting their preferred seats.
- **User Profile**: Users can view their booking history and details in their profile.
- **Payment Integration**: Secure payment processing using Stripe.
- **Responsive Design**: The app is designed to be responsive and works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Redux, React Router, Ant Design
- **Backend**: Node.js, Express, MongoDB
- **Payment**: Stripe
- **Styling**: CSS, Ant Design

Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login a user.
Movies
GET /api/movies: Get a list of all movies.
GET /api/movies/:id: Get details of a specific movie.
Theatres
GET /api/theatres: Get a list of all theatres.
GET /api/theatres/:id: Get details of a specific theatre.
Shows
GET /api/shows: Get a list of all shows.
GET /api/shows/:id: Get details of a specific show.
Bookings
POST /api/bookings: Create a new booking.
GET /api/bookings: Get a list of all bookings for the logged-in user.
Usage
Browse Movies: Navigate to the home page to view a list of available movies.
Book Tickets: Click on a movie to view details and select a showtime. Choose your seats and proceed to payment.
View Profile: Go to the profile page to view your booking history and details.
