const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    return res.json({ success: true, message: "Logged in successfully" });
  }
  res.status(400).json({ success: false, message: "Missing fields" });
});

app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    return res.json({ success: true, message: "Signed up successfully" });
  }
  res.status(400).json({ success: false, message: "Missing fields" });
});

app.get("/", (req, res) => {
  res.send("Edusource Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
