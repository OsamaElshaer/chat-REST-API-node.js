# Chaty: Real-time Chat Application

chaty is a modern and intuitive real-time chat application that enables seamless communication between individuals and groups.chaty transforms the way you connect and interact with others.

Built with the latest technologies, chaty offers real-time messaging, secure user authentication, group chat capabilities, making it an ideal platform for both personal and professional communication needs.

## Project Status

This project is currently in development.

## About The Project

chat application built by Node.js. Its event-driven, non-blocking I/O model makes it fast and efficient,using websocket protocol with polling communication design pattern provided by socket.io package.

## Features

-   **Real-time Messaging:** Exchange messages in real-time with minimal latency.
-   **User Authentication:** Securely create an account or log in with your existing credentials.
-   **Group Chats:** Engage in group discussions effortlessly.

-   **Request Logging:** Every incoming request is logged, helping developers track and diagnose issues effectively.
-   **Debugging Information:** Detailed debugging information is available for pinpointing errors during development.
-   **API Documentation:** Comprehensive documentation of endpoints and data formats for seamless integration by using swagger.

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

#### Environment Variables :

Please set the following environment variables in a `.env` file for configuring your ChatBuddy application:

-   `PORT`: The port number the server will listen on.
-   `WHITE_LIST`: A comma-separated list of domains that are allowed to make cross-origin requests.
-   `EMAIL`: Your application's email address for notifications and communication.
-   `DB_HOST`: The connection string for your MongoDB database host.
-   `JWT_SECRET_KEY`: The secret key for generating and verifying JSON Web Tokens.
-   `SENDGRID_API_KEY`: Your SendGrid API key for sending emails.
-   `MAILTRAP_USER`: Your Mailtrap username for testing email sending.
-   `MAILTRAP_PASS`: Your Mailtrap password for testing email sending.

### Installation :

1. Clone the repo
    ```sh
    git clone https://github.com/OsamaElshaer/chat-REST-API-node.js
    ```
2. Install NPM packages
    ```sh
    npm install npm@latest -g
    ```

### Testing :

1. Run Tests:
    ```
    npm test
    ```

## Build With

chaty is built using a combination of powerful technologies and packages:

### Dependencies

-   Authentication and Security:

    -   [bcrypt](https://www.npmjs.com/package/bcrypt): ^5.1.0
        -   Hashing and salting user passwords for secure storage.

-   Communication and Real-Time Features:

    -   [socket.io](https://www.npmjs.com/package/socket.io): ^4.7.1
        -   Facilitating real-time communication between clients and the server using WebSockets.

-   Data Storage and Database:

    -   [mongodb](https://www.npmjs.com/package/mongodb): ^5.6.0
        -   Connecting and interacting with MongoDB databases.

-   Email Notifications:

    -   [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail): ^7.7.0
        -   Sending emails and notifications.
    -   [nodemailer](https://www.npmjs.com/package/nodemailer): ^6.9.3
        -   Sending emails from the application.
    -   [nodemailer-sendgrid-transport](https://www.npmjs.com/package/nodemailer-sendgrid-transport): ^0.2.0
        -   Enabling the use of SendGrid as the transport mechanism for sending emails.

-   API Documentation:

    -   [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): ^5.0.0
        -   Automatically generating API documentation using Swagger.

-   User Authentication and Authorization:

    -   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): ^9.0.1
        -   Generating and verifying JSON Web Tokens for user authentication.

-   Data Validation and Sanitization:

    -   [express-validator](https://www.npmjs.com/package/express-validator): ^7.0.1
        -   Validating and sanitizing incoming data.

-   Security Headers and Protection:

    -   [helmet](https://www.npmjs.com/package/helmet): ^7.0.0
        -   Enhancing application security by setting various HTTP headers.
    -   [hpp](https://www.npmjs.com/package/hpp): ^0.2.3
        -   Preventing HTTP Parameter Pollution attacks.

-   Logging and Monitoring:

    -   [morgan](https://www.npmjs.com/package/morgan): ^1.10.0
        -   Logging HTTP requests for debugging and monitoring.
    -   [winston](https://www.npmjs.com/package/winston): ^3.9.0
        -   Logging library for flexible and structured logging.

-   Environment and Configuration:

    -   [dotenv](https://www.npmjs.com/package/dotenv): ^16.3.1
        -   Loading environment variables from a .env file for configuration.
    -   [yamljs](https://www.npmjs.com/package/yamljs): ^0.3.0
        -   Reading YAML configuration files.

-   Cross-Platform Development:

    -   [cross-env](https://www.npmjs.com/package/cross-env): ^7.0.3
        -   Setting environment variables across different platforms.

-   Testing:

    -   [jest](https://www.npmjs.com/package/jest): ^29.6.1
        -   Framework for testing JavaScript code.
    -   [supertest](https://www.npmjs.com/package/supertest): ^6.3.3
        -   Testing HTTP requests and responses.

-   Continuous Development and Monitoring:
    -   [nodemon](https://www.npmjs.com/package/nodemon): ^2.0.22
        -   Monitoring for code changes and automatically restarting the server.
    -   [socket.io-client](https://www.npmjs.com/package/socket.io-client): ^4.7.1
        -   Client-side library for Socket.io.

<!-- GETTING STARTED -->

## License

Distributed under the MIT License.
