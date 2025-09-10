import { Router } from "express";
import { getUserInfo } from "../controllers/profile.controller";
import { getDailyLeadCount } from "../controllers/dashboard.controller";
import { getUserAllAttendance } from "../controllers/attendance.controller";
import { getAllNotificationOfUser } from "../controllers/notification.controller";
import { getUserLeads } from "../controllers/lead.controller";

const router = Router();

// router.get("/", (req, res) => {
//   res.redirect("/user/profile");
// });
router.get("/dashboard", getDailyLeadCount);
router.get("/attendance", getUserAllAttendance);
router.get("/leads", getUserLeads);

// app.get("/user/add-lead", isUserAuth, async (_, res: Response) => {
//   const process = await prisma.process.findMany({
//     orderBy: { createdAt: "desc" },
//     select: { id: true, name: true },
//   });
//   const plan = await prisma.plan.findMany({
//     orderBy: { createdAt: "desc" },
//     select: { id: true, name: true, processId: true },
//   });
//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: "desc" },
//     where: { role: "closer" },
//     select: { id: true, name: true },
//   });

//   res.render("pages/add-lead", {
//     currentPath: "/user/add-lead",
//     process,
//     plan,
//     users,
//     quote: returnRandomQuotes(),
//   });
// });
router.get("/profile", getUserInfo);
router.get("/notification", getAllNotificationOfUser);

export default router;
