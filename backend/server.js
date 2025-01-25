const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
