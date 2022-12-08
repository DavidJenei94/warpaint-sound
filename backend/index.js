import express from "express";

const app = express();
const port = process.env.PORT || 8002;

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>")
})

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
