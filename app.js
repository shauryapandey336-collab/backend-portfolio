const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./db/connectDb");
const web = require("./routes/web");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


// image and file handelling 
app.use(fileUpload({
  useTempFiles: true,

}));

// DB connection
connectDb();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://shauryapandeyportfolio.netlify.app",
      // "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use('/api', web);

// Server
app.listen(process.env.PORT, () => {
  console.log(`server start on port ${process.env.PORT}`);
});