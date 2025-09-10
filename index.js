const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log(path.join(path.resolve()));
console.log(__dirname);

// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Home", message: "Hello from EC2 🚀" });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        info: "This is an Express + EJS app",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
