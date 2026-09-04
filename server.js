const express = require("express");

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
  const books = await booksCollection.find().toArray();

  console.log(req.hello);
  res.status(200).json({
    data: books,
  });
});
// request url /api/books method  post
app.post("/api/books", async function (req, res) {
  try {
    const newbook = req.body;
    s;
    const dbres = await booksCollection.insertOne(newbook);
    if (!dbres.acknowledged) {
      return res.status(400).json({ message: "error on insertion" });
    }
    res.status(201).json({ data: dbres });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(3000, () => {
  console.log(`server running on http://localhost:3000`);
});
