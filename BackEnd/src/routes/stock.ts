import express from "express";
import { check } from "express-validator";
import { fileUpload } from "../middleware/file-upload";
import { authenticate } from "../middleware/auth";
import {
  getStock,
  getStocks,
  addStock,
  updateStock,
  deleteStock,
  updateStockPartial,
} from "../controllers/stock";

/* ************************************************************** */

export const stockRoutes = express.Router();

const MAX = 50;

stockRoutes.get("/stock/:stockId", getStock);

stockRoutes.get("/:date", getStocks);

stockRoutes.use(authenticate);

stockRoutes.post(
  "/",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("quantity").isInt({ min: 0, max: MAX }),
  ],
  addStock
);

stockRoutes.patch(
  "/quantity/:stockId/:shiftId",
  [
    check("quantity").isInt({ min: 0, max: MAX }),
    check("minQuantity").isInt({ min: 0, max: MAX }),
  ],
  updateStockPartial
);

stockRoutes.patch(
  "/:stockId",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("categoryId").not().isEmpty(),
    check("minQuantity").isInt({ min: 0, max: MAX }),
  ],
  updateStock
);

stockRoutes.delete("/:placeId", deleteStock);
