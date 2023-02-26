# Notes Keeper

The Notes Keeper is a web-based application that allows users to manage their notes. It provides a simple and intuitive interface for creating, editing, and deleting notes. The app features an authentication system that allows users to create an account and securely log in to access their notes.

## Architecture

The application consists of the following main components:

-   **Database:** The application uses MongoDB database to store user profiles and notes, and relationships between users and their notes.
-   **API Server:** The API server is built using Node.js and Express, and provides RESTful endpoints for creating new user accounts and posts, as well as following other users and searching for content.

## API Endpoints

-   **POST/api/vi/auth/signup:** create a new user account
-   **POST/api/v1/auth/login:** login with email and password
-   **GET/api/v1/notes/all:** retrieve all notes by user for authorized user
-   **POST/api/v1/create/new/notes:** create a note
-   **DELETE/api/v1/note/delete/:noteId:** delete a note by id
-   **PUT/api/v1/note/edit/:noteId:** edit a note by id
    All endpoints except signup and login require a valid JSON Web Token (JWT).

## Data Model

-   users: Stores user profiles, including the user's name, email address, and password hash.
-   notes: Stores user notes, including the notes content and the user ID of the author.

## Usage Examples

To create a new user account, send a POST request to SecretBaseUrl/api/v1/auth/signup with the following JSON payload.

```bash
 {
 "firstName": "Mahamudur",
 "lastName": "Jewel"
 "email": "jewel@example.com",
 "password": "secretPassword12",
 "confirmPassword": "secretPassword12"
}
```

To create a new post, send a POST request to SecretBaseUrl/api/v1/create/new/notes with the following JSON payload:

```bash
 {
 "title": "new note",
 "description": " creating a new note",
 "user": [user id located in JWT payload]
}
```

## Run locally

```bash
1. Fork the repo

2. git clone (ssh url of forked repo)

3. Install dependencies: npm i

4. The application has been deployed in apache2, so you need to disconnect the index.js file
from www file, then configure the index.js file for local machine. For example:

app.listen(4000, () => {
 console.log(`Example app listening on port 4000`)
})

5. Then you need to reconfigure scripts tag in the package.json file. For example,

From
"scripts": {
   "start": "nodemon ./bin/www"
 },

To
"scripts": {
   "start": "nodemon index.js"
 },

6. Now run the following commend:

 npm run start

```

## Troubleshooting

If you receive a 401 Unauthorized error when making a request, make sure that you have included a valid JWT in the Authorization header.

If you receive a 404 Not Found or 400 error when making a request, make sure that the ID you are using is valid and corresponds to an existing user or post.

If you encounter any other issues, please contract me using the following email address: mrjewel837@gmail.com

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request. All contributions are welcome!
