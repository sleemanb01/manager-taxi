"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const shifts_1 = require("../controllers/shifts");
const auth_1 = require("../middleware/auth");
/* ************************************************************** */
exports.shiftRoutes = express_1.default.Router();
const MAX = 120;
exports.shiftRoutes.use(auth_1.authenticate);
exports.shiftRoutes.get("/", shifts_1.getShifts);
exports.shiftRoutes.get("/:shiftDate", shifts_1.getShift);
exports.shiftRoutes.post("/", [
    (0, express_validator_1.check)("date").isISO8601().toDate(),
    (0, express_validator_1.check)("meat").isInt({ min: 0, max: MAX }),
    (0, express_validator_1.check)("bread").isInt({ min: 0, max: MAX }),
], shifts_1.addShift);
