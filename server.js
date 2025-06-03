const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();

const cors = require("cors");

// Middleware to allow cross-origin requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend
    credentials: true, // optional, if you're using cookies
  })
);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json()); // Body parser middleware

// Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/meditation", require("./routes/meditationRoutes"));
app.use("/api/sermon", require("./routes/sermonRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

// Function to start the server and connect to the database
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// const express = require("express");
// const errorHandler = require("./middleware/errorHandler");
// const connectDb = require("./config/dbConnection");
// const dotenv = require("dotenv").config();
// const path = require("path");
// const app = express();

// const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:5173", // allow your frontend
//     credentials: true, // optional, if you're using cookies
//   })
// );

// // Serve static files from uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const port = process.env.PORT || 5000;
// app.use(express.json());

// app.use("/api/contacts", require("./routes/contactRoutes"));
// app.use("/api/news", require("./routes/newsRoutes"));
// app.use("/api/event", require("./routes/eventRoutes"));
// app.use("/api/meditation", require("./routes/meditationRoutes"));
// app.use("/api/sermon", require("./routes/sermonRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/comments", require("./routes/commentRoutes"));

// app.use("/api/sermons", require("./routes/sermonRoutes"));

// app.use(errorHandler);

// const startServer = async () => {
//   try {
//     await connectDb();
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();
