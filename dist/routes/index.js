"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_controller_1 = require("../controllers/profile.controller");
var dashboard_controller_1 = require("../controllers/dashboard.controller");
var attendance_controller_1 = require("../controllers/attendance.controller");
var notification_controller_1 = require("../controllers/notification.controller");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.redirect("/user/profile");
});
router.get("/dashboard", dashboard_controller_1.getDailyLeadCount);
router.get("/attendance", attendance_controller_1.getUserAllAttendance);
// router.get("/leads", getUserLeads);
router.get("/profile", profile_controller_1.getUserInfo);
router.get("/notification", notification_controller_1.getAllNotificationOfUser);
exports.default = router;
