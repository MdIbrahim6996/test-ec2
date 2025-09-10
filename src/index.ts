import express, { Response } from "express";
import path from "path";
import morgan from "morgan";
import pagesRouter from "./routes";

import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import expressLayouts from "express-ejs-layouts";
import { monthNames } from "./utils/appConstants";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "/src/views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

console.log(path.join(path.resolve()));
// NO CACHE, FRESH PAGE FETCHING ALWAYS FOR EJS ROUTES
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

//STATIC FILES
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use("/js", express.static(path.join(path.resolve(), "src/public/js")));
app.use("/css", express.static(path.join(path.resolve(), "src/app/css")));

// GLOBAL VARIABLES FOR EJS
app.locals.pusherKey = process.env.PUSHER_KEY;
app.locals.pusherCluster = process.env.PUSHER_CLUSTER;
app.locals.currentMonth = monthNames[new Date().getMonth()];

// ROUTING
app.get("/", (_, res: Response) => {
  res.redirect("/user");
});

app.get("/ping", (_, res: Response) => res.send("pong"));
app.get("/login", (req, res: Response) => {
  const { token } = req.cookies;
  if (token) {
    return res.redirect("/user/profile");
  } else res.render("pages/login", { layout: false, error: null });
});
app.use("/user", pagesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
