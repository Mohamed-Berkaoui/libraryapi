const { MongoClient } = require("mongodb");

function connectToDb() {
  const uri =
    "mongodb+srv://mohamed:yeQ236dK7gbbsej7@cluster0.ghbjfij.mongodb.net/";

  const client = new MongoClient(uri);

  return {booksCollection:client.db("library").collection("books"),client}
}

module.exports=connectToDb