const express = require("express");
const cors = require("cors");
const { generatePlatformPost } = require("./geminiai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const generatedPosts = [];

app.post("/generate-post", async (req, res) => {
  try {
    const { platform, topic } = req.body;

    if (!platform || !topic || topic.trim() === "") {
      return res.status(400).json({
        error: "Invalid input",
        message: "Platform and topic are required",
      });
    }

    const supportedPlatforms = ["LinkedIn", "Twitter", "Instagram"];
    if (!supportedPlatforms.includes(platform)) {
      return res.status(400).json({
        error: "Unsupported platform",
        supported: supportedPlatforms,
      });
    }

    const post = await generatePlatformPost(platform, topic);

    const postData = {
      platform,
      topic,
      post,
      createdAt: new Date().toISOString(),
    };

    generatedPosts.push(postData);

    res.json({
      platform,
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.get("/generated-posts", (req, res) => {
  res.json(generatedPosts);
});

// app.use("*", (req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
