## data model

### User Collection:

-   \_id: Unique user ID
-   name: User's name
-   email: User's email

### Room Collection:

-   \_id: Unique room ID
-   name: Room name or identifier
-   participants: Array of user IDs participating in - - the room

### Message Collection:

-   \_id: Unique message ID
-   roomId: ID of the room the message belongs to
-   senderId: ID of the user who sent the message
-   content: Message content
-   timestamp: Timestamp of when the message was sent
