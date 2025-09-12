import { Router } from "express";
import { getUserInfo } from "../controllers/profile.controller";
import { getDailyLeadCount } from "../controllers/dashboard.controller";
import { getUserAllAttendance } from "../controllers/attendance.controller";
import { getAllNotificationOfUser } from "../controllers/notification.controller";
import { getAddLeadPage, getUserLeads } from "../controllers/lead.controller";

const router = Router();

// router.get("/", (req, res) => {
//   res.redirect("/user/profile");
// });
router.get("/dashboard", getDailyLeadCount);
router.get("/attendance", getUserAllAttendance);
router.get("/leads", getUserLeads);
router.get("/add-lead", getAddLeadPage);
router.get("/profile", getUserInfo);
router.get("/notification", getAllNotificationOfUser);

export default router;
