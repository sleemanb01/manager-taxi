"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
/* ************************************************************** */
exports.usersRoutes = express_1.default.Router();
exports.usersRoutes.get("/", users_1.getUsers);
exports.usersRoutes.post("/login", [(0, express_validator_1.check)("phone").not().isEmpty()], users_1.login);
