"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const file_upload_1 = require("../middleware/file-upload");
const auth_1 = require("../middleware/auth");
const stock_1 = require("../controllers/stock");
/* ************************************************************** */
exports.stockRoutes = express_1.default.Router();
const MAX = 50;
exports.stockRoutes.get("/stock/:stockId", stock_1.getStock);
exports.stockRoutes.get("/:date", stock_1.getStocks);
exports.stockRoutes.use(auth_1.authenticate);
exports.stockRoutes.post("/", file_upload_1.fileUpload.single("image"), [
    (0, express_validator_1.check)("name").not().isEmpty(),
    (0, express_validator_1.check)("quantity").isInt({ min: 0, max: MAX }),
], stock_1.addStock);
exports.stockRoutes.patch("/quantity/:stockId/:shiftId", [
    (0, express_validator_1.check)("quantity").isInt({ min: 0, max: MAX }),
    (0, express_validator_1.check)("minQuantity").isInt({ min: 0, max: MAX }),
], stock_1.updateStockPartial);
exports.stockRoutes.patch("/:stockId", file_upload_1.fileUpload.single("image"), [
    (0, express_validator_1.check)("name").not().isEmpty(),
    (0, express_validator_1.check)("categoryId").not().isEmpty(),
    (0, express_validator_1.check)("minQuantity").isInt({ min: 0, max: MAX }),
], stock_1.updateStock);
exports.stockRoutes.delete("/:placeId", stock_1.deleteStock);
