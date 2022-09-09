import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
  const data = await axios("https://jsonplaceholder.typicode.com/todos");
  const result = data.data.map(({ userId, ...others }) => ({ ...others }));
  res.json(result);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  let todos = await axios("https://jsonplaceholder.typicode.com/todos");
  todos = todos.data;
  const result = todos.filter((item) => {
    if (item.userId == id) return item;
  });
  console.log(typeof result);
  let data = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  data = data.data;
  console.log(typeof data);
  data.todos = result;
  res.json({ data });
});

app.listen(5000, () => {
  console.log("server is running...");
});
