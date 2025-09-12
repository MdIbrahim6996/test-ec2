"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_controller_1 = require("../controllers/profile.controller");
var dashboard_controller_1 = require("../controllers/dashboard.controller");
var attendance_controller_1 = require("../controllers/attendance.controller");
var notification_controller_1 = require("../controllers/notification.controller");
var lead_controller_1 = require("../controllers/lead.controller");
var router = (0, express_1.Router)();
// router.get("/", (req, res) => {
//   res.redirect("/user/profile");
// });
router.get("/dashboard", dashboard_controller_1.getDailyLeadCount);
router.get("/attendance", attendance_controller_1.getUserAllAttendance);
router.get("/leads", lead_controller_1.getUserLeads);
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
router.get("/profile", profile_controller_1.getUserInfo);
router.get("/notification", notification_controller_1.getAllNotificationOfUser);
exports.default = router;
