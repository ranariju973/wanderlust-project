# wanderlust-project

# Wanderlust 🌍

A full-stack travel accommodation platform that connects travelers with unique places to stay around the world, inspired by Airbnb's model of peer-to-peer property sharing.

## Overview

Wanderlust is a comprehensive booking platform that allows property owners to list their homes, apartments, and unique accommodations while enabling travelers to discover and book memorable stays. Whether you're looking for a cozy apartment in the city center, a beachfront villa, or a mountain cabin, Wanderlust makes it easy to find and book your perfect getaway.

## Features

### For Travelers
- **Search & Discovery**: Browse accommodations by location, dates, price range, and property type
- **Detailed Listings**: View high-quality photos, amenities, house rules, and guest reviews
- **Secure Booking**: Safe and secure reservation system with instant confirmation
- **User Reviews**: Read and write reviews to help future travelers make informed decisions
- **Wishlist**: Save favorite properties for future trips
- **Trip Management**: View booking history and manage upcoming reservations

### For Hosts
- **Easy Listing Creation**: Simple process to list your property with photos and descriptions
- **Calendar Management**: Set availability and manage bookings through an intuitive calendar
- **Pricing Tools**: Flexible pricing options and suggestions based on market demand
- **Guest Communication**: Built-in messaging system to communicate with guests
- **Earnings Dashboard**: Track your income and booking performance
- **Review System**: Rate guests and build your hosting reputation

### Core Features
- **Property Listings Management**: Create, read, update, and delete accommodation listings
- **User Authentication**: Secure signup/login system with session management
- **Review System**: Users can leave and view reviews for properties
- **Image Upload**: Cloudinary integration for property photo management
- **Interactive Maps**: Location-based property discovery with maps API
- **Flash Messaging**: Real-time user feedback and notifications
- **Responsive Design**: Mobile-friendly interface across all devices

## Technology Stack

**Backend:**
- **Node.js** with **Express.js** - Server-side runtime and web framework
- **MongoDB Atlas** - Cloud database for storing listings, users, and reviews
- **Mongoose** - ODM for MongoDB integration
- **EJS & EJS-Mate** - Templating engine for dynamic views

**Authentication & Security:**
- **Passport.js** with Local Strategy - User authentication system
- **Express-Session** with **MongoStore** - Secure session management
- **Connect-Flash** - Flash messaging for user feedback

**File Storage & APIs:**
- **Cloudinary** - Cloud-based image storage and management
- **Maps API** - Interactive location mapping for property listings

**Deployment:**
- **Render** - Cloud platform for hosting and deployment
- **MongoDB Atlas** - Cloud database hosting

**Additional Features:**
- RESTful API architecture with organized route handling
- Input validation and error handling
- Responsive web design
- Flash messaging system for user notifications
- Session-based user management

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:8080`

### Deployment
This project is configured for deployment on **Render** with **MongoDB Atlas** as the cloud database.

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Start your next adventure with Wanderlust - where every stay tells a story.*