
# Exercise — Book Library API

### Objective

Build a REST API for a small **book library** using:

* Node.js
* Express.js
* MongoDB
* MongoDB Driver **or** Mongoose
* Postman / Thunder Client

**No authentication.**
**Everything stays inside `server.js`.**

---

## The Application

The API manages books in a library.

Each book contains:

```text
title
author
category
publishedYear
available
```

Example:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "publishedYear": 2008,
  "available": true
}
```

---

# Step 1 — Create the Project

```bash
mkdir library-api
cd library-api
npm init -y
```

Install:

```bash
npm install express 
```

Then choose one:

### MongoDB Driver

```bash
npm install mongodb
```

### OR Mongoose

```bash
npm install mongoose
```

Create:

```text
library-api/
│
├── server.js
├── .gitignore
└── package.json
```

---

# Step 2 — MongoDB

Create a MongoDB database:

```text
library
```

And a collection:

```text
books
```


---

# Step 3 — Create the Server

Students need to:

* Create Express application
* Enable JSON
* Connect to MongoDB
* Start the server

Test:

```text
GET http://localhost:3000
```

Return:

```json
{
  "message": "Library API is running"
}
```

---

# Step 4 — GET All Books

Create:

```http
GET /api/books
```

Example:

```text
GET http://localhost:3000/api/books
```

Return all books.

---

# Step 5 — GET One Book

Create:

```http
GET /api/books/:id
```

Example:

```text
GET /api/books/68b123...
```

Requirements:

* Read `id` from `req.params`
* Find the book
* Return it
* Return `404` if it doesn't exist

---

# Step 6 — POST a Book

Create:

```http
POST /api/books
```

Request:

```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "Programming",
  "publishedYear": 1999
}
```

The API should automatically set:

```text
available: true
```

Return the created book.

Status:

```text
201 Created
```

---

# Step 7 — Update a Book

Create:

```http
PUT /api/books/:id
```

Example:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "publishedYear": 2008,
  "available": false
}
```

Update the document in MongoDB.

---

# Step 8 — Borrow a Book

Instead of simply updating `available`, create a specific endpoint:

```http
PATCH /api/books/:id/borrow
```

When called:

```text
PATCH /api/books/68b123.../borrow
```

The API should:

1. Find the book.
2. Check if it is available.
3. If available → set `available` to `false`.
4. Return the updated book.

If already borrowed:

```json
{
  "message": "Book is already borrowed"
}
```

---

# Step 9 — Return a Book

Create:

```http
PATCH /api/books/:id/return
```

This should:

```text
available = true
```

Return the updated book.

---

# Step 10 — Delete a Book

Create:

```http
DELETE /api/books/:id
```

Delete the book from MongoDB.

Return:

```json
{
  "message": "Book deleted successfully"
}
```

---

# Step 11 — Filter Books

Improve:

```http
GET /api/books
```

Support:

```text
/api/books?category=Programming
```

And:

```text
/api/books?available=true
```

And combinations:

```text
/api/books?category=Programming&available=true
```

Students should use:

```js
req.query
```

---

# Step 12 — Search Books

Implement:

```text
GET /api/books?search=clean
```

Search in:

```text
title
author
```

For example:

```text
/api/books?search=martin
```

should find books written by Robert C. Martin.

---

# Step 13 — Filter by Year

Add:

```text
/api/books?year=2008
```

And optionally:

```text
/api/books?minYear=2000&maxYear=2020
```

This gives students more practice with MongoDB query operators.

---

# Final API

| Method | Endpoint                | Purpose      |
| ------ | ----------------------- | ------------ |
| GET    | `/api/books`            | Get books    |
| GET    | `/api/books/:id`        | Get one book |
| POST   | `/api/books`            | Add book     |
| PUT    | `/api/books/:id`        | Update book  |
| PATCH  | `/api/books/:id/borrow` | Borrow book  |
| PATCH  | `/api/books/:id/return` | Return book  |
| DELETE | `/api/books/:id`        | Delete book  |

### Query features

```text
GET /api/books?category=Programming

GET /api/books?available=true

GET /api/books?search=clean

GET /api/books?year=2008

GET /api/books?minYear=2000&maxYear=2020
```

---

## Student progression

I would give them the project in this order:

```text
1. Express server
        ↓
2. MongoDB connection
        ↓
3. Create books
        ↓
4. GET all books
        ↓
5. GET one book
        ↓
6. POST book
        ↓
7. PUT book
        ↓
8. Borrow book
        ↓
9. Return book
        ↓
10. DELETE book
        ↓
11. Query parameters
        ↓
12. Search
        ↓
13. Validation
```

### Optional challenge

Once they finish, ask them to add **reviews** to books:

```json
{
  "rating": 5,
  "comment": "Excellent book!"
}
```

Then create:

```http
POST /api/books/:id/reviews
GET /api/books/:id/reviews
DELETE /api/books/:id/reviews/:reviewId
```
