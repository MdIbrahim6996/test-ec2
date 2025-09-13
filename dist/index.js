"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
var routes_1 = __importDefault(require("./routes"));
var appConstants_1 = require("./utils/appConstants");
var authMiddleware_1 = require("./middlewares/authMiddleware");
var auth_controller_1 = require("./controllers/auth.controller");
var prismaClient_1 = require("./lib/prismaClient");
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("dev"));
// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(path_1.default.resolve(), "/src/views"));
app.use(express_ejs_layouts_1.default);
app.set("layout", "layouts/main");
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
app.get("/", authMiddleware_1.isUserAuth, function (_, res) {
    res.redirect("/user/profile");
});
app.get("/ping", function (_, res) { return res.send("pong"); });
app
    .get("/login", function (req, res) {
    var token = req.cookies.token;
    if (token) {
        return res.redirect("/user/profile");
    }
    else {
        return res.render("pages/login", { layout: false, error: null });
        // return res.redirect("/login");
    }
})
    .post("/login", auth_controller_1.loginFunction);
// SENDING GLOBAL VARIABLES TO SIDEBAR EJS
app.use(authMiddleware_1.isUserAuth, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var notifs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.notification.count({
                    where: { userId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) },
                })];
            case 1:
                notifs = _b.sent();
                res.locals.user = req.user;
                res.locals.notifCount = notifs;
                next();
                return [2 /*return*/];
        }
    });
}); });
app.get("/logout", auth_controller_1.logoutController);
app.use("/user", authMiddleware_1.isUserAuth, routes_1.default);
app.use(function (req, res) {
    res.status(404).render("errors/404", { url: req.originalUrl, layout: false });
});
//ERROR HANDLER
app.use(errorMiddleware_1.errorHandler);
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
