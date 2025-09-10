import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home", message: "Hello from EC2 🚀" });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    info: "This is an Express + EJS app",
  });
});

export default router;
