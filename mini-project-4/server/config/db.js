const { connect } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    connect(process.env.DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { dbConnect };
