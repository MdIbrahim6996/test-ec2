import { Router } from "express";
import { getUserInfo } from "../controllers/profile.controller";
import { getDailyLeadCount } from "../controllers/dashboard.controller";
import {
  createUserAttendance,
  getUserAllAttendance,
} from "../controllers/attendance.controller";
import {
  deleteNotification,
  getAllNotificationOfUser,
} from "../controllers/notification.controller";
import {
  createLead,
  createLeadUpdated,
  getAddLeadPage,
  getUserLeads,
} from "../controllers/lead.controller";

const router = Router();

// router.get("/", (req, res) => {
//   res.redirect("/user/profile");
// });
router.get("/dashboard", getDailyLeadCount);
router.get("/attendance", getUserAllAttendance);
router.post("/attendance", createUserAttendance);
router.get("/leads", getUserLeads);
router.get("/add-lead", getAddLeadPage);
router.post("/add-lead", createLeadUpdated);
// router.post("/add-lead", createLead);
router.get("/profile", getUserInfo);
router.get("/notification", getAllNotificationOfUser);
router.post("/notification/:userId/:id", deleteNotification);

export default router;
