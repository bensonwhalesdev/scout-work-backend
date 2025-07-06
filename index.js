require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const authRouter = require("./src/routes/auth.route");
const jobRoutes = require('./src/routes/postajob.route');
const userRoutes = require('./src/routes/user.route');
const jobApplyRoutes = require('./src/routes/jobapply.route');
const jobOfferRoutes = require('./src/routes/offerjob.route');
const profileViewRoutes = require('./src/routes/profileviews.route');

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173",credentials: true, }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));


// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/jobapply", jobApplyRoutes);
app.use("/api/v1/joboffer", jobOfferRoutes);
app.use("/api/v1/profile-views", profileViewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
