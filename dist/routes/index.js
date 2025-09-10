"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.render("index", { title: "Home", message: "Hello from EC2 🚀" });
});
router.get("/about", function (req, res) {
    res.render("about", {
        title: "About",
        info: "This is an Express + EJS app",
    });
});
exports.default = router;
