const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// ✅ CORS setup (no process.env)
app.use(cors({
  origin: 'https://horizon-blogs-jrbk.onrender.com', // replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // only use this if frontend sends cookies/auth headers
}));

// ✅ Preflight requests support
app.options('*', cors({
  origin: 'https://horizon-blogs-jrbk.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Security
app.use(helmet());

// ✅ Body parsing
app.use(express.json());

// ✅ DB Connection
const db = require('./db/db');

// ✅ Routes
const userRouter = require('./Routes/userRoute');
const blogRoute = require('./Routes/blogRoutes');

// ✅ Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/blog", blogRoute);
app.use("/user", userRouter);

// ✅ Start server on fixed port
const port = 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
