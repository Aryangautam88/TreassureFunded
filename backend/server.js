const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://treassurefunded.com",
];

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({ contentSecurityPolicy: false })
);

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins.join(","));
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/userroutes");
const statsRoutes = require("./routes/stats");
const transactionRoutes = require("./routes/transaction");
const depositRoutes = require("./routes/deposit");
const adminRoutes = require("./routes/admin");
const kycRoutes = require("./routes/Kyc");
const approvedUsersRoutes = require("./routes/approvedUsers");
const userStatusRoutes = require("./routes/userStatus");
const ticketRoutes = require("./routes/tickets");
const notificationsRoutes = require("./routes/notifications");
const certificateRoute = require("./routes/certificate");

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/transactions", verifyToken, transactionRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/approved-users", approvedUsersRoutes);
app.use("/api/user-status", userStatusRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/certificate", certificateRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from the SkyFunded backend!");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal server error", error: err.message });
});

// ------------------- SOCKET.IO SETUP -------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Make io available in routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
