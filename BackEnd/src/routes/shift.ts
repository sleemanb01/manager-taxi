import express from "express";
import { check } from "express-validator";
import { getShifts, getShift, addShift } from "../controllers/shifts";
import { authenticate } from "../middleware/auth";

/* ************************************************************** */

export const shiftRoutes = express.Router();

const MAX = 120;

shiftRoutes.use(authenticate);

shiftRoutes.get("/", getShifts);

shiftRoutes.get("/:shiftDate", getShift);

shiftRoutes.post(
  "/",
  [
    check("date").isISO8601().toDate(),
    check("meat").isInt({ min: 0, max: MAX }),
    check("bread").isInt({ min: 0, max: MAX }),
  ],
  addShift
);
