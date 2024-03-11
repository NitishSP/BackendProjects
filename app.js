const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

// connection to mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/TodoApp";
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err)
    })
async function main(){
    await mongoose.connect(MONGO_URL);
}

// Middlewares...
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'));

// routes
app.use(require("./routes/todo")); 

app.listen(3000, () => console.log("server has started"))


