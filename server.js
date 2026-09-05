const express = require("express");
const { ObjectId } = require("mongodb");

const { client, booksCollection } = require("./utils/connectToDb.js")();

const app = express();

// app.use(function(req,res,next){
// console.log("from middleware hello")
// req.hello="hello"
//  next()
// })

app.get("/", function (req, res) {
  res.json({
    message: "Library API is running",
  });
});

// app.all()
app.use(express.json());

app.get("/api/books", async function (req, res) {
  const query = req.query;

  if (query.search) {
    const books = await booksCollection
      .find({
        $or: [
          { author: { $regex: query.search ,$options:"i"} },
          { title: { $regex: query.search,$options:"i" } },
        ],
      })
      .toArray();
    return res.json({ data: books });
  }

  if (query) {
    console.log("first")
    console.log({...query})
    const books = await booksCollection.find({...query}).toArray();
    return res.json({ data: books });
  }

  const books = await booksCollection.find().toArray();

  if (!books.length) {
    res.json({ message: "no books" });
  }
  res.status(200).json({
    data: books,
  });
});

// request url /api/books method  post
app.post("/api/books", async function (req, res) {
  try {
    const newbook = req.body;
    if (!newbook.title) {
      return res.status(400).json({ message: "each book should has a title" });
    }

    const dbres = await booksCollection.insertOne(newbook);
    if (!dbres.acknowledged) {
      return res.status(400).json({ message: "error on insertion" });
    }
    res.status(201).json({ data: dbres });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.get("/api/books/:id", async function (req, res) {
  const bookId = req.params.id;
  const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
  res.json({ data: book });
});

app.put("/api/books/:id", async function (req, res) {
  const bookId = req.params.id;
  const updatedBook = req.body;

  const dbRes = await booksCollection.updateOne(
    { _id: new ObjectId(bookId) },
    { $set: updatedBook },
  );
  res.json({ data: dbRes });
});

app.delete("/api/books/:id", async function (req, res) {
  const bookId = req.params.id;
  await booksCollection.deleteOne({ _id: new ObjectId(bookId) });
  res.json({ message: "Book deleted successfully" });
});

app.patch("/api/books/:id/borrow", async function (req, res) {
  const bookId = req.params.id;

  const existbook = await booksCollection.findOne({
    _id: new ObjectId(bookId),
  });

  if (!existbook) {
    return res.status(400).json({ message: "no book found" });
  }

  if (existbook.available == false) {
    return res.json({ message: "Book is already borrowed" });
  }

  const dbRes = await booksCollection.updateOne(
    { _id: new ObjectId(bookId) },
    { $set: { available: false } },
  );

  res.json({ data: dbRes });
});

app.patch("/api/books/:id/return", async function (req, res) {
  const bookId = req.params.id;
  const existbook = await booksCollection.findOne({
    _id: new ObjectId(bookId),
  });

  if (!existbook) {
    return res.status(400).json({ message: "no book found" });
  }
  if (existbook.available == true) {
    return res.json({ message: "Book is already available" });
  }
  const dbRes = await booksCollection.updateOne(
    { _id: new ObjectId(bookId) },
    { $set: { available: true } },
  );

  res.json({ data: dbRes });
});

app.listen(3000, () => {
  console.log(`server running on http://localhost:3000`);
});
