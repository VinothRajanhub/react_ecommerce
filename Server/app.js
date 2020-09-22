require("dotenv").config();

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const mongoose = require("mongoose");

const express = require('express');

const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

//DB Connection 
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    })
    .then(()=>{console.log("DB Connected")}).catch((err) => {console.log(err)})


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My route
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",orderRoute);

// My port
const port = 8000;

//Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});