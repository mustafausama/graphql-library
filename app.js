const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const path = require("path");
const { MONGO_URI } = require("./config/index");

const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

app.use("/graphql", graphqlHTTP({ schema }));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  const cors = require("cors");
  app.use(cors());
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`port ${port}`);
});
