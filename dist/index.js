"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
var appConstants_1 = require("./utils/appConstants");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("dev"));
// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(path_1.default.resolve(), "/src/views"));
app.use(express_ejs_layouts_1.default);
app.set("layout", "layouts/main");
console.log(path_1.default.join(path_1.default.resolve()));
// NO CACHE, FRESH PAGE FETCHING ALWAYS FOR EJS ROUTES
app.use(function (req, res, next) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});
//STATIC FILES
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/public")));
app.use("/js", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/public/js")));
app.use("/css", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/css")));
// GLOBAL VARIABLES FOR EJS
app.locals.pusherKey = process.env.PUSHER_KEY;
app.locals.pusherCluster = process.env.PUSHER_CLUSTER;
app.locals.currentMonth = appConstants_1.monthNames[new Date().getMonth()];
// ROUTING
app.get("/", function (_, res) {
    res.redirect("/user");
});
app.get("/ping", function (_, res) { return res.send("pong"); });
app.get("/login", function (req, res) {
    var token = req.cookies.token;
    if (token) {
        return res.redirect("/user/profile");
    }
    else
        res.render("pages/login", { layout: false, error: null });
});
app.use("/user", routes_1.default);
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
