const express = require("express");
const { dbConnect } = require("./config/db");
const { authRouter } = require("./routes/auth.routes");
const { notesRouter } = require("./routes/notes.routes");
const app = express();
require("dotenv").config();


app.use(cors({
  origin: ["*","http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.use("/api", authRouter);
app.use("/api", notesRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Wellcome my backend" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbConnect();
  console.log("Server is running");
});
