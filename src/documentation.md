# Table of Contents

-   [Introduction](#introduction)
-   [Project Scope](#project-scope)
-   [Requirements](#requirements)
    -   [Functional Requirements](#functional-requirements)
    -   [Non-Functional Requirements](#non-functional-requirements)
-   [Technology Stack](#technology-stack)
    -   [Back-End](#back-end)
    -   [API](#api)
    -   [Deployment](#deployment)
-   [Architectural Design](#architectural-design)
-   [Model Schema](#model-schema)
-   [API Endpoints](#api-endpoints)
-   [Installation Guide](#installation-guide)

---

# Introduction

Welcome to our Real-Time Chat Application! In a world where communication is key, our application aims to provide a seamless and instantaneous chatting experience. With the power of real-time messaging, secure user authentication, and efficient message storage, we've created an environment where users can connect and converse effortlessly. Our application's backend architecture, driven by Node.js, Express.js, and MongoDB, guarantees performance and scalability. Your data's security is our priority, as we implement encryption protocols and user access controls. Whether you're catching up on chat history or sending messages in the moment, our application is designed to enhance your communication journey. Let's chat in real time!

---

# Project Scope

### Objectives and Goals

The primary objective of this project is to develop a robust and scalable backend application that supports the core functionality of a real-time chat application. The goals of the project are as follows:

-   **Real-Time Messaging:** Implement a backend system that enables users to send and receive messages in real-time.
-   **User Authentication:** Develop a secure authentication system that allows users to register and log in to the application.
-   **Message Storage:** Create a database structure to store user messages and chat history.
-   **API Endpoints:** Design and implement a set of API endpoints for user registration, authentication, and message management.

### Included Features

The backend application will include the following features:

-   User registration and login functionality using JWT authentication.
-   Real-time message broadcasting and synchronization using websockets.
-   Message storage in a database for future retrieval.
-   RESTful API endpoints for user management and message handling.

### Excluded Features

The following features are excluded from the scope of this backend development:

-   User interface design and front-end development.
-   Multimedia sharing, such as images and files.
-   Advanced chat features like reactions and emoji support.

# Requirements : Functional and Non-Functional Requirements

## Functional Requirements

### User Authentication and Authorization

1. **User Registration:** Users should be able to register an account using a unique email address and password.
2. **User Login:** Registered users should be able to log in using their credentials.
3. **Authentication Token:** Upon successful login, the system should generate an authentication token (JWT) for secure API access.

### Real-Time Messaging

4. **Send Message:** Users should be able to send text messages to other users in real time.
5. **Receive Message:** Messages sent by users should be delivered instantly to the intended recipients.
6. **Message Synchronization:** Messages should be synchronized across devices in real time for a consistent chat experience.

### Message Storage and Retrieval

7. **Message Storage:** The backend should store messages in a structured database, associating them with sender and recipient information.
8. **Chat History:** Users should have the ability to retrieve their chat history and view past conversations.

### API Endpoints

9. **User Registration Endpoint:** Implement an API endpoint for user registration, validating and storing user information securely.
10. **User Login Endpoint:** Create an API endpoint for user login, generating authentication tokens upon successful login.
11. **Message Sending Endpoint:** Develop an API endpoint to handle sending and receiving messages between users.
12. **Chat History Endpoint:** Design an API endpoint to retrieve chat history for users.

## Non-Functional Requirements

### Performance and Scalability

1. **Concurrent Users:** The backend architecture should support a large number of concurrent users without performance degradation.
2. **Message Delivery Speed:** Messages should be delivered to recipients within milliseconds for an instant chat experience.

### Security

3. **Data Encryption:** User data, including passwords and messages, should be stored and transmitted securely using encryption protocols.
4. **Authentication Security:** Authentication tokens (JWT) should be encrypted and have well-defined expiration policies.
5. **Authorization:** Access to user data and functionalities should be restricted based on user roles and permissions.

### User Experience

6. **User Interface Responsiveness:** The application should provide a responsive user interface that adapts to different devices and screen sizes.
7. **Real-Time Updates:** Users should receive real-time updates on new messages without the need to refresh the page.

### Error Handling and Logging

8. **Graceful Error Handling:** The application should handle errors gracefully and provide informative error messages to users.
9. **Logging:** Events, errors, and exceptions should be logged for monitoring, debugging, and analysis.

### Deployment and Maintenance

10. **Environment Compatibility:** The application should be deployable on various environments, including development, testing, and production.
11. **Maintenance Strategy:** Develop a strategy for ongoing maintenance, updates, bug fixes, and enhancements.

# Technology Stack:

### Back-End

#### Programming Language: Node.js

Node.js has been chosen for the back-end due to its non-blocking I/O and event-driven architecture, which makes it well-suited for handling concurrent connections and real-time applications. Its extensive package ecosystem through npm will expedite development.

#### Framework: Express.js

Express.js will serve as the web application framework for its minimalistic approach and flexibility. It provides essential features for routing, middleware, and request handling, allowing for the creation of efficient APIs and microservices.

#### Database: MongoDB

MongoDB, a NoSQL database, has been selected for its schema-less design and scalability. This is particularly suitable for scenarios where the data structure might evolve over time. Its support for handling large amounts of unstructured data aligns with the project's requirements.

### API

#### Authentication: JSON Web Tokens (JWT)

JWT will be used for authentication due to its stateless nature and ability to securely transmit claims between parties. It is well-suited for building secure APIs that require token-based authentication and authorization.

#### API Documentation: Swagger/OpenAPI

Swagger/OpenAPI will be employed to create comprehensive and interactive API documentation. This simplifies communication between the front-end and back-end teams and aids third-party integration.

### Deployment

#### Hosting: Amazon Web Services (AWS)

AWS will be used for hosting due to its reliability, scalability, and wide range of services. Elastic Beanstalk will simplify deployment, auto-scaling, and load balancing, while Amazon RDS will handle database management.

#### Continuous Integration/Continuous Deployment (CI/CD): CircleCI

CircleCI will be utilized for Continuous Integration/Continuous Deployment processes. It will automate build, test, and deployment processes to ensure consistent and reliable releases.

# Architectural Design

## System Overview

The Real-Time Chat Application is designed to provide users with a seamless and responsive communication platform. The system's architecture is based on a microservices approach, utilizing Node.js, Express.js, MongoDB, and WebSocket technology. The architecture ensures scalability, real-time messaging,

## Data Flow

A user registers or logs in through the Authentication Service, which generates a JWT upon successful login.

The user uses the generated JWT to authenticate with the API Gateway.

When a user sends a message, the Messaging Service broadcasts it to the intended recipient(s) using WebSockets.

The Messaging Service stores messages in the Database Service, associating them with sender and recipient information.

The user can request their chat history through API endpoints, and the Database Service retrieves the relevant messages.

# Model Schema

### User Collection:

-   \_id: Unique user ID
-   name: User's name
-   email: User's email

### Room Collection:

-   \_id: Unique room ID
-   name: Room name or identifier
-   createdBy
-   participants: Array of user IDs participating in the room

### Message Collection:

-   \_id: Unique message ID
-   roomId: ID of the room the message belongs to
-   senderId: ID of the user who sent the message
-   content: Message content
-   timestamp: Timestamp of when the message was sent

# API endpoints

1. **User Authentication and Management:**

    - `POST /api/users/signup`: Register a new user.
    - `POST /api/users/login`: Log in an existing user.
    - `POST /api/users//forgetPassword`: send token to user for rest password
    - `POST /api/users/resetPassword/:resetToken`: Change user's password.
    - `POST /api/logout`: Log out the user.
    - `GET /api/profile`: Get user's profile information.
    - `PUT /api/profile`: Update user's profile information.

2. **Chat Management:**

    - `POST /api/rooms/create`: Create a new chat or retrieve existing chat.
    - `GET /api/rooms/:chatId`: Get chat details.
    - `GET /api/rooms/Participants`: Get a list of user's chats.
    - `PUT /api/rooms/:chatId`: Update chat settings.
    - `DELETE /api/rooms/:chatId`: Delete a chat.

3. **Message Management:**

    - `POST /api/room/join`: Send a message in a specific chat.
    - `GET /api/rooms/:chatId/messages`: Get message history in a chat.
    - `GET /api/chats/:chatId/messages/:messageId`: Get a specific message in a chat.
    - `PUT /api/chats/:chatId/messages/:messageId`: Edit a message in a chat.
    - `DELETE /api/chats/:chatId/messages/:messageId`: Delete a message in a chat.

# Installation Guide: Real-Time Chat Application

### Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your system:

-   Node.js: Download and install Node.js, which includes npm (Node Package Manager).
-   MongoDB: Set up a MongoDB database for storing user data and chat history.

### Local Development Environment

1.  Clone the Repository:

    ```
    git clone <repository-url>
    ```

2.  Install Dependencies:

    ```
    npm install
    ```

3.  Configure Environment Variables:

    -   Create a `.env` file in the root directory of the project.
    -   Define the following environment variables:

        ```
        PORT="port number"
        WHITE_LIST = "\*"
        EMAIL = "Your_Application_Email@example.com"
        DB_HOST = "Database_Hostname_or_IP"
        JWT_SECRET_KEY = "Your_Secret_Key_Here"
        SENDGRID_API_KEY = "Your_SendGrid_API_Key"
        MAILTRAP_USER = "Your_Mailtrap_Username"
        MAILTRAP_PASS = "Your_Mailtrap_Password"

        ```

4.  Start the Application:

    ```
    npm start
    ```

5.  Access the Application:
    Open your web browser and navigate to `http://localhost:<port-number>`.

6.  Access API documintation:
    Open your web browser and navigate to `http://localhost:<port-number>/api-docs`.

### Testing Environment

1. Run Tests:
    ```
    npm test
    ```
