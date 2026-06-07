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
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use(cookieParser());

// Routes
app.use('/api', web);

// Server
app.listen(process.env.PORT, () => {
    console.log(`server start on port ${process.env.PORT}`);
});