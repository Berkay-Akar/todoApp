const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos")
    .then((result) => {
      const todos = result.rows;
      res.json(todos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error (app.get)" });
    });
});

//Add Todo
router.route("/todos").post(async (req, res) => {
  const { description } = req.body;
  db.query("INSERT INTO todos (description) VALUES ($1) RETURNING *", [
    description,
  ])
    .then((result) => {
      console.log(result.rows);
      const newTodo = result.rows[0];
      res.json(newTodo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Add Todo" });
    });
});

router.route("/todos/:id").delete((req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = $1", [id])
    .then(() => {
      res.json("Todo Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Delete Todo" });
    });
});

router.route("/todos/:id").put((req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  db.query(
    "UPDATE todos SET description = $1, updatedAt = current_timestamp WHERE id = $2 RETURNING *",
    [description, id]
  )
    .then((result) => {
      const updatedTodo = result.rows[0];
      res.json(updatedTodo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error Delete Todo" });
    });
});

module.exports = router;
