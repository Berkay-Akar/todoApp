const express = require("express");
// const pool = require('./dbConfig');
const todoRoutes = require("./routes");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// ROUTUES
app.use("/", todoRoutes);

// for every other request
app.all("*", (req, res, next) => {
  res.status(404).json({});
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong.";
  res.status(status).json({});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
