const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ✅ Allow CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(helmet());
app.use(express.json());

const db = require('./db/db');
const port = process.env.PORT || 3000;

const userRouter = require('./Routes/userRoute');
const blogRoute = require('./Routes/blogRoutes');

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/blog", blogRoute);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
