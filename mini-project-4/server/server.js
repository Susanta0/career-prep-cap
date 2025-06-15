const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./config/db");
const { authRouter } = require("./routes/auth.routes");
const { notesRouter } = require("./routes/notes.routes");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: ["https://notesapp-flax-pi.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Wellcome my backend" });
});

app.use("/api", authRouter);
app.use("/api", notesRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbConnect();
  console.log("Server is running");
});
