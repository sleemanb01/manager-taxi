"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const stockSchema = new Schema({
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    minQuantity: { type: Number, required: true },
});
exports.default = mongoose_1.default.model("Stock", stockSchema);
