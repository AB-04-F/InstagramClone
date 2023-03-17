import express, { json } from "express";
const app = express();
import helmet from "helmet";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(json());
app.use(helmet());
import dotenv from 'dotenv';
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`);
});