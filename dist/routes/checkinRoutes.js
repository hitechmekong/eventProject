"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CheckinController_1 = __importDefault(require("../controllers/CheckinController"));
const router = (0, express_1.Router)();
// Endpoint: POST /api/checkin/self
router.post('/self', CheckinController_1.default.selfCheckin);
// Endpoint: POST /api/checkin/scan
router.post('/scan', CheckinController_1.default.scanCheckin);
exports.default = router;
